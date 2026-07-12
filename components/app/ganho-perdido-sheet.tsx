'use client'

import { useState } from 'react'
import { CheckCircle2, Frown, Trophy, X, PartyPopper } from 'lucide-react'
import confetti from 'canvas-confetti'

const MOTIVOS_PERDA = [
  'Cliente fora do perfil',
  'Desistiu da negociação',
  'Fechou com a concorrência',
  'Inacessível',
  'Não demonstrou mais interesse',
  'Outros',
  'Parou de responder',
  'Sem prioridade de negociação',
]

export function GanhoPerdidoSheet({
  tipo,
  onClose,
  onConfirm,
}: {
  tipo: 'ganho' | 'perdido'
  onClose: () => void
  onConfirm: (feedback: string) => void
}) {
  const [feedback, setFeedback] = useState('')
  const [motivoPerda, setMotivoPerda] = useState('')
  const [sucesso, setSucesso] = useState(false)

  const isGanho = tipo === 'ganho'

  function handleSubmit() {
    if (isGanho && !feedback.trim()) return
    if (!isGanho && !motivoPerda) return
    
    setSucesso(true)
    
    if (isGanho) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }

    const finalFeedback = isGanho 
      ? feedback 
      : `[Motivo da Perda: ${motivoPerda}]${feedback.trim() ? ` - ${feedback.trim()}` : ''}`

    setTimeout(() => {
      onConfirm(finalFeedback)
      onClose()
    }, 3000)
  }

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={!sucesso ? onClose : undefined}
      />
      <div className="relative z-50 w-full rounded-t-[2.5rem] bg-card p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-2xl animate-in slide-in-from-bottom duration-300 mx-auto max-w-md">
        <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-border" />
        
        {sucesso ? (
          <div className="flex flex-col items-center justify-center py-10 animate-in zoom-in duration-300">
            {isGanho ? (
              <div className="flex size-20 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4 animate-bounce">
                <PartyPopper className="size-10" />
              </div>
            ) : (
              <div className="flex size-20 items-center justify-center rounded-full bg-muted text-muted-foreground mb-4">
                <CheckCircle2 className="size-10" />
              </div>
            )}
            <h2 className="font-serif text-2xl font-bold text-foreground text-center">
              {isGanho ? 'Parabéns pela venda!' : 'Feedback registrado'}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground text-center max-w-xs">
              {isGanho 
                ? 'Mais um negócio de sucesso fechado. Continue assim!' 
                : 'Oportunidade perdida, mas aprendizado garantido. Vamos para a próxima!'}
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`flex size-12 items-center justify-center rounded-2xl ${isGanho ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {isGanho ? <Trophy className="size-6" /> : <Frown className="size-6" />}
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-foreground leading-tight">
                    {isGanho ? 'Negócio Ganho' : 'Negócio Perdido'}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {isGanho ? 'Registre os detalhes da vitória' : 'Qual foi o motivo da perda?'}
                  </p>
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

            <div className="flex flex-col gap-4">
              {!isGanho && (
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-foreground">
                    Motivo da Perda <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={motivoPerda}
                    onChange={(e) => setMotivoPerda(e.target.value)}
                    className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm font-medium text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="">Selecione o motivo da perda...</option>
                    {MOTIVOS_PERDA.map((motivo) => (
                      <option key={motivo} value={motivo}>
                        {motivo}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-foreground">
                  {isGanho ? 'Observações da Venda' : 'Anotações Extras'}
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder={isGanho ? "Ex: Cliente amou a vista e fechamos o valor cheio!" : "Ex: Cliente achou muito caro e comprou outro... (Opcional)"}
                  className="w-full resize-none rounded-2xl border border-border bg-background p-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary h-28"
                />
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isGanho ? !feedback.trim() : !motivoPerda}
                className={`mt-2 flex h-14 w-full items-center justify-center gap-2 rounded-2xl text-sm font-semibold text-white shadow-lg transition-transform hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:active:scale-100 ${
                  isGanho ? 'bg-green-600 shadow-green-600/20' : 'bg-red-600 shadow-red-600/20'
                }`}
              >
                <CheckCircle2 className="size-5" />
                Confirmar {isGanho ? 'Venda' : 'Perda'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
