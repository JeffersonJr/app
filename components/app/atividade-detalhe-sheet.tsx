'use client'

import { useState } from 'react'
import { Calendar, CheckCircle2, ChevronRight, Clock, MessageSquare, Target, User, X, PartyPopper, Phone, MessageCircle, MapPin } from 'lucide-react'
import { type Atividade, tipoAtividadeConfig } from '@/lib/app-data'
import { useEffect } from 'react'
import confetti from 'canvas-confetti'

export function AtividadeDetalheSheet({
  atividade,
  onClose,
  onVerNegocio,
  onConcluir,
}: {
  atividade: Atividade | null
  onClose: () => void
  onVerNegocio: (clienteNome: string) => void
  onConcluir: (id: string, statusConcluida: boolean, feedback?: string, agendarProxima?: boolean) => void
}) {
  const [feedback, setFeedback] = useState('')
  const [agendarProxima, setAgendarProxima] = useState(false)
  const [remarcando, setRemarcando] = useState(false)
  const [novaData, setNovaData] = useState('')
  const [novaHora, setNovaHora] = useState('')
  const [sucesso, setSucesso] = useState(false)
  const [sucessoRemarcar, setSucessoRemarcar] = useState(false)
  const [visitadosLocais, setVisitadosLocais] = useState<Record<string, boolean>>({})

  useEffect(() => {
    // Reset all state when a new atividade is opened
    setFeedback('')
    setSucesso(false)
    setRemarcando(false)
    setNovaData('')
    setNovaHora('')
    if (atividade?.tipo === 'visita') {
      setAgendarProxima(true)
      const inicialVisitados: Record<string, boolean> = {}
      atividade.imoveisVisitados?.forEach(imv => {
        inicialVisitados[imv.id] = imv.visitado
      })
      setVisitadosLocais(inicialVisitados)
    } else {
      setAgendarProxima(false)
      setVisitadosLocais({})
    }
  }, [atividade?.id])

  if (!atividade) return null

  function handleConcluir() {
    // Save the visited status back to the activity object
    if (atividade?.imoveisVisitados) {
      atividade.imoveisVisitados.forEach(imv => {
        if (visitadosLocais[imv.id]) imv.visitado = true
      })
    }

    setSucesso(true)
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#0d9488', '#14b8a6', '#5eead4']
    })
    setTimeout(() => {
      onConcluir(atividade!.id, true, feedback, agendarProxima)
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
      <div className="relative z-50 w-full rounded-t-[2.5rem] bg-card p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-2xl animate-in slide-in-from-bottom-full duration-300 max-h-[85vh] overflow-y-auto">
        <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-border" />
        
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

        {/* Ação Principal da Atividade (CTA) */}
        {atividade.tipo === 'ligacao' && atividade.telefone && (
          <a
            href={`tel:${atividade.telefone.replace(/\D/g, '')}`}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-500/10 py-3.5 text-sm font-semibold text-indigo-600 transition-colors hover:bg-indigo-500/20 active:scale-[0.98]"
          >
            <Phone className="size-4.5" />
            Ligar para {atividade.telefone}
          </a>
        )}
        {atividade.tipo === 'whatsapp' && atividade.whatsapp && (
          <a
            href={`https://wa.me/55${atividade.whatsapp.replace(/\D/g, '')}?text=Olá,%20${atividade.cliente}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-green-500/10 py-3.5 text-sm font-semibold text-green-600 transition-colors hover:bg-green-500/20 active:scale-[0.98]"
          >
            <MessageCircle className="size-4.5" />
            Enviar WhatsApp
          </a>
        )}

        {/* Múltiplos imóveis para visita */}
        {atividade.tipo === 'visita' && atividade.imoveisVisitados && atividade.imoveisVisitados.length > 0 && (
          <div className="mt-6 rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <MapPin className="size-3.5" />
                Roteiro de visita
              </h3>
              <span className="font-mono text-xs font-bold text-primary">
                {Object.values(visitadosLocais).filter(Boolean).length} / {atividade.imoveisVisitados.length}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {atividade.imoveisVisitados.map((imv) => (
                <div key={imv.id} className="flex flex-col gap-2 rounded-xl bg-muted/50 p-3">
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => setVisitadosLocais(prev => ({ ...prev, [imv.id]: !prev[imv.id] }))}
                      className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border transition-colors ${
                        visitadosLocais[imv.id] ? 'bg-primary border-primary text-primary-foreground' : 'border-input bg-background'
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
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(imv.endereco)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-8 flex w-fit items-center gap-1.5 rounded-lg bg-background px-2.5 py-1.5 text-xs font-semibold text-primary shadow-sm border border-border hover:bg-muted active:scale-95"
                  >
                    <MapPin className="size-3" />
                    Navegar até o local
                  </a>
                </div>
              ))}
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
    </div>
  )
}
