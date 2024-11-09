import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GoogleGenerativeAI } from '@google/generative-ai'
import MDEditor from '@uiw/react-md-editor'
import dayjs from 'dayjs'
import { ArrowDown } from 'lucide-react'
import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'

const API_KEY: string = import.meta.env.VITE_GEMINI_API_KEY as string
const genAI: GoogleGenerativeAI = new GoogleGenerativeAI(API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  isCode?: boolean
}

const Chatbox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [loopNum, setLoopNum] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [text, setText] = useState('')
  const [delta, setDelta] = useState(300 - Math.random() * 100)
  const [, setIndex] = useState(1)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const toRotate = ['đang viết']
  const period = 100 // thời gian lui chữ

  // typing effect

  useEffect(() => {
    const ticker = setInterval(() => {
      tick()
    }, delta)

    return () => {
      clearInterval(ticker)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  const tick = () => {
    const i = loopNum % toRotate.length
    const fullText = toRotate[i]
    const updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1)

    setText(updatedText)

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2)
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true)
      setIndex((prevIndex) => prevIndex - 1)
      setDelta(period)
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false)
      setLoopNum(loopNum + 1)
      setIndex(1)
      setDelta(100) // thời gian hiển thị chữ
    } else {
      setIndex((prevIndex) => prevIndex + 1)
    }
  }

  // scroll bottom when new message is added

  useEffect(() => {
    const handleScroll = () => {
      if (!chatContainerRef.current) return

      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current
      setShowScrollButton(scrollTop + clientHeight < scrollHeight - 50)
    }

    const container = chatContainerRef.current
    container?.addEventListener('scroll', handleScroll)

    return () => {
      container?.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
    setShowScrollButton(false)
  }

  const toggleChatbox = () => setIsOpen(!isOpen)

  const handleSend = async () => {
    if (!input.trim()) return

    const newMessage: Message = { id: Date.now(), text: input, sender: 'user', timestamp: new Date() }
    setMessages((prev) => [...prev, newMessage])
    setInput('')
    setLoading(true)
    setIsTyping(true)

    try {
      const result = await model.generateContent(input)
      let responseText = await result.response.text()

      responseText = responseText.replace(/\**\*/g, '')

      const formattedText = responseText
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .join('\n')

      setMessages((prev) => [...prev, { id: Date.now(), text: formattedText, sender: 'bot', timestamp: new Date() }])
    } catch (error) {
      console.error('generateContent error:', error)
    } finally {
      setLoading(false)
      setIsTyping(false)
      scrollToBottom()
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend()
  }

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className='fixed flex flex-col items-end bottom-24 right-7'>
      <Button
        onClick={toggleChatbox}
        className='p-3 text-white bg-blue-500 rounded-full shadow-lg size-14 hover:ring-primary hover:ring-2'
      >
        💬
      </Button>

      {isOpen && (
        <div className='flex flex-col mt-2 overflow-hidden bg-white border rounded-md shadow-lg w-[27rem] z-999 h-[36rem]'>
          <div className='p-4 font-semibold text-center text-white bg-primary'>
            <img
              src='https://images2.thanhnien.vn/528068263637045248/2024/7/15/google-gemini-ai-logo-on-color-swirl-background-1721059067170-1721059069909486798923.jpg'
              alt='gemini'
              width={20}
              className='inline-block object-cover w-20 h-full mr-2 rounded-md'
            />
            Chat with us
          </div>

          <div className='flex-1 p-4 space-y-4 overflow-y-auto' ref={chatContainerRef}>
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`p-3 rounded-lg max-w-sm ${
                    message.sender === 'user' ? 'bg-primary text-white' : 'bg-gray-300 text-black p-3'
                  }`}
                >
                  {message.isCode ? (
                    <MDEditor.Markdown source={message.text} style={{ whiteSpace: 'pre-wrap' }} />
                  ) : (
                    <p>
                      {message.text.split('\n').map((line, index) => (
                        <span key={index} className='block'>
                          {line}
                        </span>
                      ))}
                    </p>
                  )}
                  <span className='text-xs text-gray-500'>
                    {dayjs(message.timestamp).format('DD.MM.YYYY HH:mm:ss')}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className='flex justify-start'>
                <div className='max-w-xs p-3 text-black bg-gray-300 rounded-lg'>
                  <h1 className='min-w-24'>
                    {`AI`}{' '}
                    <span className='txt-rotate' data-period='1000'>
                      <span className='text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-pink-600'>
                        {text}
                      </span>
                    </span>
                  </h1>
                </div>
              </div>
            )}
          </div>

          {showScrollButton && (
            <button
              className='absolute flex items-center justify-center w-10 p-2 text-white transform -translate-x-1/2 rounded-full bg-primary left-1/2 bottom-20 hover:bg-primary hover:ring-2 hover:ring-primary animate-bounce'
              onClick={scrollToBottom}
            >
              <ArrowDown size={20} />
            </button>
          )}

          <div className='p-4 border-t'>
            <div className='flex items-center space-x-2'>
              <Input
                type='text'
                className='w-[20.5rem] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                placeholder='Bạn cần điều gì...'
                value={input}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                disabled={loading}
              />
              <button
                className='px-3 py-2 text-white transition-all rounded-md bg-primary hover:opacity-80'
                onClick={handleSend}
                disabled={loading}
              >
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
