'use client'

import { useState } from 'react'
import { Calendar, CheckCircle2, ChevronRight, Clock, MessageSquare, Target, User, X, PartyPopper, Phone, MessageCircle, MapPin, FileText as DocumentIcon, Search, ArrowUp, ArrowDown, Pencil, Mic, PhoneOff } from 'lucide-react'
import { type Atividade, isAtividadeAtrasada, tipoAtividadeConfig, imoveis, atendimentos } from '@/lib/app-data'
import { useEffect } from 'react'
import confetti from 'canvas-confetti'
import { FormNovaAtividade } from '@/components/app/form-nova-atividade'

export function AtividadeDetalheSheet({
  atividade,
  onClose,
  onVerNegocio,
  onConcluir,
  onGerarTermo
}: {
  atividade: Atividade | null
  onClose: () => void
  onVerNegocio: (clienteNome: string) => void
  onConcluir: (id: string, statusConcluida: boolean, feedback?: string, agendarProxima?: boolean) => void
  onGerarTermo?: (atividadeId: string) => void
}) {
  const [feedback, setFeedback] = useState('')
  const [agendarProxima, setAgendarProxima] = useState(false)
  const [remarcando, setRemarcando] = useState(false)
  const [novaData, setNovaData] = useState('')
  const [novaHora, setNovaHora] = useState('')
  const [sucesso, setSucesso] = useState(false)
  const [sucessoRemarcar, setSucessoRemarcar] = useState(false)
  const [emojiFeedback, setEmojiFeedback] = useState<'ruim' | 'neutra' | 'boa' | null>(null)
  const [visitadosLocais, setVisitadosLocais] = useState<Record<string, boolean>>({})
  const [buscandoImovel, setBuscandoImovel] = useState(false)
  const [buscaImovelTexto, setBuscaImovelTexto] = useState('')
  const [editando, setEditando] = useState(false)
  const [mostrarLigacao, setMostrarLigacao] = useState(false)

  useEffect(() => {
    // Reset all state when a new atividade is opened
    setFeedback('')
    setSucesso(false)
    setRemarcando(false)
    setNovaData('')
    setNovaHora('')
    setEmojiFeedback(null)
    setEditando(false)
    setMostrarLigacao(false)
    if (atividade?.tipo === 'visita') {
      setAgendarProxima(true)
      const inicialVisitados: Record<string, boolean> = {}
      atividade.imoveisVisitados?.forEach(imv => {
        inicialVisitados[imv.id] = imv.visitado
      })
      setVisitadosLocais(inicialVisitados)
      setBuscandoImovel(false)
      setBuscaImovelTexto('')
    } else {
      setAgendarProxima(false)
      setVisitadosLocais({})
    }
  }, [atividade?.id])

  if (!atividade) return null

  function handleReorder(idx: number, dir: 'up' | 'down') {
    if (!atividade || !atividade.imoveisVisitados) return
    const newArr = [...atividade.imoveisVisitados]
    const targetIdx = dir === 'up' ? idx - 1 : idx + 1
    if (targetIdx < 0 || targetIdx >= newArr.length) return
    const temp = newArr[idx]
    newArr[idx] = newArr[targetIdx]
    newArr[targetIdx] = temp

    // Altera a referência diretamente como estava sendo feito
    atividade.imoveisVisitados = newArr
    // Força re-render limpo usando um estado que já mapeia as visitas
    setVisitadosLocais(prev => ({ ...prev }))
  }

  function handleConcluir() {
    // Save the visited status back to the activity object
    if (atividade?.imoveisVisitados) {
      atividade.imoveisVisitados.forEach(imv => {
        if (visitadosLocais[imv.id]) imv.visitado = true
      })
    }

    let finalFeedback = feedback
    if (emojiFeedback) {
      const emojiMap = { ruim: '👎 Ruim', neutra: '😐 Neutra', boa: '👍 Boa' }
      finalFeedback = finalFeedback ? `[${emojiMap[emojiFeedback]}] ${finalFeedback}` : `[${emojiMap[emojiFeedback]}]`
    }

    setSucesso(true)
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#0d9488', '#14b8a6', '#5eead4']
    })
    setTimeout(() => {
      onConcluir(atividade!.id, true, finalFeedback, agendarProxima)
    }, 1500)
  }

  function handleDesfazerConclusao() {
    onConcluir(atividade!.id, false)
  }

  function handleRemarcar() {
    atividade!.hora = novaHora || atividade!.hora
    if (novaData) atividade!.titulo = `${atividade!.titulo} (Remarcado)`

    setSucessoRemarcar(true)
    setTimeout(() => {
      onClose()
    }, 1200)
  }

  const tipoInfo = (tipoAtividadeConfig as Record<string, any>)[atividade.tipo] || { emoji: '📋', cor: 'bg-muted text-muted-foreground' }

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />
      <div className="relative flex w-full max-w-[600px] flex-col rounded-t-3xl sm:rounded-3xl bg-card shadow-2xl animate-in sm:zoom-in-95 sm:slide-in-from-bottom-0 slide-in-from-bottom max-h-[95dvh] duration-300 mx-auto">
        <div className="flex justify-center pt-3 pb-1 shrink-0"><div className="h-1 w-10 rounded-full bg-border" /></div>

        {editando ? (
          <div className="flex-1 overflow-y-auto px-6 py-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
            <FormNovaAtividade
              atividadeInicial={atividade}
              defaultClienteId={atendimentos.find(a => a.nome === atividade.cliente)?.id}
              onClose={() => setEditando(false)}
              onSalvar={() => {
                setEditando(false)
                onClose()
              }}
            />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
            {sucesso ? (
              <div className="flex flex-col items-center justify-center py-10 animate-in zoom-in duration-300">
                <div className="flex size-20 items-center justify-center rounded-full bg-teal-mid/10 text-teal-deep mb-4">
                  <CheckCircle2 className="size-10" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-foreground text-center">
                  Atividade Concluída!
                </h2>
                <p className="mt-2 text-sm text-muted-foreground text-center max-w-xs">
                  {agendarProxima ? 'Vamos agendar a próxima etapa...' : 'Tudo certo. Bom trabalho!'}
                </p>
              </div>
            ) : sucessoRemarcar ? (
              <div className="flex flex-col items-center justify-center py-10 animate-in zoom-in duration-300">
                <div className="flex size-20 items-center justify-center rounded-full bg-amber/10 text-amber mb-4">
                  <Calendar className="size-10" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-foreground text-center">
                  Remarcado com sucesso!
                </h2>
                <p className="mt-2 text-sm text-muted-foreground text-center max-w-xs">
                  A agenda foi atualizada.
                </p>
              </div>
            ) : atividade.concluida ? (
              <div className="flex flex-col items-center justify-center py-6 animate-in zoom-in duration-300">
                <div className="flex size-20 items-center justify-center rounded-full bg-teal-mid/10 text-teal-deep mb-4">
                  <CheckCircle2 className="size-10" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-foreground text-center">
                  Atividade Concluída
                </h2>
                <p className="mt-2 text-sm text-muted-foreground text-center max-w-xs mb-8">
                  Esta atividade já foi finalizada.
                </p>
                <button
                  type="button"
                  onClick={handleDesfazerConclusao}
                  className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                >
                  Desfazer conclusão
                </button>
              </div>
            ) : (
              <>
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
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setEditando(true)}
                      className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-muted/80 active:scale-95"
                      title="Editar Atividade"
                    >
                      <Pencil className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-muted/80 active:scale-95"
                    >
                      <X className="size-5" />
                    </button>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <div className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold ${!atividade.concluida && isAtividadeAtrasada(atividade.data || 'Hoje', atividade.hora) ? 'bg-red-500/10 text-red-600 border border-red-500/20' : 'bg-amber/15 text-amber-700'}`}>
                    <Clock className="size-3.5" />
                    {!atividade.concluida && isAtividadeAtrasada(atividade.data || 'Hoje', atividade.hora) ? `ATRASADA (${atividade.hora})` : `${atividade.data && atividade.data !== 'Hoje' ? atividade.data : 'Hoje'}, ${atividade.hora}`}
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

                {atividade.tipo === 'ligacao' && atividade.telefone && (
                  <div className="mt-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-5 shadow-sm">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-2">Ligação com Lead</p>
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div>
                        <p className="text-lg font-bold text-foreground">{atividade.telefone}</p>
                        <p className="text-xs text-muted-foreground">Chamada local via operadora</p>
                      </div>
                      <span className="flex size-10 items-center justify-center rounded-full bg-primary/20 text-primary animate-pulse">
                        <Phone className="size-5" />
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setMostrarLigacao(true)}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/95 active:scale-[0.98] shadow-sm"
                    >
                      <Phone className="size-4" strokeWidth={2} />
                      Iniciar Ligação
                    </button>
                  </div>
                )}
                {atividade.tipo === 'whatsapp' && atividade.whatsapp && (
                  <div className="mt-6 rounded-2xl border border-green-200 bg-gradient-to-br from-[#25D366]/5 to-[#25D366]/10 p-5 shadow-sm">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#25D366] mb-2">Mensagem de WhatsApp</p>
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div>
                        <p className="text-lg font-bold text-foreground">{atividade.whatsapp}</p>
                        <p className="text-xs text-muted-foreground">Abrir chat direto com lead</p>
                      </div>
                      <span className="flex size-10 items-center justify-center rounded-full bg-[#25D366]/20 text-[#25D366]">
                        <MessageCircle className="size-5" />
                      </span>
                    </div>
                    <a
                      href={`https://wa.me/55${atividade.whatsapp.replace(/\D/g, '')}?text=Olá,%20${atividade.cliente}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-semibold text-white transition-all hover:bg-[#25D366]/95 active:scale-[0.98] shadow-sm text-center"
                    >
                      <MessageCircle className="size-4" strokeWidth={2} />
                      Abrir WhatsApp
                    </a>
                  </div>
                )}

                {atividade.tipo === 'visita' && (
                  <div className="mt-6 rounded-2xl border border-border bg-card p-4 shadow-sm">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        <MapPin className="size-3.5" />
                        Roteiro de visita
                      </h3>
                      {atividade.imoveisVisitados && atividade.imoveisVisitados.length > 0 && (
                        <span className="font-mono text-xs font-bold text-primary">
                          {Object.values(visitadosLocais).filter(Boolean).length} / {atividade.imoveisVisitados.length}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-3">
                      {atividade.imoveisVisitados?.map((imv, idx) => (
                        <div key={imv.id} className="flex flex-col gap-2 rounded-xl bg-muted/50 p-3">
                          <div className="flex items-start gap-3">
                            <button
                              type="button"
                              onClick={() => setVisitadosLocais(prev => ({ ...prev, [imv.id]: !prev[imv.id] }))}
                              className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border transition-colors ${visitadosLocais[imv.id] ? 'bg-primary border-primary text-primary-foreground' : 'border-input bg-background'
                                }`}
                            >
                              {visitadosLocais[imv.id] && <CheckCircle2 className="size-3.5" />}
                            </button>
                            <div className="flex-1">
                              <p className={`text-sm font-semibold ${visitadosLocais[imv.id] ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                                {imv.nome}
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5">{imv.endereco}</p>
                            </div>
                          </div>
                          <div className="ml-8 flex items-center justify-between">
                            <a
                              href={`https://maps.google.com/?q=${encodeURIComponent(imv.endereco)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex w-fit items-center gap-1.5 rounded-lg bg-background px-2.5 py-1.5 text-xs font-semibold text-primary shadow-sm border border-border hover:bg-muted active:scale-95 transition-all"
                            >
                              <MapPin className="size-3" />
                              Navegar até o local
                            </a>
                            {atividade.imoveisVisitados && atividade.imoveisVisitados.length > 1 && (
                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleReorder(idx, 'up')}
                                  disabled={idx === 0}
                                  className="flex size-7 items-center justify-center rounded-lg border border-border bg-background shadow-sm hover:bg-muted disabled:opacity-50 disabled:active:scale-100 active:scale-95 transition-all"
                                >
                                  <ArrowUp className="size-3.5 text-muted-foreground" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleReorder(idx, 'down')}
                                  disabled={idx === atividade.imoveisVisitados!.length - 1}
                                  className="flex size-7 items-center justify-center rounded-lg border border-border bg-background shadow-sm hover:bg-muted disabled:opacity-50 disabled:active:scale-100 active:scale-95 transition-all"
                                >
                                  <ArrowDown className="size-3.5 text-muted-foreground" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                      {!buscandoImovel ? (
                        <button
                          type="button"
                          onClick={() => setBuscandoImovel(true)}
                          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-primary/40 bg-primary/5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/10 active:scale-[0.98]"
                        >
                          <Search className="size-4" />
                          Buscar e anexar outro imóvel
                        </button>
                      ) : (
                        <div className="flex flex-col gap-2 rounded-xl border border-border bg-background p-3 shadow-sm">
                          <div className="flex items-center gap-2 border-b border-border pb-2">
                            <Search className="size-4 text-muted-foreground" />
                            <input
                              type="text"
                              autoFocus
                              placeholder="Código, bairro ou tipo..."
                              value={buscaImovelTexto}
                              onChange={(e) => setBuscaImovelTexto(e.target.value)}
                              className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                            />
                            <button type="button" onClick={() => { setBuscandoImovel(false); setBuscaImovelTexto(''); }} className="p-1 text-muted-foreground hover:text-foreground">
                              <X className="size-4" />
                            </button>
                          </div>
                          {buscaImovelTexto && (
                            <div className="mt-1 flex max-h-40 flex-col overflow-y-auto rounded-lg">
                              {imoveis
                                .filter(i =>
                                  i.codigo.toLowerCase().includes(buscaImovelTexto.toLowerCase()) ||
                                  i.bairro.toLowerCase().includes(buscaImovelTexto.toLowerCase()) ||
                                  i.titulo.toLowerCase().includes(buscaImovelTexto.toLowerCase()) ||
                                  i.tipoImovel.toLowerCase().includes(buscaImovelTexto.toLowerCase())
                                )
                                .filter(i => !atividade.imoveisVisitados?.find(v => v.id === i.id))
                                .map(imv => (
                                  <button
                                    key={imv.id}
                                    type="button"
                                    onClick={() => {
                                      if (!atividade.imoveisVisitados) atividade.imoveisVisitados = [];
                                      atividade.imoveisVisitados.push({
                                        id: imv.id,
                                        nome: `${imv.tipoImovel} em ${imv.bairro}`,
                                        visitado: false,
                                        endereco: imv.enderecoCompleto || ''
                                      });
                                      setVisitadosLocais(prev => ({ ...prev, [imv.id]: false }));
                                      setBuscandoImovel(false);
                                      setBuscaImovelTexto('');
                                    }}
                                    className="flex flex-col border-b border-border py-2 text-left hover:bg-muted last:border-0"
                                  >
                                    <span className="text-xs font-semibold text-foreground">{imv.codigo} - {imv.tipoImovel} em {imv.bairro}</span>
                                    <span className="text-[10px] text-muted-foreground">{imv.preco}</span>
                                  </button>
                                ))}
                              {imoveis.filter(i =>
                                i.codigo.toLowerCase().includes(buscaImovelTexto.toLowerCase()) ||
                                i.bairro.toLowerCase().includes(buscaImovelTexto.toLowerCase()) ||
                                i.titulo.toLowerCase().includes(buscaImovelTexto.toLowerCase()) ||
                                i.tipoImovel.toLowerCase().includes(buscaImovelTexto.toLowerCase())
                              ).length === 0 && (
                                  <div className="p-3 text-center text-xs text-muted-foreground">Nenhum imóvel encontrado</div>
                                )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

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
                  <div className="flex gap-2 mb-3">
                    <button type="button" onClick={() => setEmojiFeedback('ruim')} className={`flex-1 flex flex-col items-center justify-center gap-1 p-2 rounded-xl border transition-colors ${emojiFeedback === 'ruim' ? 'border-red-500 bg-red-50 text-red-700' : 'border-border bg-card hover:bg-muted'}`}>
                      <span className="text-2xl">👎</span>
                      <span className="text-[10px] font-semibold uppercase tracking-wide">Ruim</span>
                    </button>
                    <button type="button" onClick={() => setEmojiFeedback('neutra')} className={`flex-1 flex flex-col items-center justify-center gap-1 p-2 rounded-xl border transition-colors ${emojiFeedback === 'neutra' ? 'border-amber bg-amber/10 text-[#8a5a1e]' : 'border-border bg-card hover:bg-muted'}`}>
                      <span className="text-2xl">😐</span>
                      <span className="text-[10px] font-semibold uppercase tracking-wide">Neutra</span>
                    </button>
                    <button type="button" onClick={() => setEmojiFeedback('boa')} className={`flex-1 flex flex-col items-center justify-center gap-1 p-2 rounded-xl border transition-colors ${emojiFeedback === 'boa' ? 'border-green-500 bg-green-50 text-green-700' : 'border-border bg-card hover:bg-muted'}`}>
                      <span className="text-2xl">👍</span>
                      <span className="text-[10px] font-semibold uppercase tracking-wide">Boa</span>
                    </button>
                  </div>
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

                {atividade.tipo === 'visita' && !atividade.concluida && onGerarTermo && (
                  <div className="mt-6 mb-2">
                    <button
                      type="button"
                      onClick={() => onGerarTermo(atividade.id)}
                      className="flex w-full h-12 items-center justify-center gap-2 rounded-2xl bg-amber/10 text-[#8a5a1e] text-sm font-semibold transition-transform hover:bg-amber/20 active:scale-95 border border-amber/20"
                    >
                      <DocumentIcon className="size-4.5" />
                      Gerar Termo de Visita
                    </button>
                  </div>
                )}

                {remarcando ? (
                  <div className="mt-6 flex flex-col gap-4 animate-in fade-in duration-200">
                    <h3 className="text-sm font-semibold text-foreground">Remarcar atividade</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-muted-foreground">Nova Data</label>
                        <input
                          type="date"
                          value={novaData}
                          onChange={(e) => setNovaData(e.target.value)}
                          className="h-12 w-full rounded-xl border border-border bg-card px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-muted-foreground">Nova Hora</label>
                        <input
                          type="time"
                          value={novaHora}
                          onChange={(e) => setNovaHora(e.target.value)}
                          className="h-12 w-full rounded-xl border border-border bg-card px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <button
                        type="button"
                        onClick={() => setRemarcando(false)}
                        className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-border bg-background text-sm font-semibold text-foreground transition-colors hover:bg-muted active:scale-95"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={handleRemarcar}
                        className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-primary text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:bg-primary/90 active:scale-95"
                      >
                        <CheckCircle2 className="size-4.5" />
                        Salvar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRemarcando(true)}
                      className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-border bg-background text-sm font-semibold text-foreground transition-colors hover:bg-muted active:scale-95"
                    >
                      <Calendar className="size-4.5" />
                      Remarcar
                    </button>
                    <button
                      type="button"
                      onClick={handleConcluir}
                      className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-primary text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:bg-primary/90 active:scale-95"
                    >
                      <CheckCircle2 className="size-4.5" />
                      Concluir
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      {/* Calling Screen overlay (simulated) */}
      {mostrarLigacao && (
        <div className="absolute inset-0 z-[100] bg-zinc-900 flex flex-col justify-between rounded-t-3xl sm:rounded-3xl animate-in fade-in slide-in-from-bottom">
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="mb-8 flex size-24 items-center justify-center rounded-full bg-zinc-850 text-4xl text-zinc-300 font-bold border border-zinc-700 shadow-xl">
              {atividade.cliente.substring(0, 2).toUpperCase()}
            </div>
            <h2 className="text-2xl font-serif font-semibold text-white mb-2">{atividade.cliente}</h2>
            <p className="text-zinc-400 font-medium animate-pulse">Chamando...</p>
            <p className="text-zinc-500 text-sm mt-1">{atividade.telefone}</p>
          </div>
          <div className="p-10 flex items-center justify-center gap-8 pb-16">
            <button type="button" className="flex size-14 items-center justify-center rounded-full bg-zinc-800 text-white transition-transform active:scale-90 border border-zinc-700">
              <Mic className="size-6" />
            </button>
            <button 
              type="button" 
              onClick={() => setMostrarLigacao(false)}
              className="flex size-16 items-center justify-center rounded-full bg-red-500 text-white transition-transform active:scale-90 shadow-lg shadow-red-500/20"
            >
              <PhoneOff className="size-7" />
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}
