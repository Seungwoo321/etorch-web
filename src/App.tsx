import { Routes, Route } from 'react-router-dom';
import '@/globals.css';
// import { ThemeProvider } from "@/components/theme-provider"
// import { ModeToggle } from "@/components/ModeToggle"
import RootLayout from './_root/RootLayout';
import Dashboard from './_root/pages/Dashboard';

function App() {
  return (
    <main className='flex h-screen'>
      <Routes>
        {/* auth routes */}

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Dashboard/>}/>
        </Route>
      </Routes>
    </main>
  );
}

export default App
