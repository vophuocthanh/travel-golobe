import { useState } from 'react'

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
}

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState<string>('')

  const toggleChatbox = () => setIsOpen(!isOpen)

  const handleSend = () => {
    if (!input.trim()) return

    setMessages((prev) => [...prev, { id: Date.now(), text: input, sender: 'user' }])
    setInput('')

    setTimeout(() => {
      setMessages((prev) => [...prev, { id: Date.now() + 1, text: 'Hello, how can I help you?', sender: 'bot' }])
    }, 1000)
  }

  return (
    <div className='fixed flex flex-col items-end bottom-48 right-8'>
      <button
        onClick={toggleChatbox}
        className='p-3 text-white bg-blue-500 rounded-full shadow-lg size-14 focus:outline-none'
      >
        💬
      </button>

      {isOpen && (
        <div className='flex flex-col mt-2 overflow-hidden bg-white border rounded-md shadow-lg w-72 h-96'>
          <div className='p-4 font-semibold text-center text-white bg-blue-500'>Chat with us</div>

          <div className='flex-1 p-4 space-y-4 overflow-y-auto'>
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`p-3 rounded-lg max-w-xs ${
                    message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className='p-4 border-t'>
            <div className='flex items-center space-x-2'>
              <input
                type='text'
                className='flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Type a message...'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button className='px-3 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600' onClick={handleSend}>
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Chatbox
