"use client";

import { useEffect, useRef, useState } from "react";
import MessageBubble from "./components/MessageBubble";
import { Paperclip, ArrowUp } from "lucide-react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const bottomRef = useRef(null);

  // Convert image to Base64
  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle image selection
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle pasted image
  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.startsWith("image")) {
          const file = item.getAsFile();
          if (file) {
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file));
          }
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  // Send message with streaming
  const handleSendMessage = async () => {
    if (!input.trim() && !selectedImage) return;

    let imageBase64 = null;
    if (selectedImage) {
      try {
        imageBase64 = await convertImageToBase64(selectedImage);
      } catch (error) {
        console.error("Error converting image:", error);
        return;
      }
    }

    const userMessage = input;

    // Add user message immediately
    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage, image: imagePreview },
    ]);

    // Reset input & preview
    setInput("");
    setSelectedImage(null);
    setImagePreview(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, image: imageBase64 }),
      });

      if (!res.ok) throw new Error("Failed to fetch streaming response");

      //  STREAM READING
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let aiMessage = "";

      // Add an empty assistant message first for streaming
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value);
          aiMessage += chunk;

          // Update last assistant message incrementally
          setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = { role: "assistant", content: aiMessage };
            return copy;
          });
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `⚠️ Error: ${error.message}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#181a1a] p-4">
      <div className="w-full max-w-4xl h-[90vh] bg-gray-100 rounded-2xl shadow-lg flex flex-col border border-gray-700">
        {/* HEADER */}
        <div className="p-4 border-b border-gray-600 bg-gray-900 text-white rounded-t-2xl text-center">
          <h1 className="text-xl font-bold">How can I Help you</h1>
          <p className="text-sm text-gray-300">
            Ask questions with text or images.
          </p>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#1e2121]">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              <p className="mb-2">💬 Start a conversation!</p>
              <p className="text-sm">Text or paste/upload an image</p>
            </div>
          )}

          {messages.map((msg, index) => (
            <MessageBubble
              key={index}
              role={msg.role}
              content={msg.content}
              image={msg.image}
            />
          ))}

          {/* LOADING DOTS */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[75%] px-4 py-2 rounded-2xl bg-gray-400 text-gray-900 rounded-bl-none">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* INPUT AREA */}
        <div className="p-4 border-t border-gray-600 bg-gray-900 rounded-b-2xl">
          <div className="flex gap-2 text-black">
            {/* TEXT INPUT WITH IMAGE + SEND ICONS */}
            <div className="flex-1 relative group">
              {/* Input box */}
              <input
                className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-20 text-sm focus:ring-2 focus:ring-blue-800 focus:outline-none bg-gray-200"
                placeholder="Type your message here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={isLoading}
              />

              {/* IMAGE UPLOAD ICON */}
              <label className="absolute right-12 top-1/2 -translate-y-1/2 cursor-pointer p-2 text-gray-600 hover:text-blue-600 transition">
                <Paperclip className="w-5 h-5" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageSelect}
                />
              </label>

              {/* ARROW UP ICON (Send Button) */}
              <button
                onClick={handleSendMessage}
                disabled={isLoading || (!input.trim() && !selectedImage)}
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer p-2 
             text-gray-600 hover:text-blue-600 disabled:text-gray-400 transition"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* IMAGE PREVIEW */}
          {imagePreview && (
            <div className="mt-3 p-2 bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm text-gray-300">Image ready to send:</p>
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setImagePreview(null);
                  }}
                  className="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              </div>
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg border border-gray-600"
              />
            </div>
          )}

          <p className="text-xs text-gray-400 mt-2 text-center">
            Press Enter to send or paste an image
          </p>
        </div>
      </div>
    </div>
  );
}
