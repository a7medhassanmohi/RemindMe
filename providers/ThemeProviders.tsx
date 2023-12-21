"use client"

import {ThemeProvider as NextThemesProvider} from "next-themes"
import React, { ReactNode } from 'react'

export const ThemeProviders = ({children}:{children:ReactNode}) => {
  return (
    <NextThemesProvider attribute="class" enableSystem>{children}</NextThemesProvider>
  )
}
