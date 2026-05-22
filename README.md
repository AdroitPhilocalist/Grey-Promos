# Grey Promos India Pvt. Ltd. Website

This is a premium, highly animated agency website for Grey Promos India Pvt. Ltd., built with Next.js, Tailwind CSS, and Framer Motion.

## Tech Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scroll:** [Lenis](https://github.com/darkroomengineering/lenis)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Type:** TypeScript

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app`: Page routes and global styles.
- `src/components`: Reusable UI components.
- `src/data`: Static content for services, projects, clients, etc.
- `src/lib`: Utility functions.
- `public/`: Static assets (images, logos).

## Replacing Images

To replace the placeholder project images:
1. Extract images from the provided PDFs.
2. Place them in `public/projects/`.
3. Update the `image` paths in `src/data/projects.ts`.

Same applies for:
- `public/logos/` for client logos.
- `public/images/` for blog/insight thumbnails.

## Content Updates

- **Services:** Modify `src/data/services.ts`
- **Projects:** Modify `src/data/projects.ts`
- **Clients:** Modify `src/data/clients.ts`
- **Operations:** Modify `src/data/operations.ts`
- **Insights:** Modify `src/data/insights.ts`

## Deployment

The easiest way to deploy this is on [Vercel](https://vercel.com/new).

```bash
npx vercel
```
