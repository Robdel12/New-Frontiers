---
layout: default
---

<h1>Blog posts</h1>

{%- if site.posts.size > 0 -%}
{%- for post in site.posts -%}
<div class="blog-post">
  <h2>
    <a class="post-link" href="{{ post.url | relative_url }}">
      {{ post.title | escape }}
    </a>
  </h2>
  <p>{{ post.date | date: "%b %e" }}</p>
</div>
{%- endfor -%}
{%- endif -%}
