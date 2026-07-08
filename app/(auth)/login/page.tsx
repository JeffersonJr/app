'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Eye, EyeOff, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react'

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
    <div className="flex flex-1 flex-col relative overflow-hidden bg-background">
      {/* Background Decorativo */}
      <div className="absolute top-0 inset-x-0 h-[45%] bg-[#1A3B39] rounded-b-[3rem] overflow-hidden">
        {/* Abstract shapes / gradients */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-mid/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/4 -left-12 w-48 h-48 bg-teal-light/10 rounded-full blur-3xl" />
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
      </div>

      <div className="relative flex flex-col items-center pt-16 pb-8 px-6">
        <div className="flex items-center justify-center p-3 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl mb-6">
          <img src="/logo-evolves.svg" alt="evolves" className="size-12 object-contain" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-white text-center">
          evolves CRM
        </h1>
        <p className="mt-2 text-sm font-medium text-teal-light/80 text-center flex items-center gap-1.5">
          <Sparkles className="size-3.5" />
          O futuro do mercado imobiliário
        </p>
      </div>

      {/* Form Container */}
      <div className="relative flex-1 flex flex-col px-6">
        <div className="bg-card rounded-[2rem] p-6 shadow-2xl border border-border/50 animate-in slide-in-from-bottom-10 fade-in duration-500">
          <div className="mb-6">
            <h2 className="font-serif text-2xl font-semibold text-foreground">Bem-vindo</h2>
            <p className="text-sm text-muted-foreground mt-1">Acesse sua conta para continuar</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                E-mail
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" strokeWidth={1.5} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  autoComplete="email"
                  className="h-14 w-full rounded-2xl border border-border bg-muted/30 pl-11 pr-4 text-sm font-medium text-foreground placeholder:text-muted-foreground/60 transition-all focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Senha</label>
                <Link
                  href="/recuperar-senha"
                  className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Esqueci a senha
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" strokeWidth={1.5} />
                <input
                  type={mostrarSenha ? 'text' : 'password'}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="h-14 w-full rounded-2xl border border-border bg-muted/30 pl-11 pr-12 text-sm font-medium text-foreground placeholder:text-muted-foreground/60 transition-all focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex size-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted transition-colors focus-within:text-primary"
                  aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {mostrarSenha ? <EyeOff className="size-4.5" strokeWidth={1.5} /> : <Eye className="size-4.5" strokeWidth={1.5} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={carregando}
              className="group relative mt-4 flex h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-primary text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70 hover:bg-primary/95 hover:shadow-primary/40"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
              
              {carregando ? (
                <span className="flex items-center justify-center gap-2 relative z-10">
                  <svg className="size-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Entrando...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2 relative z-10">
                  Acessar plataforma
                  <ArrowRight className="size-4.5 transition-transform group-hover:translate-x-1" strokeWidth={2} />
                </span>
              )}
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-1 text-sm">
            <span className="text-muted-foreground font-medium">Ainda não tem conta?</span>
            <Link href="/cadastro" className="font-semibold text-primary hover:underline underline-offset-4 transition-all">
              Criar agora
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
