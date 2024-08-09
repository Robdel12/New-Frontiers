---
layout: post
title: 'Building a GitHub Action for Monitoring RSS Feeds'
date: 2024-08-09 08:00 -0500
---

When I started this project, I wanted a simple, reliable way to receive notifications when new articles were published in 
an RSS feed (or set of feeds). Email seemed like a straightforward method for receiving these notifications, and GitHub Actions, 
with their free compute, provided an ideal platform for automating this.

## Why GitHub Actions?

GitHub Actions is a powerful tool for automating tasks directly within a GitHub repository. It offers free compute time, 
making it perfect for projects like this one, where I wanted to regularly monitor RSS feeds without needing a dedicated 
server or cloud function.

### The Evolution of the Action

The action started with a simple goal: check a list of RSS feeds for new articles and notify me via email when new content 
was detected. To achieve this, the action needed to:

1. **Monitor RSS Feeds:** This involved parsing RSS feeds and tracking the latest published articles.
2. **Persist State Across Runs:** To detect new articles reliably, the action had to maintain a record of previously seen
   articles. This was done by committing a JSON file (`lastPublished.json`) to the repository.
4. **Notify and Fail the Job:** If new articles were found, the action would set the GitHub Actions job to fail
   (which could trigger an email notification) and provide a summary of the new articles.

### Enhancements Along the Way

As I developed the action, several enhancements were made to improve its flexibility and usability:

- **Customizable Commit Directory and Message:** Users can now specify a custom directory where the JSON file should be committed and customize the commit message. This allows for better organization and clarity in repositories with complex structures.

- **Debugging Features:** A `debug` option was added to provide detailed logs during execution, making it easier to troubleshoot any issues that might arise.

### Conclusion

This GitHub Action has evolved into a robust solution for monitoring RSS feeds and receiving notifications when new content is
published. It leverages the free compute resources provided by GitHub Actions and offers a flexible and customizable approach
to RSS feed monitoring.

Whether you’re looking to stay up-to-date with your favorite blogs or need to automate RSS feed monitoring for your project,
this action provides a simple, effective solution. Check out the action on GitHub, and feel free to customize it to fit your
specific needs.

---

By harnessing the power of GitHub Actions, I was able to create a reliable, automated workflow for monitoring RSS feeds. 
This project is a great example of how you can leverage existing tools to solve everyday problems in a streamlined, 
efficient manner.
