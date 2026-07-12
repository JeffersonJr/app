'use client'

import { useState } from 'react'
import { Eye, EyeOff, Lock, Mail, ArrowRight, Sparkles, User, Phone, CheckCircle2, X } from 'lucide-react'
import { maskPhone } from '@/lib/masks'
import { atendimentos } from '@/lib/app-data'

const CARGOS = [
  'Corretor de Imóveis',
  'Coordenador de Vendas',
  'Gerente Comercial',
  'Diretor Comercial',
  'Assistente Administrativo',
  'Outro',
] as const

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [carregando, setCarregando] = useState(false)

  // Modals state
  const [mostrarCadastro, setMostrarCadastro] = useState(false)
  const [mostrarRecuperar, setMostrarRecuperar] = useState(false)

  // Cadastro state
  const [cadNome, setCadNome] = useState('')
  const [cadCargo, setCadCargo] = useState<(typeof CARGOS)[number]>('Corretor de Imóveis')
  const [cadTelefone, setCadTelefone] = useState('')
  const [cadEmail, setCadEmail] = useState('')
  const [cadCreci, setCadCreci] = useState('')
  const [cadSenha, setCadSenha] = useState('')
  const [cadMostrarSenha, setCadMostrarSenha] = useState(false)

  // Recuperar state
  const [recEmail, setRecEmail] = useState('')
  const [recEnviado, setRecEnviado] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setCarregando(true)
    await new Promise((r) => setTimeout(r, 1200))
    setCarregando(false)
    window.location.href = '/crm'
  }

  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault()
    setCarregando(true)
    
    // Inject lead into CRM
    const novoLead = {
      id: `l-lead-${Date.now()}`,
      nome: cadNome,
      telefone: cadTelefone,
      email: cadEmail,
      interesse: `Interesse no evolves CRM (CRECI: ${cadCreci})`,
      valor: 'R$ 0',
      status: 'aberto' as const,
      temperatura: 'quente' as const,
      etapa: 'qualificando' as const,
      funilId: 'geral',
      origem: 'WhatsApp' as const,
      iniciais: cadNome.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
      ultimaInteracao: 'Hoje',
      dataEntrada: 'Hoje',
      modo: 'venda' as const,
      preAtendimento: true,
      atividades: [],
      timeline: []
    }
    atendimentos.push(novoLead)

    await new Promise((r) => setTimeout(r, 1500))
    setCarregando(false)
    setMostrarCadastro(false)
    
    // Redirect to WhatsApp of Albert Comercial
    const message = encodeURIComponent(`Olá Albert! Sou o corretor ${cadNome} (CRECI: ${cadCreci}) e gostaria de contratar o evolves CRM. Meu e-mail é ${cadEmail}.`)
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank')
  }

  async function handleRecuperar(e: React.FormEvent) {
    e.preventDefault()
    setCarregando(true)
    await new Promise((r) => setTimeout(r, 1500))
    setCarregando(false)
    setRecEnviado(true)
  }

  return (
    <div className="flex flex-1 flex-col relative overflow-hidden bg-background">
      <div className="relative flex flex-col items-center pt-16 pb-8 px-6 w-full max-w-md mx-auto">
        <img src="/logo-evolves.svg" alt="evolves" className="size-20 object-contain mb-4" />
        <h1 className="font-serif text-3xl font-bold text-foreground text-center">
          evolves
        </h1>
        <p className="mt-2 text-sm font-medium text-muted-foreground text-center flex items-center gap-1.5">
          <Sparkles className="size-3.5" />
          O futuro do mercado imobiliário
        </p>
      </div>

      {/* Form Container Principal (Login) */}
      <div className="relative flex-1 flex flex-col px-6 w-full max-w-md mx-auto">
        <div className="bg-card rounded-[2rem] p-6 shadow-2xl border border-border/50 animate-in slide-in-from-bottom-10 fade-in duration-500 mb-6">
          <div className="mb-6">
            <h2 className="font-serif text-2xl font-semibold text-foreground">Bem-vindo</h2>
            <p className="text-sm text-muted-foreground mt-1">Acesse sua conta para continuar</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">E-mail</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" strokeWidth={1.5} />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" required autoComplete="email" className="h-14 w-full rounded-2xl border border-border bg-muted/30 pl-11 pr-4 text-sm font-medium text-foreground placeholder:text-muted-foreground/60 transition-all focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Senha</label>
                <button
                  type="button"
                  onClick={() => setMostrarRecuperar(true)}
                  className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Esqueci a senha
                </button>
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex size-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted transition-colors focus-within:text-primary cursor-pointer"
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

          <div className="mt-8 flex items-center justify-center text-sm">
            <button 
              type="button" 
              onClick={() => setMostrarCadastro(true)} 
              className="font-bold text-primary hover:underline underline-offset-4 transition-all cursor-pointer flex items-center gap-1.5"
            >
              Não tem conta? Fale com o Albert
            </button>
          </div>
        </div>
      </div>

      {/* MODAL CRIAR CONTA */}
      {mostrarCadastro && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm cursor-pointer" onClick={() => setMostrarCadastro(false)} />
          <div className="relative w-full max-w-md max-h-[90dvh] overflow-y-auto bg-card rounded-[2rem] p-6 shadow-2xl border border-border/50 animate-in zoom-in-95 fade-in duration-200">
            <button 
              type="button" 
              onClick={() => setMostrarCadastro(false)}
              className="absolute right-4 top-4 p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors cursor-pointer"
            >
              <X className="size-5" />
            </button>
            <div className="mb-6 pr-8">
              <h2 className="font-serif text-2xl font-semibold text-foreground">Falar com o Albert</h2>
              <p className="text-sm text-muted-foreground mt-1">Evolves CRM Comercial</p>
            </div>

            <form onSubmit={handleCadastro} className="flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Nome completo *</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" strokeWidth={1.5} />
                  <input type="text" value={cadNome} onChange={(e) => setCadNome(e.target.value)} placeholder="Seu nome" required className="h-14 w-full rounded-2xl border border-border bg-muted/30 pl-11 pr-4 text-sm font-medium text-foreground transition-all focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">WhatsApp *</label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" strokeWidth={1.5} />
                  <input type="tel" value={cadTelefone} onChange={(e) => setCadTelefone(maskPhone(e.target.value))} placeholder="(11) 99999-9999" required className="h-14 w-full rounded-2xl border border-border bg-muted/30 pl-11 pr-4 text-sm font-medium text-foreground transition-all focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">E-mail *</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" strokeWidth={1.5} />
                  <input type="email" value={cadEmail} onChange={(e) => setCadEmail(e.target.value)} placeholder="seu@email.com" required className="h-14 w-full rounded-2xl border border-border bg-muted/30 pl-11 pr-4 text-sm font-medium text-foreground transition-all focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Número do CRECI *</label>
                <div className="relative group">
                  <Sparkles className="absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" strokeWidth={1.5} />
                  <input type="text" value={cadCreci} onChange={(e) => setCadCreci(e.target.value)} placeholder="CRECI 12345-F" required className="h-14 w-full rounded-2xl border border-border bg-muted/30 pl-11 pr-4 text-sm font-medium text-foreground transition-all focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              </div>

              <button type="submit" disabled={carregando} className="group relative mt-2 flex h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-primary text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70 hover:bg-primary/95 hover:shadow-primary/40">
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                {carregando ? (
                  <span className="flex items-center gap-2 relative z-10">
                    <svg className="size-5 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    Enviando...
                  </span>
                ) : <span className="relative z-10">Falar com o Comercial</span>}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL RECUPERAR SENHA */}
      {mostrarRecuperar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm cursor-pointer" onClick={() => { setMostrarRecuperar(false); setRecEnviado(false); setRecEmail(''); }} />
          <div className="relative w-full max-w-md bg-card rounded-[2rem] p-6 shadow-2xl border border-border/50 animate-in zoom-in-95 fade-in duration-200">
            <button 
              type="button" 
              onClick={() => { setMostrarRecuperar(false); setRecEnviado(false); setRecEmail(''); }}
              className="absolute right-4 top-4 p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors cursor-pointer"
            >
              <X className="size-5" />
            </button>
            
            {!recEnviado ? (
              <>
                <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Mail className="size-7 text-primary" strokeWidth={1.5} />
                </div>
                <h2 className="font-serif text-2xl font-semibold text-foreground">Esqueceu a senha?</h2>
                <p className="mt-2 text-sm text-muted-foreground mb-6">
                  Digite o e-mail da sua conta e enviaremos um link para você criar uma nova senha.
                </p>

                <form onSubmit={handleRecuperar} className="flex flex-col gap-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">E-mail da conta</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" strokeWidth={1.5} />
                      <input type="email" value={recEmail} onChange={(e) => setRecEmail(e.target.value)} placeholder="seu@email.com" required className="h-14 w-full rounded-2xl border border-border bg-muted/30 pl-11 pr-4 text-sm font-medium text-foreground transition-all focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
                    </div>
                  </div>

                  <button type="submit" disabled={carregando} className="group relative mt-2 flex h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-primary text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70 hover:bg-primary/95 hover:shadow-primary/40">
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                    {carregando ? (
                      <span className="flex items-center gap-2 relative z-10">
                        <svg className="size-5 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                        Enviando...
                      </span>
                    ) : <span className="relative z-10">Enviar link de recuperação</span>}
                  </button>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center text-center py-4">
                <div className="flex size-20 items-center justify-center rounded-full bg-teal-mid/20">
                  <CheckCircle2 className="size-10 text-teal-mid" strokeWidth={1.5} />
                </div>
                <h2 className="mt-5 font-serif text-2xl font-semibold text-foreground">Link enviado!</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Verifique a caixa de entrada de <strong className="text-foreground">{recEmail}</strong>.
                  <br /><br />
                  O link expira em 30 minutos.
                </p>
                <button type="button" onClick={() => { setMostrarRecuperar(false); setRecEnviado(false); setRecEmail(''); }} className="mt-6 font-semibold text-primary hover:underline underline-offset-4 cursor-pointer">
                  Voltar para o login
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
