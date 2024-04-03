import { Outlet } from "react-router-dom"
import Topbar from "@/components/layout/LayoutHeader"

const RootLayout = () => {
  return (
    <>
      <Topbar />
      <div className="container relative">
        <div className="hidden flex-col md:flex">
          <section>
            <Outlet />
          </section>
      </div>
    </div>
  </>

  )
}

export default RootLayout
