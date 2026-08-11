# AI Chat App — Next.js + OpenAI Streaming + Image Upload

A minimal, modern AI chat application built with Next.js (App Router). This project supports streaming responses from OpenAI, image upload and paste-to-chat, and a responsive TailwindCSS UI.

Key features
- Live streaming AI responses for a low-latency chat experience
- Image upload via file picker and direct paste (images sent as Base64)
- Built with Next.js App Router and TailwindCSS
- Easy to configure with an OpenAI API key

---

## Table of contents
- [Features](#features)
- [Demo / Screenshot](#demo--screenshot)
- [Folder structure](#folder-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment variables](#environment-variables)
- [How it works (brief)](#how-it-works-brief)
- [Development notes](#development-notes)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- Live streaming AI responses using the OpenAI streaming API
- Image upload and clipboard paste support (Base64 encoded)
- TailwindCSS-based UI with responsive layout and dark-mode-friendly styling
- Minimal codebase using the Next.js App Router

---

## Demo / Screenshot

![App screenshot](https://github.com/user-attachments/assets/822f8dcc-30c6-4ad0-a113-4adb4ef1dda3)

---

## Folder structure
```
/app
  /api
    /chat
      route.js        # Backend API — OpenAI streaming logic
  /components
    MessageBubble.js  # Message UI component
  page.js             # Main UI & chat logic
  globals.css         # Tailwind and global styles

README.md
```

---

## Prerequisites
- Node.js 18+ (or the version recommended by your Next.js release)
- An OpenAI API key

---

## Installation
Install dependencies and run the dev server:

```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install

npm run dev
```

Open the app at:

```
http://localhost:3000
```

Main UI file: `app/page.js`

---

## Environment variables
Create a `.env.local` file in the project root and add your OpenAI key:

```
OPENAI_API_KEY=your_openai_api_key
```

(You can add a `.env.example` with the same key name for documentation.)

---

## How it works (brief)
- The frontend sends chat messages (and Base64-encoded images) to the server API at `/api/chat`.
- The server forwards the conversation to OpenAI and streams the response back to the client.
- Streaming is implemented by reading the response stream (for example, `res.body.getReader()`) and piping chunks to the UI so the assistant reply appears progressively.
- Images are accepted from file input or clipboard paste and encoded as Base64 before being sent.

---

## Development notes
- API implementation: `app/api/chat/route.js` — update your OpenAI client configuration there.
- Example streaming reader used in the app:

```javascript
const reader = res.body.getReader();
// read chunks and append to the UI as they arrive
```

- Auto-scroll example:

```javascript
bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
```

---

## Deployment
Deploy to Vercel (recommended) or any Node-friendly host. Ensure the `OPENAI_API_KEY` environment variable is set in your deployment settings.

---

## Contributing
Contributions are welcome. Please open an issue or submit a pull request with a clear description of the change. Small, focused PRs are easiest to review.

---

## License
No license file is included in the repository. Add a `LICENSE` file if you want to make the project open source and define the terms.
