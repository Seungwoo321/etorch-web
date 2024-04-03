import { Routes, Route } from "react-router-dom";
import "@/styles/globals.css";
// import { ThemeProvider } from "@/components/theme-provider"
// import { ModeToggle } from "@/components/ModeToggle"
import RootLayout from "./_root/RootLayout";
import Dashboard from "./_root/pages/Dashboard";

function App() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Routes>
        {/* auth routes */}

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Dashboard/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App
