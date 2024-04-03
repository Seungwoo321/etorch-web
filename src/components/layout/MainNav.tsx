import { Link } from "react-router-dom"

import { cn } from "@/lib/utils"
import { Icons } from "./icons"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className="mr-4 hidden md:flex">
      <Link to="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          E-Torch
        </span>
      </Link>
      <nav
        className={cn("flex items-center space-x-4 lg:space-x-6", className)}
        {...props}
      >
        <Link
          to="/"
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          Overview
        </Link>
        <Link
          to="/"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Products
        </Link>
        <Link
          to="/"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Settings
        </Link>
      </nav>
    </div>
  )
}