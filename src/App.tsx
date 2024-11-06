import ScrollToTopHome from '@/components/common/scroll/scroll-to-top-home'
import { ThemeProvider } from '@/components/common/theme/theme-provider'
import useRoutesElements from '@/hooks/useRouterElement'
import ScrollToTop from './components/common/scroll/scroll-to-top'

function App() {
  const routerDom = useRoutesElements()
  return (
    <>
      <ScrollToTop />
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <ScrollToTopHome />
        {routerDom}
      </ThemeProvider>
    </>
  )
}

export default App
