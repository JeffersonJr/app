'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

const ORIGENS = [
  'Portal ZAP', 'Portal VivaReal', 'Portal OLX', 'Site Próprio',
  'Facebook', 'Instagram', 'Indicação', 'Cliente de Porta',
  'WhatsApp', 'Ligação', 'Outro',
] as const

const TEMPERATURAS = ['quente', 'morno', 'frio'] as const

export function FormNovoLead({ onClose }: { onClose: () => void }) {
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const [origem, setOrigem] = useState<(typeof ORIGENS)[number]>('Portal ZAP')
  const [temperatura, setTemperatura] = useState<(typeof TEMPERATURAS)[number]>('morno')

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-serif text-xl font-semibold text-foreground">Novo lead</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground"
        >
          <X className="size-4" strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Nome completo *
          </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: João Silva"
            className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Telefone *
          </label>
          <input
            type="tel"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="(11) 99999-9999"
            className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            E-mail
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="cliente@email.com"
            className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Origem do lead *
          </label>
          <select
            value={origem}
            onChange={(e) => setOrigem(e.target.value as (typeof ORIGENS)[number])}
            className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring appearance-none"
          >
            {ORIGENS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Temperatura inicial
          </label>
          <div className="flex gap-2">
            {TEMPERATURAS.map((t) => {
              const cores: Record<string, string> = {
                quente: 'bg-amber text-ink',
                morno: 'bg-teal-mid text-white',
                frio: 'bg-slate text-white',
              }
              const labels: Record<string, string> = { quente: '🔥 Quente', morno: '🌡️ Morno', frio: '❄️ Frio' }
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTemperatura(t)}
                  className={`flex-1 rounded-xl py-2 text-xs font-semibold transition-brand ${
                    temperatura === t ? cores[t] : 'border border-border bg-card text-muted-foreground'
                  }`}
                >
                  {labels[t]}
                </button>
              )
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="h-12 w-full rounded-2xl bg-primary text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-brand active:scale-[0.98]"
        >
          Salvar lead
        </button>
      </div>
    </div>
  )
}
