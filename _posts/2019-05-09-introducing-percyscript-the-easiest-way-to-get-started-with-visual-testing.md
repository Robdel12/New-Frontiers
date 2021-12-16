---
layout: post
title: "Introducing PercyScript: the easiest way to get started with visual testing"
date: 2019-05-09 13:01:01 UTC
excerpt: " Introducing PercyScript: The easiest way to get started with visual&nbsp;testing  We believe that visual tests are the lowest-effort, highest-value tests you can write. Giving your team full confidence in the UI that your..."
---

 <h3><strong>Introducing PercyScript: The easiest way to get started with visual testing</strong></h3><figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/1*NX6fwj11nBLEUVT_e3nLog.png" /></figure><p>We believe that visual tests are the lowest-effort, highest-value tests you can write. Giving your team full confidence in the UI that your users see and interact with every day is invaluable — and helping more teams unlock that value is a big part of our mission at <a href="https://percy.io/">Percy</a>.</p><p>To make visual testing more accessible, we introduced our <a href="https://blog.percy.io/introducing-our-free-visual-testing-plan-2cd70a34d89d">free plan</a> (and cheaper <a href="https://percy.io/pricing">plans</a>) this year. We’ve also invested a lot in building new <a href="https://docs.percy.io/docs/sdks">SDKs</a> to support for more web app frameworks, end-to-end testing frameworks, component libraries, and static sites.</p><p>But we wanted a way that people could get started with visual testing in <strong>minutes</strong>, without having to build on top of an existing test suite or framework. We wanted a way to test <strong>anything</strong> that runs in a browser.</p><p>Our newest SDK, <a href="https://docs.percy.io/docs/percyscript">PercyScript</a>, does exactly that, making it easier than ever to get started with visual testing.</p><h3>How it works</h3><p>With PercyScript you can add visual testing to anything that runs in a browser, including live URLs. You can get up and running with PercyScript in just a few minutes, and with just a few lines of JavaScript.</p><p>Here is a fully-working <a href="https://docs.percy.io/docs/percyscript">PercyScript</a>:</p><iframe src="" width="0" height="0" frameborder="0" scrolling="no"><a href="https://medium.com/media/92ea80c352610d00452f6bc4fb93c539/href">https://medium.com/media/92ea80c352610d00452f6bc4fb93c539/href</a></iframe><p>This script opens a browser, visits a local app, takes a snapshot, and sends it up to Percy for visual testing.</p><p>PercyScript can be as simple or advanced as you make it. It uses <a href="https://developers.google.com/web/tools/puppeteer/">Google Puppeteer</a> underneath, which means PercyScript can fully interact with elements by clicking, typing, waiting, etc.</p><p>In the rest of this post, we’ll show you how to install and configure PercyScript with a <a href="https://github.com/percy/example-todomvc">TodoMVC example app</a>, but you can also follow along to add PercyScript to your own application. Then we’ll make some visual changes and run our first visual review.</p><h3>Step 1: Install and configure PercyScript</h3><p><em>Note: </em><a href="https://nodejs.org/"><em>Node.js</em></a><em> and </em><a href="https://git-scm.com/book/en/v2/Getting-Started-Installing-Git"><em>git</em></a><em> are required for this tutorial</em></p><p>First, let’s set up our example app:</p><pre>$ git clone <a href="https://github.com/percy/example-todomvc.git">https://github.com/percy/example-todomvc.git</a><br>$ cd example-todomvc/<br>$ npm install<br>$ npm run start</pre><p>You can now visit <a href="http://localhost:8000/">http://localhost:8000</a> and play around with the todos app yourself.</p><p>Next, we’re going to install PercyScript and write our first visual tests for this application.</p><p>Keep the server running, and open a new terminal to run:</p><pre>$ npm install -D @percy/script</pre><p>This will add @percy/script to your package.json file.</p><p>Next, create a file named snapshots.js and add your first PercyScript:</p><iframe src="" width="0" height="0" frameborder="0" scrolling="no"><a href="https://medium.com/media/dcd864daf21d409aed1c70d987ff609e/href">https://medium.com/media/dcd864daf21d409aed1c70d987ff609e/href</a></iframe><p>That’s it! 🎉</p><p>The next step is to start running this PercyScript and seeing visual changes.</p><h3>Step 2: Run visual tests</h3><p>If you haven’t already, <a href="https://percy.io/signup">sign up for a Percy account</a>, name your organization, and create your first project.</p><figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/0*z1igXgK0gEYhFwCn" /></figure><p><em>Note: Signing up for a Percy account will kick off a 14-day trial, but once that expires, you’ll be transferred to our free plan which includes 5,000 free snapshots each month.</em></p><p>Percy is designed to run alongside your CI builds, but for this tutorial, we’re going to run PercyScript locally. Copy the PERCY_TOKEN environment variable from the new project screen or your project settings, then run:</p><pre>$ export PERCY_TOKEN=aaabbbcccdddeee <br>$ npx percy exec —- node snapshots.js</pre><pre># Or if you&#39;re using Windows:<br>$ set PERCY_TOKEN=aaabbbcccdddeee <br>$ npx percy exec —- node snapshots.js</pre><p><em>Note: Replace the token with your project-specific </em><em>PERCY_TOKEN.</em></p><p>You should see output like:</p><pre>$ npx percy exec —- node snapshots.js<br>[percy] created build #1: <a href="https://percy.io/test/example-todomvc/builds/1738842">https://percy.io/test/example-todomvc/builds/1738842</a><br>[percy] percy has started.<br>[percy] snapshot taken: ‘TodoMVC home page’<br>[percy] snapshot taken: ‘TodoMVC with a new todo’<br>[percy] stopping percy…<br>[percy] waiting for 2 snapshots to complete…<br>[percy] done.<br>[percy] finalized build #1: <a href="https://percy.io/test/example-todomvc/builds/1738842">https://percy.io/test/example-todomvc/builds/1738842</a></pre><p>What’s happening behind the scenes? Percy works by capturing the DOM snapshot everywhere the Percy snapshot command is called. We then recreate the page or component in our <a href="https://docs.percy.io/docs/percy-platform-basics#section-snapshot-rendering-and-asset-discovery">custom rendering environment</a>. New snapshots are compared against <a href="https://docs.percy.io/docs/baseline-picking-logic">baseline snapshots</a> to determine which pixels have changed.</p><figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/0*MuhQB5Sp-i0hwcU0" /></figure><p>You’ll see that since this is the first build, there isn’t anything to compare it to. It has also been “auto-approved” because the commit was on master and we assume that master builds are production-ready.</p><p>Now that you’re integrated and have pushed your first build establishing your baseline, let’s make a change and review the outcome in Percy!</p><h3>Step 3: Make and review visual changes</h3><p>Let’s make a new feature branch and introduce a visual change.</p><p>Use your text editor to edit index.html and make the h1 text on line 11 purple:</p><pre>&lt;h1 style=&quot;color:#9e66bf;&quot;&gt;</pre><p>Now run the snapshots again:</p><pre>$ npx percy exec —- node snapshots.js</pre><p>Head back to Percy or click the Percy build link to see the visual changes.</p><figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/1*c5GOfwHDJ_bSy0fRBOWSJw.png" /><figcaption>By clicking the area on the right, you can see the snapshot with the purple H1 underneath.</figcaption></figure><p>You’ve done your first visual review!</p><p>You can use <a href="https://docs.percy.io/docs/percyscript">PercyScript</a> in the same way with anything on the web. We’re excited to add this new SDK to Percy and make it even easier to get started with visual testing.</p><p><strong>Ready to integrate Percy into your own workflow?</strong></p><ul><li>Check out the <a href="https://docs.percy.io/docs/percyscript">PercyScript documentation</a> and <a href="https://docs.percy.io/docs/percyscript-tutorial">tutorial</a></li><li>Learn more about Percy’s visual review workflow <a href="https://docs.percy.io/docs/ci-setup">with CI</a></li><li>Read about adding a <a href="https://docs.percy.io/docs/source-code-integrations">source code integration</a></li></ul><p><em>Percy is an all-in-one visual testing solution that gives your team confidence in every visual change before it’s shipped. Learn more at </em><a href="https://percy.io/"><em>https://percy.io</em></a><em>. </em>🕵️‍♀️</p><img src="https://medium.com/_/stat?event=post.clientViewed&referrerSource=full_rss&postId=2c3f186cd87c" width="1" height="1" alt=""><hr><p><a href="https://blog.percy.io/introducing-percyscript-the-easiest-way-to-get-started-with-visual-testing-2c3f186cd87c">Introducing PercyScript: the easiest way to get started with visual testing</a> was originally published in <a href="https://blog.percy.io">Percy Blog</a> on Medium, where people are continuing the conversation by highlighting and responding to this story.</p>