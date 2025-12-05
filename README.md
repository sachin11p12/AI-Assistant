Here is your full README in a **single clean copy-paste Markdown page**.
No extra notes, no breaks — just the final README.

---

```markdown
# AI Chat App — Next.js + OpenAI Streaming + Image Upload

A modern **Next.js AI Chat Application** featuring:

- Live streaming AI responses  
- Image upload and paste-to-chat  
- Support for **OpenAI** 
- TailwindCSS-powered UI  
- Built using the **Next.js App Router**

This project was bootstrapped with [create-next-app](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

---

## Folder Structure

```

/app
/api
/chat
route.js        # Backend API – OpenAI streaming logic
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


```

---

## I use OpenAI API keys

Update the API client inside:

```
/app/api/chat/route.js
```



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

##Screenshot
<img width="1918" height="967" alt="Screenshot 2025-12-05 231631" src="https://github.com/user-attachments/assets/822f8dcc-30c6-4ad0-a113-4adb4ef1dda3" />

