---
layout: post
title: Introducing the Ghost Digest Generator Action
date: 2024-08-11 02:17 -0500
---

If you’re a Ghost blog user like me, you might have noticed a gap: there’s no built-in way to generate
digests of your posts. I was surprised to find this missing feature, especially since regular
round-ups can be a fantastic way to keep your subscribers engaged or up to date.

To fill this gap, I created the **Ghost Digest Generator Action**. This GitHub Action is designed to
automate the process of generating and sending digest emails to your subscribers.

Why an action? GitHub Actions offer free compute resources and the flexibility to set up cron
jobs, making them perfect for tasks like digest generation. With this action, you can easily
configure periodic digests, whether you want them to be daily, weekly, or tailored to your needs.

**Quick Start Example Workflow:**

```yaml
name: Generate Digest
on:
  schedule:
    - cron: '0 0 * * *' # Runs daily at midnight
jobs:
  generate-digest:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Generate digest
        uses: your-username/ghost-digest-generator@v1
        with:
          url: 'https://your-ghost-url.com'
          period: 'daily'
          tags: 'Digest, Custom'
          timezone: 'America/Chicago'
        env:
          GHOST_API_KEY: ${{ secrets.GHOST_API_KEY }}
```

This example sets up a daily digest at midnight. Adjust the cron schedule and inputs as needed for
your setup. Check out the [Ghost Digest Generator Action on GitHub
Marketplace](https://github.com/marketplace/actions/ghost-digest-generator)

Feel free to reach out with any feedback or suggestions. Happy ghost digesting!
