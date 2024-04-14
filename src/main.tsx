import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from "@/components/shared/ThemeProvider.tsx"
import QueryProvider from './lib/react-query/QueryProvider.tsx'

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  const { worker } = await import('./mocks/browser.ts')

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start()
}

const rootElement = document.getElementById('root')

enableMocking().then(() => {
  ReactDOM.createRoot(rootElement!).render(
    <BrowserRouter>
      <QueryProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </ThemeProvider>
      </QueryProvider>
    </BrowserRouter>
  )
})

