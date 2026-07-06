'use client'

import { Bell, X } from 'lucide-react'

type Notificacao = {
  id: string
  tipo: 'visita' | 'lead' | 'albert' | 'prazo' | 'sistema'
  titulo: string
  descricao: string
  hora: string
  lida: boolean
  linkAtendimentoId?: string
}

const notificacoes: Notificacao[] = [
  { id: 'n1', tipo: 'visita', titulo: 'Visita em 1 hora', descricao: 'Paulo Henrique — Cobertura Vila Nova às 15:00', hora: '14:00', lida: false, linkAtendimentoId: 'l4' },
  { id: 'n2', tipo: 'lead', titulo: 'Novo lead chegou', descricao: 'Juliana Martins via Portal VivaReal — Apto Moema', hora: '13:45', lida: false, linkAtendimentoId: 'l5' },
  { id: 'n3', tipo: 'albert', titulo: 'Albert lembrou você', descricao: 'Fernanda Lima não recebe contato há 3 dias', hora: '10:30', lida: false, linkAtendimentoId: 'l3' },
  { id: 'n4', tipo: 'prazo', titulo: 'Prazo se aproximando', descricao: 'Proposta de André Souza vence amanhã', hora: '09:00', lida: true, linkAtendimentoId: 'l6' },
  { id: 'n5', tipo: 'sistema', titulo: 'Follow-up pendente', descricao: 'Ricardo Almeida — última interação há 2 dias', hora: 'Ontem', lida: true, linkAtendimentoId: 'l2' },
]

const emojiTipo: Record<Notificacao['tipo'], string> = {
  visita: '🏠',
  lead: '🎯',
  albert: '🤖',
  prazo: '⏰',
  sistema: '📣',
}

export function NotificacoesPanel({ onClose, onVerAtendimento }: { onClose: () => void; onVerAtendimento?: (id: string) => void }) {
  const naoLidas = notificacoes.filter((n) => !n.lida).length

  return (
    <div className="absolute inset-0 z-50 flex flex-col">
      <button
        type="button"
        aria-label="Fechar notificações"
        onClick={onClose}
        className="absolute inset-0 bg-teal-shadow/40 backdrop-blur-[2px]"
      />
      <div className="relative mt-auto flex flex-col rounded-t-3xl bg-card shadow-2xl animate-in slide-in-from-bottom duration-200 max-h-[85dvh]">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="h-1 w-10 rounded-full bg-fog" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Bell className="size-5 text-primary" strokeWidth={1.5} />
            <h2 className="font-serif text-xl font-semibold text-foreground">Notificações</h2>
            {naoLidas > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-amber font-mono text-[11px] font-semibold text-ink">
                {naoLidas}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground"
          >
            <X className="size-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* Lista */}
        <ul className="flex flex-col divide-y divide-border overflow-y-auto pb-[calc(1rem+env(safe-area-inset-bottom))]">
          {notificacoes.map((n) => (
            <li key={n.id}>
              <button
                type="button"
                onClick={() => {
                  if (n.linkAtendimentoId) {
                    onVerAtendimento?.(n.linkAtendimentoId)
                  }
                  onClose()
                }}
                className={`flex w-full items-start gap-4 px-6 py-4 text-left transition-brand active:bg-muted/50 ${n.lida ? 'opacity-60' : ''}`}
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-lg">
                  {emojiTipo[n.tipo]}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{n.titulo}</p>
                    {!n.lida && <span className="size-2 rounded-full bg-amber shrink-0" />}
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{n.descricao}</p>
                </div>
                <span className="shrink-0 font-mono text-[10px] text-muted-foreground">{n.hora}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
