import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  let posts = await getCollection('posts');
  posts = posts.sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  
  return rss({
    title: 'Robert DeLuca Blog',
    description: 'Software engineer sharing thoughts on web development, accessibility, and racing',
    site: context.site || 'https://robertdelu.ca',
    items: posts.map((post) => {
      let date = new Date(post.data.date);
      let year = date.getFullYear();
      let month = String(date.getMonth() + 1).padStart(2, '0');
      let day = String(date.getDate()).padStart(2, '0');
      let cleanSlug = post.slug.replace(/^\d{4}-\d{2}-\d{2}-/, '');
      let url = `/${year}/${month}/${day}/${cleanSlug}`;
      
      return {
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.excerpt || '',
        link: url,
      };
    }),
  });
}