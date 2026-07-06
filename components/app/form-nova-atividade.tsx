'use client'

import { useState } from 'react'
import { Star, X } from 'lucide-react'
import { type TipoAtividade, tipoAtividadeConfig } from '@/lib/app-data'

const TIPOS: TipoAtividade[] = ['visita', 'reuniao', 'ligacao', 'prazo', 'pos-venda']

export function FormNovaAtividade({ onClose }: { onClose: () => void }) {
  const [tipo, setTipo] = useState<TipoAtividade>('visita')
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [data, setData] = useState('')
  const [hora, setHora] = useState('')
  const [importante, setImportante] = useState(false)
  const [cliente, setCliente] = useState('')

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-serif text-xl font-semibold text-foreground">Nova atividade</h2>
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
        {/* Tipo */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Tipo de atividade</label>
          <div className="flex flex-wrap gap-2">
            {TIPOS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTipo(t)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-brand ${
                  tipo === t
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border bg-card text-muted-foreground'
                }`}
              >
                {tipoAtividadeConfig[t].emoji} {tipoAtividadeConfig[t].label}
              </button>
            ))}
          </div>
        </div>

        {/* Título */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Título *</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ex: Visita ao imóvel MS-1042"
            className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Descrição */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Descrição</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows={2}
            placeholder="Detalhes, instruções, observações..."
            className="w-full resize-none rounded-2xl border border-border bg-background p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Cliente */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Cliente</label>
          <input
            type="text"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            placeholder="Nome do cliente..."
            className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Data e Hora */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Data *</label>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="h-12 w-full rounded-2xl border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Hora *</label>
            <input
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className="h-12 w-full rounded-2xl border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Importante */}
        <button
          type="button"
          onClick={() => setImportante(!importante)}
          className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold transition-brand ${
            importante
              ? 'border-amber bg-amber/10 text-[#8a5a1e]'
              : 'border-border bg-card text-muted-foreground'
          }`}
        >
          <Star
            className={`size-5 ${importante ? 'fill-amber text-amber' : 'text-muted-foreground'}`}
            strokeWidth={importante ? 0 : 1.5}
          />
          Marcar como importante
        </button>

        <button
          type="button"
          onClick={onClose}
          className="h-12 w-full rounded-2xl bg-primary text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-brand active:scale-[0.98]"
        >
          Salvar atividade
        </button>
      </div>
    </div>
  )
}
