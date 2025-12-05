Here is your full README in a **single clean copy-paste Markdown page**.
No extra notes, no breaks — just the final README.

---

```markdown
# AI Chat App — Next.js + OpenAI Streaming + Image Upload

A modern **Next.js AI Chat Application** featuring:

- Live streaming AI responses  
- Image upload and paste-to-chat  
- Support for **OpenAI** and **Gemini**  
- TailwindCSS-powered UI  
- Built using the **Next.js App Router**

This project was bootstrapped with [create-next-app](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

---

## Folder Structure

```

/app
/api
/chat
route.js        # Backend API – OpenAI/Gemini streaming logic
/components
MessageBubble.js
page.js             # Main UI & chat logic
globals.css

````

---

## Installation

```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
````

Start the development server:

```bash
npm run dev
```

Open in your browser:

```
http://localhost:3000
```

Main UI file:

```
app/page.js
```

---

## Environment Variables

Create a `.env.local` file in the project root.

### OpenAI

```
OPENAI_API_KEY=your_openai_api_key
```

### Gemini

```
GEMINI_API_KEY=your_gemini_key
```

---

## Switch Between OpenAI & Gemini

Update the API client inside:

```
/app/api/chat/route.js
```

No frontend changes required.

---

## Features

### Live AI Streaming

```javascript
const reader = res.body.getReader();
```

### Image Upload & Paste Support

* Select image via file picker
* Paste image directly (Ctrl + V)
* Images sent as Base64

### Auto Scrolling

```javascript
bottomRef.current?.scrollIntoView({ behavior: "smooth" });
```

### Modern Chat UI

* TailwindCSS
* Lucide Icons
* Responsive layout
* Dark-mode-inspired theme


Tell me your preferred style.
```
