# 🚀 AI Chat App — Next.js + OpenAI Streaming + Image Upload

This is a *Next.js AI Chat Application* featuring:

- 💬 Live streaming AI responses  
- 🖼 Image upload + paste-to-chat  
- 🤖 Support for OpenAI or Gemini  
- 🎨 Modern UI using TailwindCSS  
- ⚡ Built with Next.js App Router  

This project was bootstrapped with [create-next-app](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

---

## 📁 Folder Structure
/app
/api
/chat
route.js # Backend API – OpenAI/Gemini streaming logic
/components
MessageBubble.js
page.js # Main UI & chat logic
globals.css


---

## 🛠 Installation

```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install


Now open:
##👉 http://localhost:3000

You can start editing by modifying:

app/page.js


The app updates automatically on file save.

This project uses next/font
 to load Geist, a font by Vercel.

🔧 Environment Variables

Create a .env.local file in the project root.

For OpenAI
OPENAI_API_KEY=your_openai_api_key

For Gemini
GEMINI_API_KEY=your_gemini_key

🤖 Switching Between OpenAI & Gemini

You only need to edit one file:

/app/api/chat/route.js


Replace the current API client (OpenAI/Gemini).
The frontend requires no changes — message streaming continues working automatically.

✨ Features
✔ Live AI Streaming

Reads chunks progressively using:

const reader = res.body.getReader();

✔ Image Upload / Paste Support

Supports:

Selecting images from file picker

Pasting images directly (Ctrl + V)

Images are converted to Base64 before sending.

✔ Auto Scrolling

Every new message scrolls the UI automatically:

bottomRef.current?.scrollIntoView({ behavior: "smooth" });

✔ Modern Chat UI

Styled using:

TailwindCSS

Lucide Icons

Responsive flex layout

Dark mode inspired theme





