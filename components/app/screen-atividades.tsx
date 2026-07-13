'use client'

import { useState, useEffect } from 'react'
import { CalendarDays, CheckCircle2, Circle, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import { atividadesHoje, tipoAtividadeConfig, isAtividadeAtrasada } from '@/lib/app-data'
import type { Atividade } from '@/lib/app-data'

export function ScreenAtividades() {
  const getHojeStr = () => {
    const d = new Date()
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  }

  const getAmanhaStr = () => {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  }

  const [dataFiltro, setDataFiltro] = useState(getHojeStr())

  const carregarAtividades = () => {
    const list = [...atividadesHoje].filter(a => {
      let dataAtv = a.data;
      if (!dataAtv || dataAtv === 'Hoje') dataAtv = getHojeStr();
      else if (dataAtv === 'Amanhã') dataAtv = getAmanhaStr();
      
      return dataAtv === dataFiltro
    }).sort((a, b) => {
      const getT = (atv: Atividade) => {
        return new Date(`1970-01-01T${(atv.hora || '00:00').replace('h', '')}:00`).getTime()
      }
      return getT(a) - getT(b)
    })
    setAtividades(list)
  }

  const [atividades, setAtividades] = useState<Atividade[]>([])

  useEffect(() => {
    carregarAtividades()
  }, [dataFiltro])

  useEffect(() => {
    const handleUpdate = () => {
      carregarAtividades()
    }
    window.addEventListener('app-data-updated', handleUpdate)
    return () => window.removeEventListener('app-data-updated', handleUpdate)
  }, [dataFiltro])

  const toggleAtividade = (id: string) => {
    setAtividades(prev =>
      prev.map(a => (a.id === id ? { ...a, concluida: !a.concluida } : a))
    )
    const globalIdx = atividadesHoje.findIndex(a => a.id === id)
    if (globalIdx !== -1) atividadesHoje[globalIdx].concluida = !atividadesHoje[globalIdx].concluida
    window.dispatchEvent(new CustomEvent('app-data-updated'))
  }

  const navegarData = (dias: number) => {
    const [y, m, d] = dataFiltro.split('-').map(Number)
    const novaData = new Date(y, m - 1, d + dias)
    setDataFiltro(`${novaData.getFullYear()}-${String(novaData.getMonth() + 1).padStart(2, '0')}-${String(novaData.getDate()).padStart(2, '0')}`)
  }

  const formatarDataExibicao = (dataStr: string) => {
    if (dataStr === getHojeStr()) return 'Hoje'
    if (dataStr === getAmanhaStr()) return 'Amanhã'
    const [y, m, d] = dataStr.split('-')
    return `${d}/${m}/${y}`
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

      {/* Navegador de Data */}
      <div className="flex items-center justify-between rounded-2xl bg-card p-3 shadow-sm border border-border">
        <button
          type="button"
          onClick={() => navegarData(-1)}
          className="flex size-10 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors hover:bg-muted/80 active:scale-95"
        >
          <ChevronLeft className="size-5" />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-sm font-semibold text-foreground">
            {formatarDataExibicao(dataFiltro)}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
            {atividades.length} atividades
          </span>
        </div>
        <button
          type="button"
          onClick={() => navegarData(1)}
          className="flex size-10 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors hover:bg-muted/80 active:scale-95"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

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
              const tipoInfo = (tipoAtividadeConfig as Record<string, any>)[atv.tipo] || { cor: 'bg-muted text-muted-foreground' }
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
                        <span className={`flex items-center gap-1 font-medium ${!atv.concluida && isAtividadeAtrasada(atv.data || 'Hoje', atv.hora) ? 'text-red-500' : 'text-muted-foreground'}`}>
                          <Clock className="size-3" />
                          {atv.hora}
                          {!atv.concluida && isAtividadeAtrasada(atv.data || 'Hoje', atv.hora) && (
                            <span className="ml-1 rounded text-[9px] font-bold text-red-500 bg-red-500/10 border border-red-500/20 px-1.5 py-0.5">ATRASADA</span>
                          )}
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
