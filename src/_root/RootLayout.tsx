import { Outlet } from 'react-router-dom'
import Topbar from '@/_root/layout/LayoutHeader'

const RootLayout = (): JSX.Element => {
  return (
    <>
      <Topbar />
      <div className="container relative max-w-screen-2xl pt-14 h-full">
        <div className="flex-col md:flex h-full">
            <Outlet />
      </div>
      {/* <footer className="h-[120px] border-[1px]">
        Footer
      </footer> */}
    </div>
  </>

  )
}

export default RootLayout
