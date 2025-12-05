export default function MessageBubble({ role, content, image }) {
    const isUser = role === "user";

    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
            <div
                className={`max-w-[75%] px-4 py-1 rounded-2xl ${isUser
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-900 rounded-bl-none"
                    }`}
            >
                {/* Display image if exists */}
                {image && isUser && (
                    <div className="mb-2">
                        <img
                            src={image}
                            alt="Uploaded"
                            className="max-w-full h-auto rounded-lg max-h-48 object-cover"
                        />
                    </div>
                )}

                {/* Display text content */}
                <div className="whitespace-pre-wrap">
                    {content}
                </div>

                {/* Role indicator */}
                <div className={`text-xs mt-1 ${isUser ? "text-blue-200" : "text-gray-500"}`}>
                    {isUser ? "You" : "Ai"}
                </div>
            </div>
        </div>
    );
}
