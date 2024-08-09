---
layout: post
title: 'GitHub Action for Monitoring RSS Feeds'
date: 2024-08-09 08:00 -0500
---

When I started this project, I wanted a simple, reliable way to receive notifications when new
articles were published in a few RSS feeds. Mainly the Apple developer RSS feeds. Email seemed like
a straightforward method for receiving these notifications, and GitHub Actions, with their free
compute capabilities, provided an ideal platform for automating the task.

## Why GitHub Actions?

GitHub Actions is a powerful tool for automating tasks directly within a GitHub repository. It
offers free compute time, making it perfect for projects like this one, where I wanted to regularly
monitor RSS feeds without needing a dedicated server or cloud function. Additionally, GitHub Actions
is tightly integrated with the GitHub ecosystem, which simplifies workflows involving notifications.

## The Evolution of the Action

The action started with a simple goal: check a list of RSS feeds for new articles and notify me via
email when new content was detected. To achieve this, the action needed to:

- **Monitor RSS Feeds:** This involved parsing RSS feeds and tracking the latest published
articles.
- **Persist State Across Runs:** To detect new articles reliably, the action had to maintain a
record of previously seen articles. This was done by committing a JSON file
(`lastPublished.json`) to the repository.
- **Notify and Fail the Job:** If new articles were found, the action would set the GitHub Actions
job to fail (which could trigger an email notification) and provide a summary of the new
articles.

### Enhancements Along the Way

As I developed the action, several enhancements were made to improve its flexibility and usability:

- **Reusable Action:** Originally, this project began as a simple Node.js script. Converting it into
a reusable GitHub Action allowed me to easily integrate it into multiple workflows and monitor
various RSS feeds across different projects.
- **Customizable Commit Directory and Message:** Users can now specify a custom directory where the
JSON file should be committed and customize the commit message. This allows for better
organization and clarity in repositories with complex structures.
- **Debugging Features:** A `debug` option was added to provide detailed logs during execution,
making it easier to troubleshoot any issues that might arise.

## Installing and Using the Action

To use this action in your own projects, you can reference it directly from your workflow
file. Here’s how to get started:

1. **Install the Action:**

You don't need to install anything; you just need to reference the action in your GitHub workflow
file. The action is available at `robdel12/rss-checker@v1.0.0`.

You can find it on the [GitHub
Marketplace](https://github.com/marketplace/actions/rss-monitor-action).

2. **Example Usage:**

Below is an example workflow file (`.github/workflows/rss-monitor.yml`) that demonstrates how to use
the RSS Monitor GitHub Action:

   ```yaml
   name: RSS Feed Monitor

   on:
     schedule:
       - cron: '*/45 * * * *'  # Run every 45 minutes
     workflow_dispatch:
   jobs:
     monitor:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout code
           uses: actions/checkout@v3
         - name: Run RSS feed monitor
           uses: robdel12/rss-checker@v1.0.0
           with:
             rss-feeds: |
               https://example.com/rss-feed1
               https://example.com/rss-feed2
               https://example.com/rss-feed3
               https://example.com/rss-feed4
             commit-directory: 'path/to/your/custom/dir'
             commit-message: 'Custom commit message'
             debug: true
           env:
             GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
   ```

## What's Next

Looking ahead, I'd like to explore adding an option—or even converting the action entirely—to use
GitHub Artifacts for storing the `lastPublished.json` file instead of committing it directly to the
repository. While this approach offers a cleaner way to handle data between jobs, it comes with its
own set of challenges. The primary complexity lies in locating the last workflow run that contains
the `lastPublished.json` artifact, which, while not impossible (of course), does introduce some
potential pitfalls & complexities. This will be an interesting enhancement to tackle in the future.

## Wrapping up

This GitHub Action has evolved into a nice little solution for monitoring RSS feeds and receiving
notifications when new content is published. It leverages the free compute resources provided by
GitHub Actions and offers a flexible and customizable approach to RSS feed monitoring.

Whether you’re looking to stay up-to-date with your favorite blogs or need to automate RSS feed
monitoring for your project, this action provides a simple, effective solution. Check out the action
on GitHub, and feel free to customize it to fit your specific needs.
