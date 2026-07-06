'use client'

import { useState } from 'react'
import { Building2, CalendarPlus, Camera, UserPlus, X } from 'lucide-react'
import { FormCaptarImovel } from '@/components/app/form-captar-imovel'
import { FormNovaAtividade } from '@/components/app/form-nova-atividade'
import { FormNovoLead } from '@/components/app/form-novo-lead'
import { FormNovoNegocio } from '@/components/app/form-novo-negocio'

type Acao = 'novo-lead' | 'nova-atividade' | 'novo-negocio' | 'captar-imovel' | null

const acoes = [
  { id: 'novo-lead' as const, icon: UserPlus, titulo: 'Novo lead', desc: 'Capture um contato em segundos' },
  { id: 'nova-atividade' as const, icon: CalendarPlus, titulo: 'Nova atividade', desc: 'Visita, ligação, reunião ou prazo' },
  { id: 'novo-negocio' as const, icon: Building2, titulo: 'Novo negócio', desc: 'Inicie uma negociação no funil' },
  { id: 'captar-imovel' as const, icon: Camera, titulo: 'Captar imóvel', desc: 'Fotografe e cadastre na rua' },
]

export function QuickAddSheet({ onClose }: { onClose: () => void }) {
  const [acaoAtiva, setAcaoAtiva] = useState<Acao>(null)

  function handleSelect(id: Acao) {
    setAcaoAtiva(id)
  }

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      <button
        type="button"
        aria-label="Fechar"
        onClick={onClose}
        className="absolute inset-0 bg-teal-shadow/50 backdrop-blur-[2px]"
      />
      <div className="relative rounded-t-3xl bg-card px-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-6 shadow-2xl animate-in slide-in-from-bottom duration-200 max-h-[90dvh] overflow-y-auto">
        <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-fog" aria-hidden="true" />

        {/* Menu inicial */}
        {!acaoAtiva && (
          <>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-serif text-xl font-semibold text-foreground">Ação rápida</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar painel"
                className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-brand active:scale-95"
              >
                <X className="size-4" strokeWidth={1.5} />
              </button>
            </div>
            <ul className="flex flex-col gap-2">
              {acoes.map((acao) => (
                <li key={acao.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(acao.id)}
                    className="flex w-full items-center gap-4 rounded-2xl border border-border bg-background p-4 text-left transition-brand active:scale-[0.98] active:bg-muted"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <acao.icon className="size-5" strokeWidth={1.5} />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-semibold text-foreground">{acao.titulo}</span>
                      <span className="text-xs text-muted-foreground">{acao.desc}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Formulários inline */}
        {acaoAtiva === 'novo-lead' && (
          <FormNovoLead onClose={() => { setAcaoAtiva(null); onClose() }} />
        )}
        {acaoAtiva === 'nova-atividade' && (
          <FormNovaAtividade onClose={() => { setAcaoAtiva(null); onClose() }} />
        )}
        {acaoAtiva === 'novo-negocio' && (
          <FormNovoNegocio onClose={() => { setAcaoAtiva(null); onClose() }} />
        )}
        {acaoAtiva === 'captar-imovel' && (
          <FormCaptarImovel onClose={() => { setAcaoAtiva(null); onClose() }} />
        )}
      </div>
    </div>
  )
}
