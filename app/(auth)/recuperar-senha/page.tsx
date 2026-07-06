'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, CheckCircle2, Mail } from 'lucide-react'

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [enviado, setEnviado] = useState(false)

  async function handleEnviar(e: React.FormEvent) {
    e.preventDefault()
    setCarregando(true)
    await new Promise((r) => setTimeout(r, 1500))
    setCarregando(false)
    setEnviado(true)
  }

  return (
    <div className="flex flex-1 flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 bg-primary px-5 pb-6 pt-[calc(1rem+env(safe-area-inset-top))]">
        <Link
          href="/login"
          className="flex size-10 items-center justify-center rounded-full bg-teal-shadow/40 text-primary-foreground"
        >
          <ArrowLeft className="size-5" strokeWidth={1.5} />
        </Link>
        <div>
          <h1 className="font-serif text-xl font-semibold text-primary-foreground">Recuperar senha</h1>
          <p className="text-sm text-teal-light">Microsistec CRM</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center px-8 py-8">
        {!enviado ? (
          <>
            <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary/10">
              <Mail className="size-8 text-primary" strokeWidth={1.5} />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-foreground">Esqueceu a senha?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Sem problema! Digite o e-mail da sua conta e enviaremos um link para você criar uma nova senha.
            </p>

            <form onSubmit={handleEnviar} className="mt-8 flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  E-mail da conta
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
                    Enviando...
                  </span>
                ) : 'Enviar link de recuperação'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <Link href="/login" className="text-sm font-semibold text-primary hover:underline">
                Voltar para o login
              </Link>
            </div>
          </>
        ) : (
          /* Estado de sucesso */
          <div className="flex flex-col items-center text-center">
            <div className="flex size-20 items-center justify-center rounded-full bg-teal-mid/20">
              <CheckCircle2 className="size-10 text-teal-mid" strokeWidth={1.5} />
            </div>
            <h2 className="mt-5 font-serif text-2xl font-semibold text-foreground">Link enviado!</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Verifique a caixa de entrada de{' '}
              <strong className="text-foreground">{email}</strong>.
              <br />
              O link expira em 30 minutos.
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              Não recebeu? Verifique o spam ou{' '}
              <button
                type="button"
                onClick={() => setEnviado(false)}
                className="font-semibold text-primary hover:underline"
              >
                tente novamente
              </button>
            </p>
            <Link
              href="/login"
              className="mt-8 h-12 w-full flex items-center justify-center rounded-2xl bg-primary text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-brand active:scale-[0.98]"
            >
              Voltar para o login
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
