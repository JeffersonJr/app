'use client'

import { useState } from 'react'
import { tipoAtividadeConfig, type EventoTimeline, type TipoAtividade, imoveis } from '@/lib/app-data'
import { Search, ArrowUp, ArrowDown, Trash2, Phone as PhoneIcon, MessageCircle as WpIcon, X, CalendarDays, Calendar, MessageCircle } from 'lucide-react'

export function RegistrarAtividadeSheet({
  onClose,
  onSave,
  clienteDados,
}: {
  onClose: () => void
  onSave: (evento: EventoTimeline) => void
  clienteDados?: { nome: string; telefone: string; email?: string }
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

  // Visita states
  const [buscaImovel, setBuscaImovel] = useState('')
  const [imoveisSelecionados, setImoveisSelecionados] = useState<typeof imoveis>([])

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
          <h2 className="font-serif text-xl font-semibold text-foreground">Nova Atividade / Registro</h2>
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
          {/* Tabs Tipo de Registro */}
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

                {tipoAtividade === 'reuniao' && clienteDados && (
                  <div className="mt-2 rounded-2xl bg-muted/40 p-4 border border-border">
                    <p className="mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Ações Rápidas com Cliente</p>
                    <div className="flex gap-2">
                      <a href={`tel:${clienteDados.telefone.replace(/\D/g, '')}`} className="flex flex-1 items-center justify-center gap-2 h-10 rounded-xl bg-card border border-border text-xs font-semibold text-foreground shadow-sm transition-brand hover:bg-muted active:scale-95">
                        <PhoneIcon className="size-4 text-primary" /> Ligar
                      </a>
                      <a href={`https://wa.me/55${clienteDados.telefone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center gap-2 h-10 rounded-xl bg-[#25D366] border border-[#25D366] text-xs font-semibold text-white shadow-sm transition-brand active:scale-95">
                        <WpIcon className="size-4 text-white" /> WhatsApp
                      </a>
                    </div>
                  </div>
                )}

                {tipoAtividade === 'visita' && (
                  <div className="mt-2">
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Imóveis para Visitar
                    </label>
                    <div className="relative mb-3">
                      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        value={buscaImovel}
                        onChange={(e) => setBuscaImovel(e.target.value)}
                        placeholder="Buscar por código ou título..."
                        className="w-full rounded-2xl border border-border bg-card pl-10 pr-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                      />
                    </div>
                    {buscaImovel.trim() && (
                      <div className="max-h-48 overflow-y-auto rounded-2xl border border-border bg-card p-2 shadow-sm mb-4">
                        {imoveis
                          .filter(im => 
                            !imoveisSelecionados.find(s => s.id === im.id) &&
                            (im.titulo.toLowerCase().includes(buscaImovel.toLowerCase()) || im.codigo.toLowerCase().includes(buscaImovel.toLowerCase()))
                          )
                          .map(im => (
                            <button
                              key={im.id}
                              type="button"
                              onClick={() => {
                                setImoveisSelecionados([...imoveisSelecionados, im])
                                setBuscaImovel('')
                              }}
                              className="w-full flex items-center justify-between rounded-xl p-2 text-left hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex-1 min-w-0 pr-3">
                                <p className="text-sm font-semibold text-foreground truncate">{im.titulo}</p>
                                <p className="text-xs text-muted-foreground">{im.codigo} • {im.bairro}</p>
                              </div>
                              <div className="shrink-0 flex items-center justify-center rounded bg-primary/10 px-2 py-1 text-xs font-bold text-primary">
                                + Adicionar
                              </div>
                            </button>
                          ))}
                      </div>
                    )}
                    {imoveisSelecionados.length > 0 && (
                      <ul className="flex flex-col gap-2">
                        {imoveisSelecionados.map((im, idx) => (
                          <li key={im.id} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm">
                            <div className="flex flex-col gap-1">
                              <button 
                                type="button" 
                                disabled={idx === 0}
                                onClick={() => {
                                  const arr = [...imoveisSelecionados]
                                  const temp = arr[idx-1]
                                  arr[idx-1] = arr[idx]
                                  arr[idx] = temp
                                  setImoveisSelecionados(arr)
                                }}
                                className="flex size-6 items-center justify-center rounded bg-muted text-muted-foreground disabled:opacity-30 transition-transform active:scale-95"
                              >
                                <ArrowUp className="size-3" strokeWidth={3} />
                              </button>
                              <button 
                                type="button"
                                disabled={idx === imoveisSelecionados.length - 1}
                                onClick={() => {
                                  const arr = [...imoveisSelecionados]
                                  const temp = arr[idx+1]
                                  arr[idx+1] = arr[idx]
                                  arr[idx] = temp
                                  setImoveisSelecionados(arr)
                                }}
                                className="flex size-6 items-center justify-center rounded bg-muted text-muted-foreground disabled:opacity-30 transition-transform active:scale-95"
                              >
                                <ArrowDown className="size-3" strokeWidth={3} />
                              </button>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-foreground truncate">{im.titulo}</p>
                              <p className="text-xs text-muted-foreground font-mono">{im.codigo}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setImoveisSelecionados(imoveisSelecionados.filter(s => s.id !== im.id))}
                              className="flex size-8 items-center justify-center rounded-full text-red-500 hover:bg-red-500/10 transition-colors"
                            >
                              <Trash2 className="size-4" strokeWidth={2} />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
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
