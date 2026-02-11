---
title: 'Introducing DraftPatch: A macOS App for Quick AI-Powered Editing'
date: 2025-03-28 12:00 -0500
excerpt: >
  When I first used ChatGPT's "work with" feature, I loved how effortlessly it integrated AI into my dev
  workflow. But it only worked with ChatGPT, and it seemed unlikely OpenAI would support an app like Emacs.
---

![DraftPatch example screenshot](/assets/images/posts/draftpatch-screenshot.png)

When I first used ChatGPT's "work with" feature, I loved how effortlessly it integrated AI into my
dev workflow. But it only worked with ChatGPT, and it seemed unlikely OpenAI would support an app
like Emacs. I wanted something similar that supported all my favorite LLM models: OpenAI, Anthropic,
Gemini, even locally hosted Ollama models. Plus, I wanted a genuine macOS app, not another
Electron-based solution.

That's why I built DraftPatch. It's lightweight, straightforward, and fully native. DraftPatch
quickly grabs text from your current selection or active window using macOS accessibility APIs. So,
whether you're coding in Xcode, editing text in Emacs, jotting notes in Notes.app, or working from
the terminal in iTerm, DraftPatch is ready to help you draft and refine your text effortlessly.

Here’s what DraftPatch offers:

- ✅ **Multiple AI Providers:** Supports OpenAI, Anthropic, Gemini, and Ollama.
- ✅ **Fast Text Selection:** Uses macOS accessibility to pull in your current selection seamlessly.
- ✅ **Markdown Rendering:** Clear syntax highlighting for your drafts.
- ✅ **Easy Setup:** Install, add your API keys or Ollama server URL, pick your model, and start drafting.

Going forward, I'm planning to add support for Model Context Protocol (MCP), so DraftPatch can apply
changes directly within your apps. Until then, it's already making my workflow easier—and I think
it'll help you too.

If this sounds useful, [give DraftPatch a try](https://github.com/Robdel12/DraftPatch/releases)!
