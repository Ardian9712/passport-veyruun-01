import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const sourcePath = resolve(scriptDirectory, 'source-image.jpg');
const outputDirectory = resolve(
  scriptDirectory,
  process.env.MAKEFUN_OUTPUT_DIR || '/output',
);
const outputPath = resolve(outputDirectory, 'entry.png');
const maximumBytes = 1_048_576;
const frameMarkers = new Set([
  0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7,
  0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf,
]);

function jpegDimensions(data: Buffer): { width: number; height: number } {
  if (data.length < 4 || data.readUInt16BE(0) !== 0xffd8) {
    throw new Error('Expected JPEG data with a start-of-image marker.');
  }
  if (data.readUInt16BE(data.length - 2) !== 0xffd9) {
    throw new Error('JPEG is missing its end-of-image marker.');
  }

  let offset = 2;
  while (offset < data.length) {
    if (data[offset] !== 0xff) {
      throw new Error(`Invalid JPEG marker at byte ${offset}.`);
    }
    while (offset < data.length && data[offset] === 0xff) offset += 1;
    if (offset >= data.length) {
      throw new Error('Truncated JPEG marker.');
    }

    const marker = data[offset++];
    if (marker === 0xda || marker === 0xd9) break;
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue;
    if (marker === 0x00 || marker === 0xd8) {
      throw new Error('Unexpected marker in the JPEG header.');
    }
    if (offset + 2 > data.length) {
      throw new Error('Truncated JPEG segment length.');
    }

    const segmentLength = data.readUInt16BE(offset);
    if (segmentLength < 2 || offset + segmentLength > data.length) {
      throw new Error('Invalid or truncated JPEG segment.');
    }
    if (frameMarkers.has(marker)) {
      if (segmentLength < 8) {
        throw new Error('Truncated JPEG start-of-frame header.');
      }
      const components = data[offset + 7];
      if (components === 0 || segmentLength !== 8 + 3 * components) {
        throw new Error('Invalid JPEG start-of-frame component data.');
      }
      return {
        width: data.readUInt16BE(offset + 5),
        height: data.readUInt16BE(offset + 3),
      };
    }
    offset += segmentLength;
  }

  throw new Error('JPEG dimensions are missing before the image scan.');
}

function validateImage(data: Buffer, imagePath: string): void {
  try {
    if (data.length > maximumBytes) {
      throw new Error(
        `${data.length} bytes exceeds the ${maximumBytes}-byte limit.`,
      );
    }
    const { width, height } = jpegDimensions(data);
    if (width !== 1024 || height !== 1024) {
      throw new Error(`Expected 1024x1024 pixels; found ${width}x${height}.`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Image validation failed for ${imagePath}: ${message}`);
  }
}

const source = await readFile(sourcePath);
validateImage(source, sourcePath);
await mkdir(outputDirectory, { recursive: true });
await writeFile(outputPath, source);

const written = await readFile(outputPath);
validateImage(written, outputPath);
if (!written.equals(source)) {
  throw new Error(`Output ${outputPath} differs from source-image.jpg.`);
}

const sha256 = createHash('sha256').update(written).digest('hex');
console.log(`Success: ${outputPath}; ${written.length} bytes; SHA-256 ${sha256}`);
