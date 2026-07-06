'use client'

import { useState } from 'react'
import { Calendar, CheckCircle2, ChevronRight, Clock, MessageSquare, Target, User, X } from 'lucide-react'
import { type Atividade, tipoAtividadeConfig } from '@/lib/app-data'

export function AtividadeDetalheSheet({
  atividade,
  onClose,
  onVerNegocio,
}: {
  atividade: Atividade | null
  onClose: () => void
  onVerNegocio: (clienteNome: string) => void
  onConcluir: (id: string, feedback: string, agendarProxima: boolean) => void
}) {
  const [feedback, setFeedback] = useState('')
  const [agendarProxima, setAgendarProxima] = useState(false)

  if (!atividade) return null

  const tipoInfo = (tipoAtividadeConfig as Record<string, any>)[atividade.tipo] || { emoji: '📋', cor: 'bg-slate/15 text-slate' }

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />
      <div className="relative z-50 w-full rounded-t-[2.5rem] bg-card p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-2xl animate-in slide-in-from-bottom-full duration-300 max-h-[85vh] overflow-y-auto">
        <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-border" />
        
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4">
            <div className={`flex size-14 shrink-0 items-center justify-center rounded-2xl ${tipoInfo.cor} text-2xl`}>
              {tipoInfo.emoji}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                {atividade.tipo}
              </p>
              <h2 className="font-serif text-xl font-semibold text-foreground leading-tight">
                {atividade.titulo}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-muted/80 active:scale-95"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <div className="flex items-center gap-1.5 rounded-xl bg-amber/15 px-3 py-1.5 text-xs font-semibold text-amber-700">
            <Clock className="size-3.5" />
            Hoje, {atividade.hora}
          </div>
          <button
            type="button"
            onClick={() => onVerNegocio(atividade.cliente)}
            className="flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors active:scale-95"
          >
            <User className="size-3.5" />
            {atividade.cliente}
            <ChevronRight className="size-3.5 text-muted-foreground" />
          </button>
        </div>

        <div className="mt-6 rounded-2xl bg-muted/30 p-4 border border-border/50">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <Target className="size-3.5" />
            O que deve ser feito
          </h3>
          <p className="text-sm text-foreground leading-relaxed">
            {atividade.descricao || 'Nenhuma instrução específica para esta atividade.'}
          </p>
        </div>

        <div className="mt-6">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <MessageSquare className="size-3.5" />
            Feedback da atividade
          </h3>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Como foi a interação? O que ficou acordado?"
            className="w-full resize-none rounded-2xl border border-border bg-background p-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary h-24"
          />
        </div>

        <label className="mt-4 flex items-center gap-3 rounded-2xl border border-border bg-background p-4 cursor-pointer hover:bg-muted/50 transition-colors">
          <input
            type="checkbox"
            checked={agendarProxima}
            onChange={(e) => setAgendarProxima(e.target.checked)}
            className="size-5 rounded border-border text-primary focus:ring-primary"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">Agendar próxima atividade</span>
            <span className="text-xs text-muted-foreground">Continuar o fluxo com este cliente</span>
          </div>
        </label>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-border bg-background text-sm font-semibold text-foreground transition-colors hover:bg-muted active:scale-95"
          >
            <Calendar className="size-4.5" />
            Remarcar
          </button>
          <button
            type="button"
            onClick={() => onConcluir(atividade.id, feedback, agendarProxima)}
            className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-primary text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:bg-primary/90 active:scale-95"
          >
            <CheckCircle2 className="size-4.5" />
            Concluir
          </button>
        </div>
      </div>
    </div>
  )
}
