import './globals.css';
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Button>Click me</Button>
    </ThemeProvider>
  );
}

export default App
