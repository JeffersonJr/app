'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  ArrowLeft, Bath, BedDouble, Building2, Car, MapPin, Search, Share2, Plus,
  Check, Phone, MessageCircle, Bot, PenLine, X, Mic, PhoneOff, CheckCircle2, ChevronRight
} from 'lucide-react'
import type { Empreendimento } from '@/lib/empreendimentos-data'
import { IAUpsellPage } from '@/components/app/ia-upsell-page'
import { FormNovaAtividade } from '@/components/app/form-nova-atividade'
import { Calendar } from 'lucide-react'
import { atendimentos } from '@/lib/app-data'
import { FormNovoLead } from '@/components/app/form-novo-lead'

export function EmpreendimentoDetail({ emp, onBack }: { emp: Empreendimento; onBack: () => void }) {
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [mostrarUpsell, setMostrarUpsell] = useState(false)
  const [upsellSucesso, setUpsellSucesso] = useState(false)
  const [mostrarWhatsappModal, setMostrarWhatsappModal] = useState(false)
  const [msgWhatsapp, setMsgWhatsapp] = useState(`Olá ${emp.contatos?.[0]?.nome}, tudo bem?\nGostaria de saber mais sobre o ${emp.nome}.`)
  const [mostrarLigacao, setMostrarLigacao] = useState(false)
  const [mostrarAgendamento, setMostrarAgendamento] = useState(false)
  const [buscaLeadShare, setBuscaLeadShare] = useState('')
  const [mostrarNovoLead, setMostrarNovoLead] = useState(false)
  const [novoLeadDefaultName, setNovoLeadDefaultName] = useState('')
  const [mostrarCronogramaCompleto, setMostrarCronogramaCompleto] = useState(false)

  function handleShare(leadName: string) {
    setShowShareMenu(false)
    setToastMessage(`Empreendimento enviado para ${leadName}!`)
    setTimeout(() => setToastMessage(''), 3000)
  }

  const clientesCompativeis = atendimentos.filter(a => {
    if (!a.perfil) return false
    if (a.perfil.cidades && a.perfil.cidades.length > 0 && emp.cidade && !a.perfil.cidades.includes(emp.cidade)) return false
    return true
  }).slice(0, 3)

  const statusColor =
    emp.status === 'Lançamento' ? 'bg-primary/90 text-white' :
      emp.status === 'Em Obras' ? 'bg-amber/90 text-ink' :
        'bg-teal-mid/90 text-white'

  return (
    <>
      {toastMessage && (
        <div className="absolute top-[calc(1rem+env(safe-area-inset-top))] left-1/2 -translate-x-1/2 z-[100] px-4 py-2 rounded-full bg-teal-mid text-white text-sm font-semibold shadow-lg whitespace-nowrap animate-in fade-in slide-in-from-top-5">
          <CheckCircle2 className="size-4 inline-block mr-1.5 align-text-bottom" />
          {toastMessage}
        </div>
      )}

      <div className="absolute inset-0 z-40 bg-background flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex-1 overflow-y-auto pb-28">
          <div className="relative aspect-[4/3] shrink-0">
            <Image
              src={emp.foto || '/placeholder.svg'}
              alt={`Foto do empreendimento: ${emp.nome}`}
              fill
              className="object-cover"
              sizes="(max-width: 480px) 100vw, 420px"
              priority
            />
            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 pt-[calc(1rem+env(safe-area-inset-top))]">
              <button
                onClick={onBack}
                type="button"
                className="flex size-10 items-center justify-center rounded-full bg-teal-shadow/60 text-white backdrop-blur-sm transition-transform active:scale-95"
              >
                <ArrowLeft className="size-5" />
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowShareMenu(true)}
                  aria-label="Compartilhar"
                  className="flex size-10 items-center justify-center rounded-full bg-teal-shadow/60 text-white backdrop-blur-sm transition-brand active:scale-95"
                >
                  <Share2 className="size-5" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>

          <div className="relative -mt-6 rounded-t-3xl bg-background px-5 pt-6 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {emp.codigo} · {emp.status}
                </p>
                <h1 className="mt-1 font-serif text-xl font-semibold text-foreground text-balance">
                  {emp.nome}
                </h1>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="size-4" strokeWidth={1.5} />
                  {emp.bairro}, {emp.cidade}
                </p>
              </div>
            </div>

            <p className="mt-4 text-[10px] uppercase tracking-wide text-muted-foreground">A partir de</p>
            <p className="font-mono text-2xl font-semibold text-primary">{emp.precoMin}</p>

            <div className="mt-5 grid grid-cols-4 gap-2 mb-6">
              <div className="flex flex-col items-center gap-1 rounded-2xl border border-border bg-card p-3">
                <BedDouble className="size-5 text-primary" strokeWidth={1.5} />
                <span className="font-mono text-sm font-medium text-foreground">{emp.minDorms === emp.maxDorms ? emp.minDorms : `${emp.minDorms}-${emp.maxDorms}`}</span>
                <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Dorms</span>
              </div>
              <div className="flex flex-col items-center gap-1 rounded-2xl border border-border bg-card p-3">
                <Bath className="size-5 text-primary" strokeWidth={1.5} />
                <span className="font-mono text-sm font-medium text-foreground">{emp.minSuites === emp.maxSuites ? emp.minSuites : `${emp.minSuites}-${emp.maxSuites}`}</span>
                <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Suítes</span>
              </div>
              <div className="flex flex-col items-center gap-1 rounded-2xl border border-border bg-card p-3">
                <Car className="size-5 text-primary" strokeWidth={1.5} />
                <span className="font-mono text-sm font-medium text-foreground">{emp.minVagas === emp.maxVagas ? emp.minVagas : `${emp.minVagas}-${emp.maxVagas}`}</span>
                <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Vagas</span>
              </div>
              <div className="flex flex-col items-center gap-1 rounded-2xl border border-border bg-card p-3">
                <Building2 className="size-5 text-primary" strokeWidth={1.5} />
                <span className="font-mono text-sm font-medium text-foreground">{emp.unidades}</span>
                <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Unid.</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-serif text-lg font-semibold text-foreground mb-2">Sobre o Empreendimento</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{emp.descricao}</p>
            </div>

            {/* Torres e Plantas */}
            {emp.torres && emp.torres.length > 0 && (
              <div className="mb-6">
                <h3 className="font-serif text-lg font-semibold text-foreground mb-3">Plantas e Valores</h3>
                <div className="flex flex-col gap-3">
                  {emp.torres.map((torre, tIdx) => (
                    <div key={tIdx} className="rounded-2xl border border-border bg-card p-4">
                      <div className="flex items-center justify-between mb-3 border-b border-border pb-3">
                        <p className="font-semibold text-foreground">{torre.nome}</p>
                        <span className="rounded-full bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground uppercase tracking-widest">{torre.status}</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        {torre.plantas.map((planta, pIdx) => (
                          <div key={pIdx} className="flex flex-col rounded-xl bg-muted/30 p-3">
                            <div className="flex justify-between items-center mb-2">
                              <p className="text-sm font-semibold text-foreground">{planta.nome} ({planta.areaUtil}m²)</p>
                              <p className="font-mono text-sm font-bold text-primary">{planta.valor}</p>
                            </div>
                            <div className="flex flex-wrap gap-2 text-[10px] text-muted-foreground">
                              <span className="rounded bg-background px-1.5 py-0.5 border border-border">Tipo: {planta.tipo}</span>
                              <span className="rounded bg-background px-1.5 py-0.5 border border-border">{planta.quartos} dorms</span>
                              <span className="rounded bg-background px-1.5 py-0.5 border border-border">{planta.banheiros} banheiros</span>
                              <span className="rounded bg-background px-1.5 py-0.5 border border-border">{planta.vagasGaragem} vagas</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Infraestrutura */}
            <div className="mb-8">
              <h3 className="font-serif text-lg font-semibold text-foreground mb-3">Lazer e Infraestrutura</h3>
              <div className="flex flex-wrap gap-2">
                {emp.caracteristicas.map((c) => (
                  <span key={c} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Cronograma de Obras */}
            {emp.cronograma && emp.cronograma.length > 0 && (
              <div className="mb-8">
                <h3 className="font-serif text-lg font-semibold text-foreground mb-3">Cronograma de Obras</h3>
                <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4">
                  {(mostrarCronogramaCompleto ? emp.cronograma : emp.cronograma.slice(0, 4)).map((etapa, idx) => (
                    <div key={idx} className="flex flex-col gap-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-foreground">{etapa.etapa}</span>
                        <span className={etapa.porcentagem === 100 ? 'text-teal-500 font-bold' : 'text-primary'}>{etapa.porcentagem}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div className="h-full bg-primary transition-all" style={{ width: `${etapa.porcentagem}%` }} />
                      </div>
                    </div>
                  ))}
                  {emp.cronograma.length > 4 && !mostrarCronogramaCompleto && (
                    <button type="button" onClick={() => setMostrarCronogramaCompleto(true)} className="mt-2 text-xs font-semibold text-primary text-center hover:underline">Ver cronograma completo</button>
                  )}
                  {mostrarCronogramaCompleto && (
                    <button type="button" onClick={() => setMostrarCronogramaCompleto(false)} className="mt-2 text-xs font-semibold text-primary text-center hover:underline">Ocultar cronograma completo</button>
                  )}
                </div>
              </div>
            )}

            {/* Incorporadora, Construtora e Administradora */}
            <div className="mt-6 border-t border-border/50 pt-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Incorporadora, Construtora e Administradora</h3>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 rounded-2xl border border-border p-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                    {emp.construtora.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground text-sm truncate">{emp.construtora}</h4>
                    <p className="text-xs text-muted-foreground truncate">Construtora principal</p>
                  </div>
                </div>

                {emp.contatos?.map((contato, idx) => (
                  <div key={idx} className="flex items-center gap-3 rounded-2xl border border-border p-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-teal-shadow text-white font-semibold">
                      {contato.nome.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground text-sm truncate">{contato.nome}</h4>
                      <p className="text-xs text-muted-foreground truncate">{contato.cargo}</p>
                    </div>
                    <button
                      onClick={() => { setMsgWhatsapp(`Olá ${contato.nome}, tudo bem?\nSou da imobiliária e gostaria de falar sobre o ${emp.nome}.`); setMostrarWhatsappModal(true) }}
                      className="flex size-8 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]"
                    >
                      <MessageCircle className="size-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {clientesCompativeis.length > 0 && (
              <div className="mt-6 border-t border-border/50 pt-6">
                <h3 className="text-sm font-semibold text-foreground mb-4">Clientes com perfil compatível</h3>
                <ul className="flex flex-col gap-3">
                  {clientesCompativeis.map(cliente => (
                    <li key={cliente.id} className="flex items-center justify-between rounded-2xl border border-border bg-background p-3 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                          {cliente.iniciais}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{cliente.nome}</p>
                          <p className="text-xs text-muted-foreground">{cliente.etapa}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleShare(cliente.nome)}
                        className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-brand hover:text-primary active:scale-95"
                      >
                        <Share2 className="size-4" strokeWidth={1.5} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </div>
      </div>

      <div className="shrink-0 bg-background border-t border-border p-5 pb-[calc(5.25rem+env(safe-area-inset-bottom))] flex flex-col gap-3">
        <button type="button" onClick={() => setMostrarAgendamento(true)} className="w-full flex items-center justify-center gap-2.5 h-14 rounded-full bg-teal-mid text-white text-sm font-semibold shadow-xl shadow-teal-mid/30 transition-transform active:scale-[0.98]">
          <Calendar className="size-5" strokeWidth={2.5} />
          Visitar com cliente
        </button>
        <button type="button" onClick={() => setShowShareMenu(true)} className="w-full flex items-center justify-center gap-2.5 h-14 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold shadow-sm transition-transform active:scale-[0.98]">
          <Share2 className="size-5" strokeWidth={2.5} />
          Compartilhar com Lead
        </button>
      </div>

      {/* Modal Agendamento */}
      {mostrarAgendamento && (
        <div className="absolute inset-0 z-[60] flex flex-col justify-end pointer-events-auto">
          <button type="button" onClick={() => setMostrarAgendamento(false)} className="absolute inset-0 bg-teal-shadow/50 backdrop-blur-[2px]" />
          <div className="relative rounded-t-3xl bg-card p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-2xl animate-in slide-in-from-bottom duration-200 max-h-[90dvh] overflow-y-auto">
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-fog" />
            <FormNovaAtividade
              defaultImoveis={[{ ...emp, titulo: emp.nome, enderecoCompleto: `${emp.bairro}, ${emp.cidade}` }]}
              onClose={() => setMostrarAgendamento(false)}
              onSalvar={() => {
                setMostrarAgendamento(false)
                setToastMessage('Visita agendada com sucesso!')
                setTimeout(() => setToastMessage(''), 3000)
              }}
            />
          </div>
        </div>
      )}

      {/* Share Bottom Sheet */}
      {showShareMenu && (
        <>
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] animate-in fade-in duration-200 cursor-pointer" onClick={() => setShowShareMenu(false)} />
          <div className="fixed bottom-0 left-0 right-0 bg-card rounded-t-3xl shadow-2xl z-[100] animate-in slide-in-from-bottom-full duration-300 pb-[env(safe-area-inset-bottom)]">
            <div className="flex justify-center pt-3 pb-2">
              <div className="h-1.5 w-12 rounded-full bg-border" />
            </div>
            <div className="px-6 py-4">
              <h3 className="text-lg font-serif font-semibold text-foreground mb-4">Compartilhar com qual Lead?</h3>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar lead..."
                  value={buscaLeadShare}
                  onChange={(e) => setBuscaLeadShare(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <ul className="flex flex-col gap-3 max-h-48 overflow-y-auto">
                {atendimentos
                  .filter(a => a.nome.toLowerCase().includes(buscaLeadShare.toLowerCase()) || (a.telefone && a.telefone.includes(buscaLeadShare)))
                  .slice(0, 5)
                  .map((lead) => (
                  <li key={lead.id}>
                    <button type="button" onClick={() => handleShare(lead.nome)} className="w-full flex items-center justify-between p-4 rounded-2xl bg-muted/40 border border-transparent hover:border-primary/20 active:bg-muted transition-colors text-left">
                      <div>
                        <p className="font-semibold text-foreground text-sm">{lead.nome}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{lead.telefone}</p>
                      </div>
                      <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Share2 className="size-4" strokeWidth={2} />
                      </div>
                    </button>
                  </li>
                ))}
                {atendimentos.filter(a => a.nome.toLowerCase().includes(buscaLeadShare.toLowerCase()) || (a.telefone && a.telefone.includes(buscaLeadShare))).length === 0 && (
                  <div className="flex flex-col items-center justify-center py-4 gap-3">
                    <p className="text-center text-sm text-muted-foreground">Nenhum lead encontrado.</p>
                    {buscaLeadShare.trim().length > 2 && (
                      <button
                        type="button"
                        onClick={() => {
                          setNovoLeadDefaultName(buscaLeadShare.trim())
                          setMostrarNovoLead(true)
                        }}
                        className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-brand active:scale-95"
                      >
                        <Plus className="size-4" strokeWidth={2.5} />
                        Cadastrar "{buscaLeadShare}"
                      </button>
                    )}
                  </div>
                )}
              </ul>
              <button type="button" onClick={() => handleShare('WhatsApp (Outro)')} className="mt-4 w-full flex items-center justify-center gap-2 h-12 rounded-2xl border border-border bg-background text-sm font-semibold text-foreground active:bg-muted">
                <MessageCircle className="size-4" /> Enviar para WhatsApp não salvo
              </button>
            </div>
          </div>

          {/* Modal Novo Lead sobre o ShareMenu */}
          {mostrarNovoLead && (
            <>
              <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[110] cursor-pointer" onClick={() => setMostrarNovoLead(false)} />
              <div className="fixed inset-x-4 top-10 bottom-4 bg-card rounded-3xl shadow-2xl z-[110] animate-in fade-in zoom-in-95 overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto p-5">
                  <FormNovoLead 
                    defaultName={novoLeadDefaultName}
                    onClose={() => setMostrarNovoLead(false)}
                    onSalvar={(id) => {
                      const lead = atendimentos.find(a => a.id === id)
                      if (lead) {
                        handleShare(lead.nome)
                      }
                      setMostrarNovoLead(false)
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </>
      )}

      {/* WhatsApp Modal */}
      {mostrarWhatsappModal && (
        <div className="absolute inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm cursor-pointer" onClick={() => setMostrarWhatsappModal(false)} />
          <div className="relative w-full max-w-sm rounded-3xl bg-card p-5 shadow-2xl border border-border animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
                  <MessageCircle className="size-4" />
                </div>
                <h3 className="font-semibold text-foreground">Mensagem WhatsApp</h3>
              </div>
              <button type="button" onClick={() => setMostrarWhatsappModal(false)} className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground">
                <X className="size-4" />
              </button>
            </div>

            <textarea
              value={msgWhatsapp}
              onChange={(e) => setMsgWhatsapp(e.target.value)}
              className="w-full h-32 resize-none rounded-2xl border border-border bg-background p-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#25D366]/50 mb-4"
              placeholder="Digite sua mensagem..."
            />

            <button
              type="button"
              onClick={() => {
                setMostrarWhatsappModal(false)
                setToastMessage('Redirecionando para o WhatsApp...')
                setTimeout(() => setToastMessage(''), 3000)
              }}
              className="w-full flex items-center justify-center gap-2 h-12 rounded-2xl bg-[#25D366] text-white font-semibold text-sm transition-transform active:scale-[0.98]"
            >
              Abrir WhatsApp
            </button>
          </div>
        </div>
      )}
    </>
  )
}
