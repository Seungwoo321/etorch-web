import { Routes, Route } from "react-router-dom";
import "@/styles/globals.css";
import RootLayout from "./_root/RootLayout";
import Dashboard from "./_root/pages/Dashboard";
import CreateChart from "./_root/pages/CreateChart";

function App() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Routes>
        {/* auth routes */}

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Dashboard/>}/>
          <Route path="/create-chart" element={<CreateChart/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App
