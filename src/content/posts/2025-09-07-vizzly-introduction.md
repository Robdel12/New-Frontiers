---
layout: post
title: Vizzly vs. The Visual Testing Status Quo
date: 2025-09-07 0:01 -0500
excerpt:
  "I spent 4 years at Percy learning what's broken about visual testing. Vizzly is my fix: real screenshots from your tests, team-based pricing, and actual designer-developer collaboration built
  in"
---

![Vizzly build screenshot list](/assets/images/posts/vizzly-build-screenshots.png)

I worked at Percy from 2018 to 2022 handling all of the support and building the SDKs. Over the
years of talking directly to customers I learned a lot about what folks want from a visual testing
tool, what their concerns were, and what issues they commonly ran into. After being away from visual
testing for a few years, the current state of visual testing seems stagnant.

[Vizzly](https://vizzly.dev) is the visual review and design-development collaboration platform I always wanted. There's a
few big decisions I made that makes Vizzly different:

- **Bring your own screenshots.** Vizzly is not capturing DOM and assets to re-render your page like
  other tools. Capture a screenshot in your functional tests and send that to Vizzly. Hover states,
  fonts, OS rendering—the actual pixels your app produced.
- **No usage-based pricing.** Your test suite's value isn't tied to how much you spend.
- **Collaboration-centric.** Full build review, assignments/approvals, @mentions, and screenshot-level threads.
- **On-prem ready.** Enterprises can run Vizzly internally if they need to.

## Why Vizzly?

![Vizzly build screenshot comment](/assets/images/posts/vizzly-comment-screenshot.png)

Designers and developers iterate fast. The tooling should bridge their collaboration, not slow it
down or punish you for running more tests.

- **Real pixels in, real feedback out.** Because you send actual screenshots, you avoid re-render
  flakiness and "but it doesn't look like that on my machine" bugs.
- **TDD mode for rapid iteration.** Run tests locally with instant visual feedback—no waiting for
  CI, no pushing to see changes. The same screenshots that run in CI work on your laptop.
- **Flexible baselines.** Use Git-aware automatic baselines, manual baselines (not Git-based), or
  hybrid. Pick what matches your workflow, not the other way around.
- **Built-in collaboration.** Assign reviewers, request approvals, start screenshot-level threads,
  and work from an inbox that deep-links you to exactly what needs attention.
- **Custom properties for sane filtering.** Tag builds and screenshots with whatever matters to your
  team—component name, viewport, theme—then slice and dice reviews quickly.
- **Predictable pricing.** No per-screenshot anxiety. Grow coverage without getting penalized.
- **Open source is free.** OSS maintainers get a generous plan for public projects.

## How to use / setup

You already take screenshots in your tests—ship those to Vizzly.

### 1. Install the CLI and set your token

```bash
npm i -D @vizzly-testing/cli

# Set your API token
export VIZZLY_TOKEN=your-api-token
```

### 2. Capture in your tests (Playwright example)

```javascript
import { test, expect } from '@playwright/test'
import { vizzlyScreenshot } from '@vizzly-testing/cli/client'

test('homepage layout', async ({ page }) => {
  await page.goto('http://localhost:3000')
  let image = await page.screenshot({ fullPage: true })
  await vizzlyScreenshot('homepage-layout', image, {
    properties: {
      viewport: await page.viewportSize(),
      theme: 'light',
    },
  })
})
```

### 3. Run your tests with Vizzly

```bash
# Run tests with Vizzly integration
npx vizzly run "npm test"

# Or use TDD mode for rapid local development
npx vizzly tdd "npm test"
```

### 4. Review the build

![Vizzly build overview](/assets/images/posts/vizzly-build-overview-screenshot.jpg)

Open the build in Vizzly, assign reviewers, leave positioned comments, and approve once it matches
the baseline you expect. Run the same flow locally (TDD) and in CI; the CLI streams live build
updates either way.

Not using Playwright? Puppeteer, Cypress, WebDriver, or a headless renderer that gives you a PNG all
work—Vizzly just needs the image bytes and a name.

![Vizzly build screenshot review](/assets/images/posts/vizzly-comparison-screenshot.png)

## What's different?

- **Capture-first, not re-render-first.** Your environment, your pixels. No surprises from remote
  browser farms rebuilding your DOM.
- **Baselines that match reality.** Automatic (Git-aware), manual (not Git-based), or hybrid—switch
  per suite or per project.
- **Designer-developer collaboration that feels like real teamwork.** Assignments, approvals,
  @mentions, and screenshot-level threads keep the signal high.
- **GitHub integration that helps, not hypes.** Status checks and PR comments, plus commit/branch
  context to enhance baseline decisions.
- **Team-based pricing.** Predictable cost as you add coverage and people.
- **Self-host when you need to.** On-prem deploy for companies that can't send images to a cloud
  service.
- **OSS is free.** If you maintain open source, you're covered.

---

If this resonates, I'd love for you to [try Vizzly](https://vizzly.dev) on a small slice of your UI
and tell me where it shines (and where it doesn't). I've lived this space for years -- Vizzly is my
take on how visual review and design-development collaboration should feel.
