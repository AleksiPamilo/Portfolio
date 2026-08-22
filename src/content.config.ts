import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projectsCollection = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        image: z.string(),
        repoUrl: z.url().optional(),
        url: z.url().optional(),
        techStack: z.array(z.string()),
        publishDate: z.date(),
    }),
});

export const collections = {
    'projects': projectsCollection,
};