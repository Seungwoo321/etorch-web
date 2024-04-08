import { Outlet } from "react-router-dom"
import Topbar from "@/_root/layout/LayoutHeader"

const RootLayout = () => {
  return (
    <>
      <Topbar />
      <div className="container relative">
        <div className="flex-col md:flex">
          <section>
            <Outlet />
          </section>
      </div>
    </div>
  </>

  )
}

export default RootLayout
