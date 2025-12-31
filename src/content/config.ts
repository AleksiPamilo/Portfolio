import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        image: z.string(),
        repoUrl: z.string().url().optional(),
        demoUrl: z.string().url().optional(),
        techStack: z.array(z.string()),
        publishDate: z.date(),
    }),
});

export const collections = {
    'projects': projectsCollection,
};