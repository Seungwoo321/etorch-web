import { Outlet } from 'react-router-dom'
import { ModeToggle } from "@/components/ModeToggle"
const RootLayout = () => {
  return (
    <div>
      <div>
        Tobpbar
        <ModeToggle />
      </div>

      <section>
        <Outlet />
      </section>
    </div>

  )
}

export default RootLayout
