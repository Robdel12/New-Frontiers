---
layout: post
title: Branch previews with Google App Engine
date: 2024-06-29 20:16 -0500
excerpt: 'We needed a way to deploy arbitrary branches to different environments via GitHub actions. We use Google App Engine to host our app.'
---

Lately, I’ve been a fan of blog posts that are short and sweet. So, let’s do that.

We needed a way to deploy arbitrary branches to different environments via GitHub actions. We use
Google App Engine to host our app.

## Assumptions

**This assumes you have already set up CI/CD**. I’m going to gloss over a lot of the setup (like
where to get env vars and all of that). This also assumes you’re handling everything else around
building your app & changing the DB the app is pointed to.

## Deploy Actions Workflow

I created a dedicated deploy actions workflow, which looks something like this:

```yaml
name: deploy-stage
on: workflow_dispatch # Manually trigger these deploys via GitHub's UI
jobs:
  deploy:
    name: Deploy staging
    runs-on: ubuntu-latest
    environment: staging # Tie your secrets & vars to a new environment
    permissions:
      contents: read
      id-token: write
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      # Needed since GitHub does not provide a nice way to get the current branch name
      - name: Extract branch name
        id: get_branch
        run: echo "branch=$(echo ${GITHUB_REF#refs/heads/} | tr / -)" >> $GITHUB_OUTPUT

      - name: Authenticate to Google Cloud
        uses: google-github-actions/auth@v2
        with:
          workload_identity_provider: ${{ your_var_here }}
          service_account: ${{ your_var_here }}

      - name: Set up Google Cloud SDK
        uses: google-github-actions/setup-gcloud@v2

      - name: Deploy to Google App Engine
        id: 'deploy-staging'
        uses: google-github-actions/deploy-appengine@v2
        with:
          flags: |
            --no-promote
            --quiet
            --version stage-${{ steps.get_branch.outputs.branch }}
            --service-account=${{ your_var_here }}

      - name: Deployed
        run: echo "${{ steps.deploy-staging.outputs.version_url }}" >> $GITHUB_STEP_SUMMARY
```

Basically, this will:

- Extract a nice branch name
- Authenticate with GCP
- Install the gcloud CLI
- Deploy the app to app engine with the `--version` & `—no-promote` flags.

The `—version` and `--no-promote` flags are important. `--version` allows us to name this app
version in App Engine after the branch. `--no-promote` might be the most important. This prevents
the deployment from being promoted to getting primary traffic. Aka, do not send this to production.

## Deleting the Preview

When the branch is deleted in GitHub, we want to also delete the preview in App Engine (and any
other cleanup you might want to perform).

```yaml
name: delete-stage
on: delete
jobs:
  delete:
    name: Delete staging
    if: github.event.ref_type == 'branch'
    runs-on: ubuntu-latest
    environment: staging
    permissions:
      contents: read
      id-token: write
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Extract branch name
        id: get_branch
        run: echo "branch=$(echo ${{ github.event.ref }} | sed 's#refs/heads/##' | tr / -)" >> $GITHUB_OUTPUT

      - name: Authenticate to Google Cloud
        uses: google-github-actions/auth@v2
        with:
          workload_identity_provider: ${{ your_var_here }}
          service_account: ${{ your_var_here }}

      - name: Set up Google Cloud SDK
        uses: google-github-actions/setup-gcloud@v2

      - name: Delete deployment
        run: |
          gcloud app versions delete stage-${{ steps.get_branch.outputs.branch }} |:
```

This will run each time a branch is deleted. So make sure whatever is put in this workflow can fail
safely if there wasn’t ever a deploy. That’s what `|:` is doing for me at the end of the `delete`
command. We’re telling bash basically `|| true`, so it’ll always be a passing job.
