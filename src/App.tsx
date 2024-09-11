import { ThemeProvider } from '@/components/common/theme/theme-provider'
import useRoutesElements from '@/hooks/useRouterElement'

function App() {
  const routerDom = useRoutesElements()
  return (
    <>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        {routerDom}
      </ThemeProvider>
    </>
  )
}

export default App
