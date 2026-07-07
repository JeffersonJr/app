'use client'

import { X } from 'lucide-react'

export function FiltrosAvancadosImoveisSheet({
  onClose,
  filtroFinalidade,
  setFiltroFinalidade,
  filtroStatus,
  setFiltroStatus,
}: {
  onClose: () => void
  filtroFinalidade: string
  setFiltroFinalidade: (v: string) => void
  filtroStatus: string
  setFiltroStatus: (v: string) => void
}) {
  const finalidades = ['Residencial', 'Comercial', 'Industrial', 'Rural']
  const statusList = ['Livre', 'Ocupado', 'Em reforma', 'Reservado', 'Proposta']

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Fechar filtros"
        onClick={onClose}
        className="absolute inset-0 bg-teal-shadow/40 backdrop-blur-[2px]"
      />

      {/* Sheet Content */}
      <div className="relative flex flex-col rounded-t-3xl bg-card shadow-2xl animate-in slide-in-from-bottom duration-200">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="h-1 w-10 rounded-full bg-border" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="font-serif text-xl font-semibold text-foreground">Filtros Avançados</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-brand active:scale-95"
          >
            <X className="size-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-6 p-6 overflow-y-auto pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
          
          {/* Finalidade */}
          <div>
            <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Finalidade
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setFiltroFinalidade('Todas')}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-brand border ${
                  filtroFinalidade === 'Todas'
                    ? 'border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20'
                    : 'border-border bg-transparent text-muted-foreground'
                }`}
              >
                Todas
              </button>
              {finalidades.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFiltroFinalidade(f)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-brand border ${
                    filtroFinalidade === f
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-transparent text-muted-foreground'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Status do Imóvel
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setFiltroStatus('Todos')}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-brand border ${
                  filtroStatus === 'Todos'
                    ? 'border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20'
                    : 'border-border bg-transparent text-muted-foreground'
                }`}
              >
                Todos
              </button>
              {statusList.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setFiltroStatus(s)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-brand border ${
                    filtroStatus === s
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-transparent text-muted-foreground'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-2 flex gap-3">
            <button
              type="button"
              onClick={() => {
                setFiltroFinalidade('Todas')
                setFiltroStatus('Todos')
              }}
              className="flex-1 rounded-2xl border border-border bg-transparent py-3.5 font-semibold text-foreground transition-brand active:scale-[0.98]"
            >
              Limpar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-[2] rounded-2xl bg-primary py-3.5 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-brand active:scale-[0.98]"
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
