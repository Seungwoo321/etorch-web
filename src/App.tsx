import { Routes, Route } from "react-router-dom";
import "@/styles/globals.css";
import RootLayout from "./_root/RootLayout";
import EditPanel from "./_root/pages/EditPanel";

function App() {
  return (
    <div className="relative flex h-screen flex-col bg-background">
      <Routes>
        {/* auth routes */}

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<EditPanel/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App
