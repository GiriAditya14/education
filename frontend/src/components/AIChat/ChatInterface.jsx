import { useState, useRef, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { getAIResponse } from "../../services/ai";

const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatBoxRef = useRef(null);
  useEffect(() => {
    const handleReset = () => {
      localStorage.removeItem("aiChats");
      setMessages([]);
    };

    // Listen for a custom event to reset chat
    window.addEventListener("resetChat", handleReset);

    return () => {
      window.removeEventListener("resetChat", handleReset);
    };
  }, []);
  useEffect(() => {
    // Load chat history from localStorage
    const savedChats = localStorage.getItem("aiChats");
    if (savedChats) {
      setMessages(JSON.parse(savedChats));
    }
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    // Add user message
    const userMessage = { sender: "user", text: message };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setMessage("");
    setIsLoading(true);

    try {
      // Get AI response
      const aiResponse = await getAIResponse(message);

      // Add AI message
      const aiMessage = { sender: "ai", text: aiResponse };
      const finalMessages = [...updatedMessages, aiMessage];
      setMessages(finalMessages);

      // Save to localStorage
      localStorage.setItem("aiChats", JSON.stringify(finalMessages));
    } catch (error) {
      setMessages([
        ...updatedMessages,
        {
          sender: "ai",
          text: "Sorry, I'm having trouble responding. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-150 max-h-screen bg-gray-800 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gray-700 border-b border-gray-600">
        <h2 className="text-xl font-semibold text-white">
          AI Learning Assistant
        </h2>
      </div>

      {/* Chat messages */}
      <div
        ref={chatBoxRef}
        className="flex-1 overflow-y-auto flex flex-col-reverse p-4 space-y-reverse space-y-4"
      >
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-10">
            Ask me anything about your courses or learning materials
          </div>
        )}

        {[...messages].reverse().map((msg, index) => (
          <div
            key={index}
            className={`max-w-3xl mx-4 ${
              msg.sender === "user"
                ? "ml-auto bg-blue-600 text-white"
                : "mr-auto bg-gray-700"
            } p-3 rounded-lg`}
          >
            {msg.text.includes("\n") ? (
              <pre className="whitespace-pre-wrap bg-gray-800/50 p-2 rounded">
                {msg.text}
              </pre>
            ) : (
              msg.text
            )}
          </div>
        ))}

        {isLoading && (
          <div className="mr-auto bg-gray-700 p-3 rounded-lg max-w-3xl mx-4">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Input form */}
      <div className="border-t border-gray-600 bg-gray-800 p-4">
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-2 bg-gray-700 rounded-l-lg focus:outline-none text-white"
            placeholder="Type your question..."
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-4 rounded-r-lg disabled:opacity-50 text-white"
            disabled={isLoading || !message.trim()}
          >
            <FaPaperPlane />
          </button>
        </form>

        <div className="mt-2 text-right">
          <button
            onClick={() => {
              localStorage.removeItem("aiChats");
              setMessages([]);
            }}
            className="text-sm text-red-400 underline hover:text-red-600"
          >
            Clear Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
