'use client'

import { useState } from 'react'
import { CalendarDays, CheckCircle2, Circle, Clock } from 'lucide-react'
import { atividadesHoje, tipoAtividadeConfig } from '@/lib/app-data'
import type { Atividade } from '@/lib/app-data'

export function ScreenAtividades() {
  const [atividades, setAtividades] = useState<Atividade[]>(atividadesHoje)

  const toggleAtividade = (id: string) => {
    setAtividades(prev =>
      prev.map(a => (a.id === id ? { ...a, concluida: !a.concluida } : a))
    )
  }

  const pendentes = atividades.filter(a => !a.concluida)
  const concluidas = atividades.filter(a => a.concluida)

  return (
    <div className="flex flex-col gap-6 px-5 pt-4 pb-28">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-foreground tracking-tight">
            Suas Atividades
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Acompanhe e gerencie seu dia
          </p>
        </div>
        <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CalendarDays className="size-6" strokeWidth={1.5} />
        </div>
      </header>

      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Pendentes ({pendentes.length})
        </h2>
        {pendentes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 p-8 text-center text-muted-foreground">
            Tudo em dia por aqui! 🎉
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {pendentes.map(atv => {
              const tipoInfo = (tipoAtividadeConfig as Record<string, any>)[atv.tipo] || { cor: 'bg-slate/15 text-slate' }
              return (
                <li key={atv.id} className="animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex items-center gap-3 rounded-[1.25rem] border border-transparent bg-card p-4 shadow-soft transition-all">
                    <div className={`flex size-10 shrink-0 items-center justify-center rounded-2xl ${tipoInfo.cor}`}>
                      {atv.tipo === 'ligacao' ? '📞' : atv.tipo === 'reuniao' ? '👥' : atv.tipo === 'visita' ? '🏠' : '⏰'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {atv.titulo}
                      </p>
                      <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1 font-medium text-amber-600">
                          <Clock className="size-3" />
                          {atv.hora}
                        </span>
                        <span>•</span>
                        <span className="truncate">{atv.cliente}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleAtividade(atv.id)}
                      className="group flex size-8 items-center justify-center rounded-full bg-muted/50 text-muted-foreground transition-colors hover:bg-teal-mid/20 hover:text-teal-deep"
                    >
                      <Circle className="size-5 transition-transform group-active:scale-90" strokeWidth={1.5} />
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </section>

      {concluidas.length > 0 && (
        <section className="animate-in fade-in">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Concluídas ({concluidas.length})
          </h2>
          <ul className="flex flex-col gap-3 opacity-60">
            {concluidas.map(atv => (
              <li key={atv.id} className="animate-in slide-in-from-top-2">
                <div className="flex items-center gap-3 rounded-[1.25rem] border border-border bg-card/40 p-4 transition-all">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-muted text-muted-foreground grayscale">
                    {atv.tipo === 'ligacao' ? '📞' : atv.tipo === 'reuniao' ? '👥' : atv.tipo === 'visita' ? '🏠' : '⏰'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground line-through">
                      {atv.titulo}
                    </p>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{atv.hora}</span>
                      <span>•</span>
                      <span className="truncate">{atv.cliente}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleAtividade(atv.id)}
                    className="flex size-8 items-center justify-center rounded-full bg-teal-mid text-white transition-colors"
                  >
                    <CheckCircle2 className="size-5" strokeWidth={2} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
