import { useState, useRef, useEffect } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { getAIResponse } from '../../services/ai';

const ChatInterface = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    // Load chat history from localStorage
    const savedChats = localStorage.getItem('aiChats');
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
    const userMessage = { sender: 'user', text: message };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setMessage('');
    setIsLoading(true);

    try {
      // Get AI response
      const aiResponse = await getAIResponse(message);
      
      // Add AI message
      const aiMessage = { sender: 'ai', text: aiResponse };
      const finalMessages = [...updatedMessages, aiMessage];
      setMessages(finalMessages);
      
      // Save to localStorage
      localStorage.setItem('aiChats', JSON.stringify(finalMessages));
    } catch (error) {
      setMessages([...updatedMessages, { 
        sender: 'ai', 
        text: "Sorry, I'm having trouble responding. Please try again later."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-800 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gray-700 border-b border-gray-600">
        <h2 className="text-xl font-semibold">AI Learning Assistant</h2>
      </div>
      
      {/* Chat messages */}
      <div 
        ref={chatBoxRef}
        className="flex-1 p-4 overflow-y-auto space-y-4"
      >
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-10">
            Ask me anything about your courses or learning materials
          </div>
        )}
        
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`max-w-3xl mx-4 ${msg.sender === 'user' 
              ? 'ml-auto bg-blue-600 text-white' 
              : 'mr-auto bg-gray-700'} p-3 rounded-lg`}
          >
            {msg.text.includes('\n') ? (
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
      
      {/* Input form */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-600">
        <div className="flex">
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
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;


// import { useState, useRef, useEffect } from 'react';
// import { FaPaperPlane } from 'react-icons/fa';

// const ChatInterface = () => {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const chatBoxRef = useRef(null);

//   useEffect(() => {
//     // Load chat history from localStorage if needed
//     const savedChats = localStorage.getItem('aiChats');
//     if (savedChats) {
//       setMessages(JSON.parse(savedChats));
//     }
//   }, []);

//   useEffect(() => {
//     // Scroll to bottom of chat
//     if (chatBoxRef.current) {
//       chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!message.trim() || isLoading) return;

//     const userMessage = { sender: 'user', text: message };
//     const updatedMessages = [...messages, userMessage];
//     setMessages(updatedMessages);
//     setMessage('');
//     setIsLoading(true);

//     try {
//       const response = await fetch('/api/ai', {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify({ prompt: message })
//       });
      
//       const data = await response.json();
//       setMessages([...updatedMessages, { sender: 'ai', text: data.response }]);
//       localStorage.setItem('aiChats', JSON.stringify([...updatedMessages, { sender: 'ai', text: data.response }]));
//     } catch (error) {
//       setMessages([...updatedMessages, { sender: 'ai', text: "Sorry, I couldn't process your request." }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-full bg-gray-800 rounded-lg overflow-hidden">
//       <div className="p-4 bg-gray-700 border-b border-gray-600">
//         <h2 className="text-xl font-semibold">AI Learning Assistant</h2>
//       </div>
      
//       <div 
//         ref={chatBoxRef}
//         className="flex-1 p-4 overflow-y-auto space-y-4"
//       >
//         {messages.length === 0 && (
//           <div className="text-center text-gray-400 mt-10">
//             Ask me anything about your courses or learning materials
//           </div>
//         )}
        
//         {messages.map((msg, index) => (
//           <div 
//             key={index} 
//             className={`max-w-3xl mx-4 ${msg.sender === 'user' ? 'ml-auto bg-blue-600' : 'mr-auto bg-gray-700'} p-3 rounded-lg`}
//           >
//             <div className="whitespace-pre-wrap break-words">
//               {msg.text.includes('\n') ? (
//                 <pre className="bg-gray-800 p-2 rounded">{msg.text}</pre>
//               ) : (
//                 msg.text
//               )}
//             </div>
//           </div>
//         ))}
        
//         {isLoading && (
//           <div className="mr-auto bg-gray-700 p-3 rounded-lg max-w-3xl mx-4">
//             <div className="flex space-x-2">
//               <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//               <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
//               <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
//             </div>
//           </div>
//         )}
//       </div>
      
//       <form onSubmit={handleSubmit} className="p-4 border-t border-gray-600">
//         <div className="flex">
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             className="flex-1 p-2 bg-gray-700 rounded-l-lg focus:outline-none"
//             placeholder="Type your question..."
//             disabled={isLoading}
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 hover:bg-blue-700 px-4 rounded-r-lg disabled:opacity-50"
//             disabled={isLoading || !message.trim()}
//           >
//             <FaPaperPlane />
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ChatInterface;