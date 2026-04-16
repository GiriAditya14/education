import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Trash2 } from "lucide-react";
import { getAIResponse } from "../../services/ai";
import Card, { CardHeader, CardBody } from "../UI/Card";
import Button from "../UI/Button";
import EmptyState from "../UI/EmptyState";

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
    <Card className="flex flex-col h-[calc(100vh-12rem)] max-w-5xl mx-auto">
      {/* Header */}
      <CardHeader className="bg-gradient-to-r from-blue-700 to-blue-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">
                AI Learning Assistant
              </h2>
              <p className="text-blue-100 text-sm">
                Ask me anything about your courses or learning materials
              </p>
            </div>
          </div>
          
          {messages.length > 0 && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                localStorage.removeItem("aiChats");
                setMessages([]);
              }}
              className="flex items-center space-x-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Chat</span>
            </Button>
          )}
        </div>
      </CardHeader>

      {/* Chat messages */}
      <CardBody className="flex-1 overflow-y-auto p-6 bg-gray-50">
        <div
          ref={chatBoxRef}
          className="flex flex-col space-y-4 min-h-full"
        >
          {messages.length === 0 ? (
            <EmptyState
              icon={<Sparkles className="w-16 h-16 text-blue-600" />}
              title="Start a Conversation"
              message="Ask me anything about your courses, learning materials, or get help with your studies. I'm here to assist you!"
              className="flex-1 flex flex-col justify-center"
            />
          ) : (
            <>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-3xl rounded-lg p-4 shadow-sm ${
                      msg.sender === "user"
                        ? "bg-blue-700 text-white"
                        : "bg-white text-gray-900 border border-gray-200"
                    }`}
                  >
                    {msg.sender === "ai" && (
                      <div className="flex items-center space-x-2 mb-2">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-semibold text-blue-600">
                          AI Assistant
                        </span>
                      </div>
                    )}
                    
                    {msg.text.includes("\n") ? (
                      <pre className={`whitespace-pre-wrap font-sans ${
                        msg.sender === "user" 
                          ? "bg-blue-800/30 p-3 rounded" 
                          : "bg-gray-50 p-3 rounded"
                      }`}>
                        {msg.text}
                      </pre>
                    ) : (
                      <p className="leading-relaxed">{msg.text}</p>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm max-w-3xl">
                    <div className="flex items-center space-x-2 mb-2">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-semibold text-blue-600">
                        AI Assistant
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </CardBody>

      {/* Input form */}
      <div className="border-t border-gray-200 bg-white p-6">
        <form onSubmit={handleSubmit} className="flex space-x-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 transition-all"
            placeholder="Type your question..."
            disabled={isLoading}
          />
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading || !message.trim()}
            className="flex items-center space-x-2"
          >
            <Send className="w-5 h-5" />
            <span className="hidden sm:inline">Send</span>
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default ChatInterface;
