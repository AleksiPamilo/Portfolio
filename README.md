# pmlo.dev

Source code for my personal portfolio website at [pmlo.dev](https://pmlo.dev).

## Tech stack

- **Framework:** Astro
- **Styling:** Tailwind CSS (v4)
- **Deployment:** GitHub Pages

## Development

```bash
# Install dependencies
pnpm install

# Start local dev server
pnpm dev

# Build for production
pnpm build

# Preview production build locally
pnpm preview
```

## Adding a project

Projects are stored in `src/content/projects/*.md`. New entries need the following frontmatter:

```markdown
---
title: "Project Name"
description: "Short summary"
image: "/image-path.png"
repoUrl: "https://github.com/..." # optional
url: "https://..."                # optional
techStack: ["TypeScript", "Vue"]
publishDate: 2026-08-28 # YYYY-MM-DD (used for sorting)
---
```

## License

[MIT](LICENSE)
