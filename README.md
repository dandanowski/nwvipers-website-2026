# Northwest Vipers - 2026.02

This is the 2026.02 iteration of the Northwest Vipers website.

## Getting Started

Made with:

- [11ty](https://www.11ty.dev/)

### Development

```bash
npm install
npm run dev:11ty
```

### Production

```bash
npm run build:11ty
```

## Maintenance
The site uses a static site generator called 11ty. Content is written in [Markdown](https://www.markdownguide.org/basic-syntax/) and stored in the `_src/content` directory. The expectation is that the content is updated via the GitHub UI, and the site is automatically deployed via [GitHub Actions](https://docs.github.com/en/actions).

### Adding a Match
Match reports are stored in the `_src/content/news/match/[squad]/` directory. They are named in the format `YYYY-MM-DD.md`. In the case of multiple matches on the same day use `YYYY-MM-DD-1.md`, `YYYY-MM-DD-2.md`, etc. The content of the file is as follows:

```markdown
---
layout: page
title: "HEADLINE"
subtitle: "Match Report"
opponent: "OPPONENT-ID"
squad: "SQUAD-ID"
type: "[league|tournament|friendly]"
home: true/false
location: ""
date: 2026-09-06
tags:
 - "post"
 - "match"
 - "news"
 - "SQUAD-ID"
image: "/news/match/[SQUAD-ID]/YYYY-MM-DD/YYYY-MM-DD-01.png"
---

# [Headline]
## Match Snapshot
| | |
| --- | --- |
| Date | [DATE] |
| Gameweek | [GAMEWEEK] |
| Opponent | [OPPONENT FULL NAME] |
| Venue | [VENUE] |
| Final Score | [FINAL-SCORE] |
| Season Record | [SEASON-RECORD] |

## Opening Overview

## First Half Summary

## Second Half Summary

## Key Performers

## Closing & Next Fixture
```

### Match Photos
Photos for the match should be stored in the `_src/assets/images/news/match/[squad]/YYYY-MM-DD/` directory. They should be named in the format `YYYY-MM-DD-01.png`, `YYYY-MM-DD-02.png`, etc. The images should be at most 1200px on the long side.

The image path in the match report will be used as the thumbnail image for the match report on the news page.




