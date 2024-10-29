import { ThemeProvider } from '@/components/common/theme/theme-provider'
import { SidebarProvider } from '@/context/SidebarContext'
import useRoutesElements from '@/hooks/useRouterElement'
import ScrollToTop from './components/common/scroll/scroll-to-top'

function App() {
  const routerDom = useRoutesElements()
  return (
    <>
      <ScrollToTop />
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <SidebarProvider>{routerDom}</SidebarProvider>
      </ThemeProvider>
    </>
  )
}

export default App
