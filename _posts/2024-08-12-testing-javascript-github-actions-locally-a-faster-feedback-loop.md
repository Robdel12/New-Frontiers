---
layout: post
title: 'Testing JavaScript GitHub Actions Locally: A Faster Feedback Loop'
date: 2024-08-12 00:53 -0500
---

When developing JavaScript GitHub Actions, the typical workflow involves pushing changes to a
repository and waiting for GitHub Actions to execute your code. While this process is effective, it
can be time-consuming and slow down your development feedback loop. Fortunately, there's a way to
speed up the process by running your action locally. This method doesn't fully emulate the GitHub
Actions environment, but it allows you to execute your Node.js script locally, providing faster
feedback during development.

#### Understanding `@actions/core` and Environment Variables

The key to running your GitHub Action locally lies in understanding how the `@actions/core` package
retrieves inputs. Specifically, the `getInput` function fetches values from environment variables
that are prefixed with `INPUT_`. Here's how the function works:

```typescript
export function getInput(name: string, options?: InputOptions): string {
  const val: string =
    process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || ''
  if (options && options.required && !val) {
    throw new Error(`Input required and not supplied: ${name}`)
  }

  if (options && options.trimWhitespace === false) {
    return val
  }

  return val.trim()
}
```

As shown above, the `getInput` function looks for an environment variable named
`INPUT_<YOUR_INPUT_NAME>` (with spaces replaced by underscores and converted to uppercase). This
approach allows you to simulate the input values your GitHub Action would receive when running in
the cloud by setting these environment variables locally.

#### Running Your Action Locally

To test your GitHub Action locally, you can set the required inputs as environment variables before
running your script. Here's an example:

```bash
INPUT_DEBUG=true INPUT_URL=https://apple-rumors.com INPUT_PERIOD=daily node index.js
```

In this example, the `INPUT_DEBUG`, `INPUT_URL`, and `INPUT_PERIOD` environment variables simulate
the inputs that would normally be passed by GitHub Actions. This allows you to run your script
(`index.js`) locally, effectively testing how it will behave in the GitHub Actions environment
without having to push your changes to GitHub repeatedly.

#### Benefits and Considerations

Running your action locally offers several advantages:

- **Faster Feedback Loop**: You can instantly test changes to your script without waiting for GitHub
  Actions to trigger, significantly speeding up your development process.
- **No Need for Docker Setup**: Since you're running the script directly on your machine, there's no
  need to configure Docker locally, making the setup simpler and faster.

However, it's important to note that this method doesn't perfectly replicate the GitHub Actions
environment. For example, GitHub-specific context variables (like `GITHUB_REF` or `GITHUB_SHA`)
won't be available unless you manually set them. Therefore, while this approach is great for rapid
iteration, you should still test your action within the full GitHub Actions environment before
finalizing it.

#### Conclusion

By leveraging environment variables to simulate input values, you can effectively run and test your
JavaScript GitHub Actions locally. This approach isn't a full replacement for testing within
GitHub's infrastructure, but it can dramatically speed up your development process by providing
immediate feedback. So next time you're iterating on a GitHub Action, try running it locally
first—your future self will thank you for the time saved.

This method showcases the power of understanding how tools work under the hood and using that
knowledge to create more efficient workflows.
