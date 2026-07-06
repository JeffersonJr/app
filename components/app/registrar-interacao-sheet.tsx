'use client'

import { useState } from 'react'
import { X, Calendar, MessageCircle, FileText, CalendarDays } from 'lucide-react'
import { tipoAtividadeConfig, type EventoTimeline, type TipoAtividade } from '@/lib/app-data'

export function RegistrarInteracaoSheet({
  onClose,
  onSave,
}: {
  onClose: () => void
  onSave: (evento: EventoTimeline) => void
}) {
  const [tipo, setTipo] = useState<'nota' | 'atividade' | 'email'>('nota')
  
  // Atividade states
  const [tipoAtividade, setTipoAtividade] = useState<TipoAtividade>('ligacao')
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [dataStr, setDataStr] = useState('')
  const [horaStr, setHoraStr] = useState('')
  const [importante, setImportante] = useState(false)
  const [assuntoEmail, setAssuntoEmail] = useState('')

  function handleSalvar() {
    if (!descricao.trim()) return

    const baseId = `evt-${Date.now()}`
    
    // Fallback date/time se não preencher
    const now = new Date()
    const finalData = dataStr || now.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
    const finalHora = horaStr || now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

    const evento: EventoTimeline = {
      id: baseId,
      tipo,
      descricao: tipo === 'atividade' 
        ? `[${tipoAtividadeConfig[tipoAtividade].label}] ${titulo} - ${descricao}` 
        : tipo === 'email' && assuntoEmail.trim()
          ? `[${assuntoEmail}] ${descricao}`
          : descricao,
      data: finalData,
      hora: finalHora,
      importante,
    }

    onSave(evento)
  }

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Fechar"
        onClick={onClose}
        className="absolute inset-0 bg-teal-shadow/40 backdrop-blur-[2px]"
      />

      {/* Sheet Content */}
      <div className="relative flex flex-col rounded-t-3xl bg-card shadow-2xl animate-in slide-in-from-bottom duration-200 max-h-[90dvh]">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="h-1 w-10 rounded-full bg-border" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
          <h2 className="font-serif text-xl font-semibold text-foreground">Nova Interação</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-brand active:scale-95"
          >
            <X className="size-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* Scrollable Form */}
        <div className="flex-1 overflow-y-auto px-6 py-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
          {/* Tabs Tipo de Interação */}
          <div className="flex gap-2 rounded-2xl bg-muted p-1 mb-6">
            {(['nota', 'atividade', 'email'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTipo(t)}
                className={`flex-1 rounded-xl py-2 text-xs font-semibold uppercase tracking-wider transition-brand ${
                  tipo === t ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-5">
            {tipo === 'atividade' && (
              <>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Tipo de Atividade
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(Object.entries(tipoAtividadeConfig) as [TipoAtividade, any][]).map(([key, config]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setTipoAtividade(key)}
                        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-brand border ${
                          tipoAtividade === key
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-card text-muted-foreground'
                        }`}
                      >
                        <span>{config.emoji}</span> {config.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Título
                  </label>
                  <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Ex: Visita ao imóvel X"
                    className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Data (Opcional)
                    </label>
                    <div className="relative">
                      <CalendarDays className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        value={dataStr}
                        onChange={(e) => setDataStr(e.target.value)}
                        placeholder="DD/MM"
                        className="w-full rounded-2xl border border-border bg-card pl-10 pr-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Hora (Opcional)
                    </label>
                    <input
                      type="text"
                      value={horaStr}
                      onChange={(e) => setHoraStr(e.target.value)}
                      placeholder="HH:MM"
                      className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </>
            )}

            {tipo === 'email' && (
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Assunto
                </label>
                <input
                  type="text"
                  value={assuntoEmail}
                  onChange={(e) => setAssuntoEmail(e.target.value)}
                  placeholder="Ex: Proposta enviada"
                  className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none focus:border-primary mb-5"
                />
              </div>
            )}

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {tipo === 'email' ? 'Conteúdo do Email' : tipo === 'nota' ? 'Sua Nota' : 'Detalhes'}
              </label>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                rows={4}
                placeholder="Escreva aqui..."
                className="w-full resize-none rounded-2xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
              />
            </div>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={importante}
                onChange={(e) => setImportante(e.target.checked)}
                className="size-5 rounded border-border text-primary focus:ring-primary accent-primary"
              />
              <span className="text-sm font-medium text-foreground">Marcar como importante ⭐</span>
            </label>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-2xl border border-border bg-transparent py-3.5 font-semibold text-foreground transition-brand active:scale-[0.98]"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSalvar}
              disabled={!descricao.trim() || (tipo === 'atividade' && !titulo.trim())}
              className="flex-[2] rounded-2xl bg-primary py-3.5 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-brand active:scale-[0.98] disabled:opacity-50"
            >
              Registrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
