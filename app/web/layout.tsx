import { ReactNode } from 'react'

export const metadata = {
  title: 'evolves - Sistema Web',
}

export default function WebLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-snow flex font-sans">
      {children}
    </div>
  )
}
