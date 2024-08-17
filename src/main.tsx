import ScrollProgressBar from '@/components/common/scroll/scroll-progress-bar.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import App from './App.tsx'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      retry: false
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster richColors position='top-right' />
      <QueryClientProvider client={queryClient}>
        <ScrollProgressBar />
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
