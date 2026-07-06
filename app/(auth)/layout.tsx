import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Microsistec — Acesso',
  description: 'Faça login ou crie sua conta no CRM Imobiliário Microsistec.',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh justify-center bg-fog sm:items-center sm:py-8">
      <div className="relative flex h-dvh w-full max-w-md flex-col overflow-hidden bg-background sm:h-auto sm:min-h-[600px] sm:rounded-[2.5rem] sm:border-8 sm:border-teal-shadow sm:shadow-2xl">
        {children}
      </div>
    </div>
  )
}
