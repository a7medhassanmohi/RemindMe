import { UserButton } from '@clerk/nextjs'
import React from 'react'
import Logo from './Logo'
import ThemeSwitcher from './ThemeSwitcher'

export const NavBar = () => {
  return (
    <nav className="flex w-full items-center justify-between p-4 px-8 h-[60px]">
        <Logo/>
        <div className="flex gap-4 items-center">
        <UserButton afterSignOutUrl="/sign-in"/>
        <ThemeSwitcher/>
        </div>
    </nav>
  )
}
