import { defineCollection, z } from 'astro:content'

let posts = defineCollection({
  type: 'content',
  schema: z.object({
    layout: z.string().optional(), // Jekyll layout field
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string().optional(),
  }),
})

export let collections = {
  posts: posts,
}
