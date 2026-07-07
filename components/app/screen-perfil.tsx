'use client'

import { useState } from 'react'
import { Bell, ChevronRight, HelpCircle, LogOut, ShieldCheck, Target, X, Lock, KeyRound, Smartphone, RefreshCcw } from 'lucide-react'

export function ScreenPerfil({
  onNotificacoes,
  onLogout
}: {
  onNotificacoes: () => void
  onLogout: () => void
}) {
  const [showSecurity, setShowSecurity] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [temAtualizacao, setTemAtualizacao] = useState(true)
  const [mensagemAtualizacao, setMensagemAtualizacao] = useState('')

  const handleAtualizar = () => {
    setTemAtualizacao(false)
    setMensagemAtualizacao('App atualizado com a última versão')
    setTimeout(() => setMensagemAtualizacao(''), 3000)
  }
  return (
    <div className="flex h-full flex-col bg-fog pb-28">
      {/* Header Profile */}
      <div className="px-6 pt-10 pb-6 flex items-center gap-4">
        <div className="flex size-[4.5rem] shrink-0 items-center justify-center rounded-full bg-[#2B5250] text-2xl font-semibold text-white shadow-sm">
          JC
        </div>
        <div className="flex flex-col">
          <h1 className="font-serif text-[22px] leading-tight font-bold text-foreground">Jefferson</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Corretora sênior · CRECI 187433</p>
        </div>
      </div>

      <div className="px-5 flex flex-col gap-6">
        {/* Meta */}
        <div className="rounded-3xl border border-border/60 bg-card p-5 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Meta de Julho</span>
            <Target className="size-[22px] text-[#2B5250]" strokeWidth={2} />
          </div>
          <p className="font-sans text-[32px] leading-none font-bold text-foreground tracking-tight mb-4">
            R$ 6,4 <span className="text-2xl text-foreground font-semibold">/ 10 M</span>
          </p>
          <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full bg-[#2B5250]" style={{ width: '64%' }} />
          </div>
          <p className="mt-3 font-mono text-[11px] font-medium tracking-wide text-muted-foreground">
            64% · faltam 12 dias
          </p>
        </div>

        {/* Conta */}
        <div>
          <span className="mb-3 block px-1 text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
            Conta
          </span>
          <div className="flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft">
            <button
              type="button"
              onClick={onNotificacoes}
              className="flex items-center justify-between border-b border-border/60 p-4 transition-brand active:bg-muted/50"
            >
              <div className="flex items-center gap-4">
                <div className="flex size-10 items-center justify-center rounded-full bg-[#f4ece3] text-amber">
                  <Bell className="size-[22px] text-foreground" strokeWidth={1.5} />
                </div>
                <span className="font-semibold text-[15px] text-foreground">Notificações</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-sm font-medium">3 novas</span>
                <ChevronRight className="size-5" strokeWidth={1.5} />
              </div>
            </button>

            <button
              type="button"
              onClick={() => setShowSecurity(true)}
              className="flex w-full items-center justify-between border-b border-border/60 p-4 transition-brand active:bg-muted/50"
            >
              <div className="flex items-center gap-4">
                <div className="flex size-10 items-center justify-center rounded-full bg-[#f4ece3]">
                  <ShieldCheck className="size-[22px] text-foreground" strokeWidth={1.5} />
                </div>
                <span className="font-semibold text-[15px] text-foreground">Segurança & privacidade</span>
              </div>
              <ChevronRight className="size-5 text-muted-foreground" strokeWidth={1.5} />
            </button>

            <a
              href="https://suporte.microsistec.digital/pt-BR/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-between p-4 transition-brand active:bg-muted/50"
            >
              <div className="flex items-center gap-4">
                <div className="flex size-10 items-center justify-center rounded-full bg-[#f4ece3]">
                  <HelpCircle className="size-[22px] text-foreground" strokeWidth={1.5} />
                </div>
                <span className="font-semibold text-[15px] text-foreground">Suporte</span>
              </div>
              <ChevronRight className="size-5 text-muted-foreground" strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {/* Versão do App */}
        <div className="flex flex-col gap-2">
          <span className="ml-2 font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Sobre o App
          </span>
          <div className="flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Smartphone className="size-5" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-[15px] text-foreground">Microsistec CRM</span>
                  <span className="text-xs text-muted-foreground">Versão 1.0.4 (Build 402)</span>
                </div>
              </div>
              {temAtualizacao ? (
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber"></span>
                </span>
              ) : (
                <span className="text-[10px] font-bold text-teal-mid bg-teal-mid/10 px-2 py-1 rounded-full uppercase tracking-wider">
                  Atualizado
                </span>
              )}
            </div>

            {mensagemAtualizacao && (
              <div className="mt-2 text-xs font-semibold text-[#25D366] bg-[#25D366]/10 px-3 py-2 rounded-xl text-center animate-in fade-in slide-in-from-top-2">
                {mensagemAtualizacao}
              </div>
            )}

            {temAtualizacao && !mensagemAtualizacao && (
              <button
                type="button"
                onClick={handleAtualizar}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-amber/20 px-4 py-2.5 text-sm font-bold text-amber-700 transition-colors hover:bg-amber/30 active:scale-95"
              >
                <RefreshCcw className="size-4" />
                Atualização disponível! Toque para atualizar
              </button>
            )}
          </div>
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={onLogout}
          className="flex items-center justify-center gap-2 rounded-3xl border border-border/60 bg-card p-[18px] font-semibold text-destructive shadow-soft transition-brand active:bg-destructive/5"
        >
          <LogOut className="size-[22px]" strokeWidth={1.5} />
          Sair da conta
        </button>
      </div>
      {/* Security Sheet */}
      {showSecurity && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setShowSecurity(false)}
          />
          <div className="relative z-50 w-full rounded-t-[2.5rem] bg-card p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-2xl animate-in slide-in-from-bottom-full duration-300">
            <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-border" />

            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-xl font-semibold text-foreground flex items-center gap-2">
                <ShieldCheck className="size-5 text-primary" strokeWidth={2} />
                Segurança
              </h2>
              <button
                type="button"
                onClick={() => setShowSecurity(false)}
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-muted/80 active:scale-95"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {/* 2FA Toggle */}
              <label className="flex items-center justify-between rounded-2xl border border-border bg-background p-4 cursor-pointer hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber/15 text-amber-700">
                    <KeyRound className="size-5" strokeWidth={2} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">Autenticação em 2 Fatores (2FA)</span>
                    <span className="text-xs text-muted-foreground">Maior segurança para sua conta</span>
                  </div>
                </div>
                <div className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" style={{ backgroundColor: twoFactorEnabled ? 'hsl(var(--primary))' : 'hsl(var(--muted))' }}>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={twoFactorEnabled}
                    onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                  />
                  <span
                    className={`inline-block size-4 transform rounded-full bg-white transition duration-200 ease-in-out ${twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'}`}
                  />
                </div>
              </label>

              {/* Password Change */}
              <div className="rounded-2xl border border-border bg-background p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-teal-shadow/20 text-teal-deep">
                    <Lock className="size-5" strokeWidth={2} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">Alterar Senha</span>
                    <span className="text-xs text-muted-foreground">Mantenha sua conta protegida</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <input
                    type="password"
                    placeholder="Senha atual"
                    className="h-12 w-full rounded-xl border border-border bg-card px-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nova senha"
                    className="h-12 w-full rounded-xl border border-border bg-card px-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="button"
                    className="mt-1 flex h-12 w-full items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform active:scale-95"
                    onClick={() => {
                      setNewPassword('')
                      setShowSecurity(false)
                    }}
                  >
                    Atualizar Senha
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
