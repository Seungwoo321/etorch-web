import { ModeToggle } from '@/components/shared/ModeToggle'
import { MainNav } from './MainNav'
import { UserNav } from './UserNav'
// import DashboardSwitcher from "@/components/shared/DashboardSwitcher"
const Topbar = (): JSX.Element => {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        {/* <MobileNav /> */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* <DashboardSwitcher /> */}
          </div>
          {/* <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu />
          </div> */}
          <nav className="flex items-center space-x-2">
            <ModeToggle />
            <UserNav />
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Topbar
