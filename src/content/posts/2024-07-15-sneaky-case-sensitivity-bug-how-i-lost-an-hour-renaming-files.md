---
title: 'Sneaky Case Sensitivity Bug: How I Lost an Hour Renaming Files'
date: 2024-07-15 18:11 -0500
excerpt: 'A costly debugging lesson about case sensitivity differences between macOS and Git that led to deployment failures.'
---

Today, I encountered a sneaky bug that cost me an hour of debugging. It all started when I renamed `App.jsx` to `app.jsx` on my macOS machine. macOS, being case-insensitive, handled the change gracefully. However, Git, which is case-sensitive, still recognized the file as `App.jsx`.

Locally, everything seemed to work fine. The code was importing `app.jsx`, and since macOS didn’t mind the case difference, I didn’t notice any issues. However, when I deployed the app and built it via GitHub Actions, everything blew up. The build process was still looking for App.jsx, and it couldn’t find the file, causing the deployment to fail.

To resolve this, I had to ensure that all filenames in my repository were correctly lowercased. Here’s the one-liner bash command I used to find all uppercase files tracked by Git and rename them to their lowercase versions:

```bash
git ls-files | grep -E '[A-Z]' | while read -r file; do lower=$(echo "$file" | tr 'A-Z' 'a-z'); mkdir -p "$(dirname "$lower")"; git mv "$file" "$lower"; done
```

This command does the following:

- Finds: Uses `git ls-files` to list all files tracked by Git and `grep -E '[A-Z]'` to filter files with uppercase letters.
- Converts: Changes each filename to its lowercase version.
- Creates: Ensures the necessary directories for the new lowercase filenames exist.
- Renames: Uses `git mv` to rename the files, keeping the changes tracked by Git.

Lesson learned: Always be cautious with file renaming on case-insensitive file systems, especially when working with case-sensitive version control systems like Git. This simple oversight can lead to frustrating deployment issues, costing valuable time. Hopefully, this one-liner can save someone else the headache I experienced!
