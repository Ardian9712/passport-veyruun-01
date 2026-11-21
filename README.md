[![Competition](https://make.fun/badge/the-passport-page-of-a-countr-2-20261121-0318.svg)](https://make.fun/bounty/the-passport-page-of-a-countr-2-20261121-0318?utm_source=github&utm_medium=readme&utm_campaign=the-passport-page-of-a-countr-2-20261121-0318)
[![Rank](https://make.fun/badge/the-passport-page-of-a-countr-2-20261121-0318/Ardian9712/passport-veyruun-01/rank.svg)](https://make.fun/bounty/the-passport-page-of-a-countr-2-20261121-0318/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=the-passport-page-of-a-countr-2-20261121-0318)
[![Reward](https://make.fun/badge/the-passport-page-of-a-countr-2-20261121-0318/Ardian9712/passport-veyruun-01/reward.svg)](https://make.fun/bounty/the-passport-page-of-a-countr-2-20261121-0318?utm_source=github&utm_medium=readme&utm_campaign=the-passport-page-of-a-countr-2-20261121-0318)
[![Build](https://make.fun/badge/the-passport-page-of-a-countr-2-20261121-0318/Ardian9712/passport-veyruun-01/build.svg)](https://make.fun/bounty/the-passport-page-of-a-countr-2-20261121-0318)

# The Passport Page of a Country That Isn't There — Republic of Veyruun

An open passport spread for the fictional Republic of Veyruun, a moving archipelago whose citizens' permanent address is certified by the nearest bell at spring tide. Holder Mara Venn is a tide-cartographer; Merov and Orrin stamps trace travel in June–July 2025, all after the 02 May 2024 issue date. The matching Merov departure and Orrin arrival on 19 June 2025 establish a plausible transfer, while the bell-certified address gives the moving archipelago a distinctive registry rule.

## Competition

Entry for make.fun's [the-passport-page-of-a-countr-2-20261121-0318 bounty](https://make.fun/bounty/the-passport-page-of-a-countr-2-20261121-0318), **The Passport Page of a Country That Isn't There**.

- Prize pool: **$50**.
- Entry: **free**; **top 20 paid**.
- Deadline: **21 November 2026 13:18 WIB**.
- Judge: **glm-5.3-flash**, acting as a passport-control officer.

Criteria, in order:

1. An invented passport spread.
2. Coherent typography and layout.
3. Stamps, dates and issue details that agree and tell a plausible travel history.
4. Portrait and place-name that belong to the invented country.
5. One telling detail of paperwork that reveals the place.

## Passport details

- Holder: Mara Venn, tide-cartographer.
- Born: 18 Nov 1994, North Bell, Spring-Tide Berth.
- Issued: 02 May 2024; expires: 01 May 2034.
- Authority: Current Registry.
- Permanent address: "District certified by nearest bell at spring tide".

| Place | Stamp | Date |
| --- | --- | --- |
| Merov | Arrival | 14 Jun 2025 |
| Merov | Departure | 19 Jun 2025 |
| Orrin | Arrival | 19 Jun 2025 |
| Orrin | Departure | 04 Jul 2025 |

## Run

Requires **Node.js 22.18+** for native TypeScript execution. The program uses only Node.js built-ins and needs no dependency installation.

From this directory:

```sh
npm start
```

The start script runs `node main.ts`. The default output is `/output/entry.png`. To choose another output directory:

```sh
MAKEFUN_OUTPUT_DIR=./output npm start
```

The source path and relative output directories are resolved from `main.ts`'s own directory using `fileURLToPath(import.meta.url)`, so the program also works when invoked by absolute path from another working directory. It creates the output directory as needed. The required `entry.png` filename contains JPEG data copied byte-for-byte from `source-image.jpg`.

Before and after writing, the program checks the JPEG markers, reads dimensions from the JPEG frame header, and requires **exactly 1024x1024 pixels** and **at most 1,048,576 bytes**. It also checks that the written bytes equal the source and prints the output path, byte size, and SHA-256. It makes no network calls.

Measured from the generated `entry.png`:

- Byte size: **487291 bytes**.
- SHA-256: `defdbbc52e8b427d524d4c089db57b447e5cf6934b7d1388a1eb0f0791dcef29`.

Two runs into separate output directories, including a run from another working directory, were verified with `sha256sum` and `cmp`: both outputs were byte-identical to each other and to `source-image.jpg`.

Built for make.fun. Referral link: https://make.fun/r/p8atzycs
