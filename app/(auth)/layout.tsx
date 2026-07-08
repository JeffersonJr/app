import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'evolves — Acesso',
  description: 'Faça login ou crie sua conta no CRM Imobiliário evolves.',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh bg-background">
      <div className="relative flex h-dvh w-full flex-col overflow-hidden bg-background">
        {children}
      </div>
    </div>
  )
}
