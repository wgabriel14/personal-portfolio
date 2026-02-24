# Williams Reyes — Personal Portfolio

Personal portfolio website for Williams Reyes, AI & Network Automation Engineer. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS + `@tailwindcss/typography` |
| Animations | Framer Motion (scroll-triggered `whileInView`) |
| Blog | MDX via `next-mdx-remote` + `gray-matter` |
| Contact form | `react-hook-form` + Zod + Resend API |
| Icons | `lucide-react` + `react-icons` |
| Deployment | Vercel |

## Features

- **Hero** — animated radial gradient background, staggered entrance, social links
- **About** — profile photo, bio, career evolution timeline
- **Skills** — 4 grouped badge grids (AI & Automation, Networking, Programming, VoIP)
- **Experience** — vertical timeline with 3 roles
- **Projects** — responsive card grid with live/coming-soon status badges
- **Blog** — MDX-powered posts with `/blog` listing and `/blog/[slug]` dynamic pages
- **Contact** — Zod-validated form → Resend email API, success animation
- **Sitemap** — auto-generated via `app/sitemap.ts`
- **Custom 404** page

## Project Structure

```
personal-portfolio/
├── app/
│   ├── layout.tsx               # Root layout: fonts, metadata, Navbar, Footer
│   ├── page.tsx                 # Home: all sections assembled
│   ├── globals.css
│   ├── not-found.tsx
│   ├── sitemap.ts
│   ├── blog/
│   │   ├── page.tsx             # Blog listing
│   │   └── [slug]/page.tsx      # Individual MDX post
│   └── api/contact/route.ts     # POST: Zod validate → Resend send
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   ├── Blog.tsx
│   │   └── Contact.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Badge.tsx
│       ├── SectionHeading.tsx
│       ├── ProjectCard.tsx
│       ├── BlogCard.tsx
│       └── TimelineItem.tsx
├── content/blog/                # MDX posts
├── lib/
│   ├── data.ts                  # All static content
│   ├── mdx.ts                   # getAllPosts() + getPostBySlug()
│   ├── sendEmail.ts             # Resend wrapper
│   └── utils.ts                 # cn(), formatDate()
├── public/images/               # Profile photo and project images
└── types/index.ts               # Shared TypeScript types
```

## Getting Started

### Prerequisites

- Node.js 20 (see `.nvmrc`)
- npm

```bash
nvm use   # switches to Node 20 from .nvmrc
```

### Installation

```bash
# Clone the repo
git clone https://github.com/wgabriel14/personal-portfolio.git
cd personal-portfolio

# Install dependencies
npm install

# Copy env template and fill in your values
cp .env.example .env.local
```

### Environment Variables

Create `.env.local` at the project root:

```bash
# Resend API key (https://resend.com/api-keys)
RESEND_API_KEY=re_your_api_key_here

CONTACT_EMAIL_TO=reyesmanriquewg@gmail.com
CONTACT_EMAIL_FROM=Portfolio Contact <onboarding@resend.dev>

# Update after Vercel deploy
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

## Adding Blog Posts

Create a `.mdx` file in `content/blog/`:

```mdx
---
title: "Your Post Title"
date: "2025-11-01"
excerpt: "A short description shown in the post card."
tags: ["AI", "Networking"]
draft: false
---

Your content here...
```

The post is automatically picked up by `getAllPosts()` and included in the blog listing and sitemap. Set `draft: true` to hide a post without deleting it.

## Deployment

The site is deployed on Vercel with automatic deploys on every push to `main`.

### Vercel Environment Variables

Add these in **Vercel → Project → Settings → Environment Variables**:

| Name | Value |
|---|---|
| `RESEND_API_KEY` | Your Resend API key |
| `CONTACT_EMAIL_TO` | `reyesmanriquewg@gmail.com` |
| `CONTACT_EMAIL_FROM` | `Portfolio Contact <onboarding@resend.dev>` |
| `NEXT_PUBLIC_SITE_URL` | `https://williamsreyes.dev` |

## Design Tokens

| Token | Value |
|---|---|
| Background | `#0a0a0a` |
| Card | `#141414` |
| Border | `#1e1e1e` |
| Accent (cyan) | `#00d4ff` |
| Text primary | `#f5f5f5` |
| Text muted | `#a0a0a0` |
| Body font | Inter |
| Heading font | Space Grotesk |

## License

This project is open source. Feel free to use it as a reference or template for your own portfolio — just swap out the content for your own.
