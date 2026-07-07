'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, Eye, EyeOff, Lock, Mail, Phone, User } from 'lucide-react'

const CARGOS = [
  'Corretor de Imóveis',
  'Coordenador de Vendas',
  'Gerente Comercial',
  'Diretor Comercial',
  'Assistente Administrativo',
  'Outro',
] as const

export default function CadastroPage() {
  const [nome, setNome] = useState('')
  const [cargo, setCargo] = useState<(typeof CARGOS)[number]>('Corretor de Imóveis')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [carregando, setCarregando] = useState(false)

  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault()
    setCarregando(true)
    await new Promise((r) => setTimeout(r, 1500))
    setCarregando(false)
    window.location.href = '/'
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-3 bg-primary px-5 pb-6 pt-[calc(1rem+env(safe-area-inset-top))]">
        <Link
          href="/login"
          className="flex size-10 items-center justify-center rounded-full bg-teal-shadow/40 text-primary-foreground"
        >
          <ArrowLeft className="size-5" strokeWidth={1.5} />
        </Link>
        <div>
          <h1 className="font-serif text-xl font-semibold text-primary-foreground">Criar conta</h1>
          <p className="text-sm text-teal-light">Evolves CRM</p>
        </div>
      </div>

      {/* Formulário */}
      <form onSubmit={handleCadastro} className="flex flex-col gap-5 px-8 py-8">
        {/* Nome */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Nome completo *
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome completo"
              required
              autoComplete="name"
              className="h-12 w-full rounded-2xl border border-border bg-card pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Cargo */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Cargo *
          </label>
          <select
            value={cargo}
            onChange={(e) => setCargo(e.target.value as (typeof CARGOS)[number])}
            required
            className="h-12 w-full rounded-2xl border border-border bg-card px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring appearance-none"
          >
            {CARGOS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Telefone */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Telefone *
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
            <input
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="(11) 99999-9999"
              required
              autoComplete="tel"
              className="h-12 w-full rounded-2xl border border-border bg-card pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* E-mail */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            E-mail *
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

        {/* Senha */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Senha *
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
            <input
              type={mostrarSenha ? 'text' : 'password'}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Mínimo 8 caracteres"
              required
              minLength={8}
              autoComplete="new-password"
              className="h-12 w-full rounded-2xl border border-border bg-card pl-11 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="button"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {mostrarSenha
                ? <EyeOff className="size-4.5" strokeWidth={1.5} />
                : <Eye className="size-4.5" strokeWidth={1.5} />}
            </button>
          </div>
          {/* Indicador de força da senha */}
          {senha && (
            <div className="mt-2 flex gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    senha.length >= i * 2
                      ? senha.length >= 8
                        ? 'bg-teal-mid'
                        : 'bg-amber'
                      : 'bg-fog'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Termos */}
        <p className="text-xs text-muted-foreground text-center">
          Ao criar uma conta você concorda com os{' '}
          <span className="font-semibold text-primary">Termos de Uso</span>{' '}
          e a{' '}
          <span className="font-semibold text-primary">Política de Privacidade</span>.
        </p>

        <button
          type="submit"
          disabled={carregando}
          className="h-12 w-full rounded-2xl bg-primary text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-brand active:scale-[0.98] disabled:opacity-70"
        >
          {carregando ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Criando conta...
            </span>
          ) : 'Criar conta'}
        </button>

        <div className="text-center pb-4">
          <p className="text-sm text-muted-foreground">
            Já tem conta?{' '}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}
