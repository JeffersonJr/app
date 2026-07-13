'use client'

import { useState } from 'react'
import { Check, SlidersHorizontal, X } from 'lucide-react'

export type FiltrosClientes = {
  dataCriacaoIntervalo: string
  origem: string[]
  status: string[]
}

export function FiltrosClientesSheet({
  filtrosAtuais,
  onApply,
  onClose,
}: {
  filtrosAtuais: FiltrosClientes
  onApply: (f: FiltrosClientes) => void
  onClose: () => void
}) {
  const [dataCriacaoIntervalo, setDataCriacaoIntervalo] = useState(filtrosAtuais.dataCriacaoIntervalo)
  const [origem, setOrigem] = useState<string[]>(filtrosAtuais.origem)
  const [status, setStatus] = useState<string[]>(filtrosAtuais.status)

  const DATA_OPCOES = ['Qualquer', 'Hoje', 'Esta semana', 'Este mês', 'Últimos 30 dias', 'Este ano']
  const ORIGEM_OPCOES = ['Portal ZAP', 'Instagram', 'Indicação', 'Google Ads', 'Passante', 'Outros']
  const STATUS_OPCOES = ['aberto', 'ganho', 'perdido']

  function toggleArray(current: string[], value: string) {
    if (current.includes(value)) {
      return current.filter((i) => i !== value)
    }
    return [...current, value]
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full sm:w-[450px] bg-card rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[85vh] sm:h-[80vh] sm:max-h-[700px] animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-10 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border/50 bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <SlidersHorizontal className="size-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-foreground">Filtros de Clientes</h2>
              <p className="text-xs text-muted-foreground">Refine sua lista de contatos</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full bg-muted/60 text-muted-foreground hover:bg-muted transition-all active:scale-95"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
          
          {/* Data de Criação */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Data de Criação</h3>
            <div className="flex flex-wrap gap-2">
              {DATA_OPCOES.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setDataCriacaoIntervalo(opt)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                    dataCriacaoIntervalo === opt 
                      ? 'bg-primary text-primary-foreground border-primary shadow-sm' 
                      : 'bg-card text-muted-foreground border-border hover:border-primary/50'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Status do Lead</h3>
            <div className="grid grid-cols-2 gap-2">
              {STATUS_OPCOES.map((opt) => {
                const selecionado = status.includes(opt)
                const isGanho = opt === 'ganho'
                const isPerdido = opt === 'perdido'
                
                return (
                  <button
                    key={opt}
                    onClick={() => setStatus(toggleArray(status, opt))}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all ${
                      selecionado 
                        ? (isGanho ? 'border-green-500 bg-green-500/10 text-green-700' : isPerdido ? 'border-red-500 bg-red-500/10 text-red-700' : 'border-primary bg-primary/10 text-primary') 
                        : 'border-border bg-card text-muted-foreground hover:border-muted-foreground/30'
                    }`}
                  >
                    <span className="text-sm font-bold capitalize">{opt}</span>
                    <div className={`flex size-5 rounded-md items-center justify-center border transition-all ${
                      selecionado 
                        ? (isGanho ? 'bg-green-500 border-green-500' : isPerdido ? 'bg-red-500 border-red-500' : 'bg-primary border-primary') 
                        : 'border-muted-foreground/30'
                    }`}>
                      {selecionado && <Check className="size-3.5 text-white" strokeWidth={3} />}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Origem */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Origem de Captação</h3>
            <div className="flex flex-wrap gap-2">
              {ORIGEM_OPCOES.map((opt) => {
                const selecionado = origem.includes(opt)
                return (
                  <button
                    key={opt}
                    onClick={() => setOrigem(toggleArray(origem, opt))}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                      selecionado 
                        ? 'bg-primary/10 text-primary border-primary shadow-sm' 
                        : 'bg-card text-foreground border-border hover:border-primary/50'
                    }`}
                  >
                    {selecionado && <Check className="size-3" strokeWidth={3} />}
                    {opt}
                  </button>
                )
              })}
            </div>
          </div>
          
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-border/50 bg-background/50 flex gap-3">
          <button
            onClick={() => {
              setDataCriacaoIntervalo('Qualquer')
              setOrigem([])
              setStatus([])
            }}
            className="flex-1 h-12 rounded-xl border border-border bg-card text-muted-foreground font-bold hover:bg-muted transition-all active:scale-95"
          >
            Limpar
          </button>
          <button
            onClick={() => onApply({ dataCriacaoIntervalo, origem, status })}
            className="flex-[2] h-12 rounded-xl bg-primary text-primary-foreground font-bold shadow-md hover:bg-primary/90 transition-all active:scale-95"
          >
            Aplicar Filtros
          </button>
        </div>
      </div>
    </div>
  )
}
