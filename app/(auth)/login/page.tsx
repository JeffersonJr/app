'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [carregando, setCarregando] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setCarregando(true)
    // Simulação de login
    await new Promise((r) => setTimeout(r, 1200))
    setCarregando(false)
    // Em produção: redirecionar para /
    window.location.href = '/'
  }

  return (
    <div className="flex flex-1 flex-col">
      {/* Banner hero */}
      <div className="flex flex-col items-center justify-center bg-primary px-8 pb-10 pt-16">
      {/* Logo */}
        <img src="/logo-evolves.svg" alt="Evolves" className="size-20 object-contain drop-shadow-md" />
        <h1 className="mt-4 font-serif text-2xl font-semibold text-primary-foreground">Evolves CRM</h1>
        <p className="mt-1 text-sm text-teal-light">O CRM imobiliário no seu bolso</p>
      </div>

      {/* Formulário */}
      <div className="flex flex-1 flex-col justify-center px-8 py-8">
        <h2 className="font-serif text-2xl font-semibold text-foreground">Bem-vindo de volta</h2>
        <p className="mt-1 text-sm text-muted-foreground">Entre com sua conta para continuar</p>

        <form onSubmit={handleLogin} className="mt-8 flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              E-mail
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                autoComplete="email"
                className="h-12 w-full rounded-2xl border border-border bg-card pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Senha</label>
              <Link
                href="/recuperar-senha"
                className="text-xs font-semibold text-primary hover:underline"
              >
                Esqueci a senha
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
              <input
                type={mostrarSenha ? 'text' : 'password'}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="h-12 w-full rounded-2xl border border-border bg-card pl-11 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {mostrarSenha ? <EyeOff className="size-4.5" strokeWidth={1.5} /> : <Eye className="size-4.5" strokeWidth={1.5} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={carregando}
            className="mt-2 h-12 w-full rounded-2xl bg-primary text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-brand active:scale-[0.98] disabled:opacity-70"
          >
            {carregando ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Entrando...
              </span>
            ) : 'Entrar'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Não tem conta?{' '}
            <Link href="/cadastro" className="font-semibold text-primary hover:underline">
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
