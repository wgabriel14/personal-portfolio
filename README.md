# Williams Reyes — Personal Portfolio

Personal portfolio for Williams Reyes, AI & Network Automation Engineer. Built with Next.js 14 and deployed on Vercel.

**Live:** [williamsreyes.dev](https://williamsreyes.dev)

---

## Features

- **Hero** — portfolio video with play/pause control, animated background, social links
- **About** — bio, career timeline, profile photo
- **Skills** — grouped badge grids (AI & Automation, Networking, Programming, VoIP)
- **Experience** — vertical timeline with 3 roles
- **Projects** — card grid with live/coming-soon status and real production metrics
- **AI Demo** — live voice call and chat powered by Retell AI, both access-code protected
- **Blog** — MDX-powered posts with listing and dynamic slug pages
- **Contact** — direct links to LinkedIn, email, and GitHub
- **Sitemap** — auto-generated via `app/sitemap.ts`
- **Custom 404** page

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS + Framer Motion |
| AI / Voice | Retell AI (`retell-client-js-sdk`) |
| Blog | MDX via `next-mdx-remote` + `gray-matter` |
| Icons | `lucide-react` |
| Deployment | Vercel |

---

## Project Structure

```
app/
  api/
    retell/
      create-web-call/   # Creates Retell voice call token (validates access code)
      create-chat/       # Creates Retell chat session (validates access code)
      chat-message/      # Relays messages in an active chat session
  blog/                  # MDX blog routes ([slug])
  layout.tsx
  page.tsx               # Home: all sections assembled

components/
  sections/              # Hero, About, Skills, Experience, Projects, AIDemo, Blog, Contact
  ui/                    # ProjectCard, VoiceDemo, ChatDemo, Button, Badge, ...
  layout/                # Navbar, Footer

content/blog/            # MDX posts
lib/
  data.ts                # All site content: projects, experience, skills, social links
public/
  videos/                # Portfolio video
  images/                # Profile photo and assets
types/index.ts           # Shared TypeScript interfaces
```

---

## Getting Started

**Prerequisites:** Node.js 20 (see `.nvmrc`)

```bash
nvm use
git clone https://github.com/wgabriel14/personal-portfolio.git
cd personal-portfolio
npm install
cp .env.example .env.local   # fill in your values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

| Variable | Description |
|---|---|
| `RETELL_API_KEY` | Retell AI secret key |
| `RETELL_VOICE_AGENT_ID` | Agent ID for the voice demo |
| `RETELL_CHAT_AGENT_ID` | Agent ID for the chat demo |
| `DEMO_ACCESS_CODE` | Code that gates both AI demos — validated server-side before any Retell session is created |
| `NEXT_PUBLIC_SITE_URL` | Public URL of the deployed site |

All variables must also be set in **Vercel → Project → Settings → Environment Variables** for production.

---

## AI Demo Security

Both the voice and chat demos require an access code before any Retell session is created. The code is validated in the API route server-side — no Retell token is issued (and no cost is incurred) if the code is wrong. A successful validation is stored in `sessionStorage` so one unlock covers both demos for the duration of the browser session.

---

## Adding Blog Posts

Create a `.mdx` file in `content/blog/`:

```mdx
---
title: "Your Post Title"
date: "2025-11-01"
excerpt: "Short description shown on the listing page."
tags: ["AI", "Networking"]
draft: false
---

Content here...
```

Set `draft: true` to hide without deleting. Posts are auto-included in the sitemap.

---

## Design Tokens

| Token | Value |
|---|---|
| Background | `#0a0a0a` |
| Card | `#141414` |
| Border | `#1e1e1e` |
| Accent | `#00d4ff` |
| Text primary | `#f5f5f5` |
| Text muted | `#a0a0a0` |
| Heading font | Space Grotesk |
| Body font | Inter |

---

## Deployment

Push to `main` triggers an automatic Vercel deployment.

```bash
git push origin main
```

---

## License

Open source — feel free to use as a reference or template. Swap out the content for your own.
