'use client'

import { useState } from 'react'
import { X, PlusCircle, Mic, Loader2 } from 'lucide-react'
import { maskPhone } from '@/lib/masks'
import { atendimentos, perfilVazio } from '@/lib/app-data'

const ORIGENS = [
  'Portal: Zap Imóveis', 'Portal: Viva Real', 'Portal: Olx', 'Outros',
  'Facebook', 'Marketing: Instagram', 'Indicação', 'Porta',
  'Whatsapp', 'Telefone'
] as const

const TEMPERATURAS = ['quente', 'morno', 'frio'] as const

export function FormNovoLead({ onClose, onSalvar, defaultName }: { onClose: () => void, onSalvar?: (id: string) => void, defaultName?: string }) {
  const [nome, setNome] = useState(defaultName || '')
  const [telefones, setTelefones] = useState<{ numero: string, isWhatsapp: boolean }[]>([{ numero: '', isWhatsapp: true }])
  const [emails, setEmails] = useState<string[]>([''])
  const [origem, setOrigem] = useState<(typeof ORIGENS)[number]>('Portal: Zap Imóveis')
  const [temperatura, setTemperatura] = useState<(typeof TEMPERATURAS)[number]>('morno')

  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSimulateAudio = () => {
    setIsListening(true)
    setTimeout(() => {
      setIsListening(false)
      setIsProcessing(true)
      setTimeout(() => {
        setIsProcessing(false)
        setNome('Carlos Mendes')
        setTelefones([{ numero: '(11) 98765-4321', isWhatsapp: true }])
        setEmails(['carlos.mendes@email.com'])
        setOrigem('Whatsapp')
        setTemperatura('quente')
      }, 1500)
    }, 2500)
  }

  function handleSalvar() {
    if (!nome) return
    const novoId = `l${Date.now()}`

    atendimentos.push({
      id: novoId,
      nome: nome,
      iniciais: nome.substring(0, 2).toUpperCase(),
      email: emails[0] || `${nome.toLowerCase().replace(/\s/g, '')}@email.com`,
      emailsAdicionais: emails.slice(1).filter(Boolean),
      telefone: telefones[0]?.numero || '(11) 99999-9999',
      telefonesAdicionais: telefones.slice(1).map(t => t.numero).filter(Boolean),
      whatsappsAdicionais: telefones.filter(t => t.isWhatsapp).map(t => t.numero).filter(Boolean),
      origem: origem,
      etapa: 'qualificando',
      temperatura: temperatura,
      status: 'aberto',
      dataEntrada: new Date().toLocaleDateString('pt-BR'),
      ultimaInteracao: 'Agora',
      interesse: 'A definir',
      valor: '-',
      modo: 'venda',
      funilId: 'principal',
      atividades: [],
      notas: [],
      documentos: [],
      emails: [],
      timeline: [],
      imoveisEnviados: [],
      perfil: { ...perfilVazio },
      albert: { ativo: false, dia: '', hora: '', instrucoes: '' },
    })

    if (onSalvar) {
      onSalvar(novoId)
    }
    onClose()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-serif text-xl font-semibold text-foreground">Novo lead</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-muted-foreground/20 active:scale-95"
        >
          <X className="size-4" strokeWidth={1.5} />
        </button>
      </div>

      {/* AI Audio Banner */}
      <button
        type="button"
        onClick={handleSimulateAudio}
        disabled={isListening || isProcessing}
        className="mb-5 w-full relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/20 p-4 text-left transition-all hover:border-primary/40 active:scale-[0.98] disabled:opacity-90"
      >
        <div className="flex items-center gap-4 relative z-10">
          <div className={`flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 ${isListening ? 'animate-pulse scale-110 bg-red-500 shadow-red-500/30' : ''}`}>
            {isProcessing ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <Mic className="size-5" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm">
              {isListening ? 'Ouvindo...' : isProcessing ? 'Analisando áudio...' : 'Cadastrar por Voz (Albert)'}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {isListening 
                ? 'Fale o nome, telefone e detalhes...' 
                : isProcessing
                ? 'Extraindo dados com IA...'
                : 'Fale com a IA e ela preenche tudo para você.'}
            </p>
          </div>
        </div>
        
        {/* Animated listening wave background */}
        {isListening && (
          <div className="absolute inset-0 z-0 bg-[linear-gradient(90deg,transparent_0%,rgba(239,68,68,0.1)_50%,transparent_100%)] animate-pulse bg-[length:200%_100%]" />
        )}
      </button>

      <div className="flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Nome completo *
          </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: João Silva"
            className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Telefones (até 3) *
          </label>
          <div className="flex flex-col gap-2">
            {telefones.map((tel, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="tel"
                  value={tel.numero}
                  onChange={(e) => {
                    const newTels = [...telefones]
                    newTels[idx].numero = maskPhone(e.target.value)
                    setTelefones(newTels)
                  }}
                  placeholder="(11) 99999-9999"
                  className="h-12 flex-1 rounded-2xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newTels = [...telefones]
                    newTels[idx].isWhatsapp = !newTels[idx].isWhatsapp
                    setTelefones(newTels)
                  }}
                  className={`flex size-12 items-center justify-center rounded-2xl border transition-colors ${tel.isWhatsapp ? 'bg-[#25D366]/10 border-[#25D366]/30 text-[#25D366]' : 'bg-card border-border text-muted-foreground'}`}
                  title={tel.isWhatsapp ? "É WhatsApp" : "Não é WhatsApp"}
                >
                  <span className="font-bold text-[10px] text-center leading-none">WA</span>
                </button>
                {idx > 0 && (
                  <button type="button" onClick={() => setTelefones(telefones.filter((_, i) => i !== idx))} className="flex size-12 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                    <X className="size-4" />
                  </button>
                )}
              </div>
            ))}
            {telefones.length < 3 && (
              <button type="button" onClick={() => setTelefones([...telefones, { numero: '', isWhatsapp: false }])} className="flex items-center gap-2 text-xs font-semibold text-primary mt-1">
                <PlusCircle className="size-3.5" /> Adicionar telefone
              </button>
            )}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            E-mails (até 3)
          </label>
          <div className="flex flex-col gap-2">
            {emails.map((em, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="email"
                  value={em}
                  onChange={(e) => {
                    const newEmails = [...emails]
                    newEmails[idx] = e.target.value
                    setEmails(newEmails)
                  }}
                  placeholder="cliente@email.com"
                  className="h-12 flex-1 rounded-2xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                {idx > 0 && (
                  <button type="button" onClick={() => setEmails(emails.filter((_, i) => i !== idx))} className="flex size-12 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                    <X className="size-4" />
                  </button>
                )}
              </div>
            ))}
            {emails.length < 3 && (
              <button type="button" onClick={() => setEmails([...emails, ''])} className="flex items-center gap-2 text-xs font-semibold text-primary mt-1">
                <PlusCircle className="size-3.5" /> Adicionar e-mail
              </button>
            )}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Origem do lead *
          </label>
          <select
            value={origem}
            onChange={(e) => setOrigem(e.target.value as (typeof ORIGENS)[number])}
            className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring appearance-none"
          >
            {ORIGENS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Temperatura inicial
          </label>
          <div className="flex gap-2">
            {TEMPERATURAS.map((t) => {
              const cores: Record<string, string> = {
                quente: 'bg-amber text-ink',
                morno: 'bg-teal-mid text-white',
                frio: 'bg-slate text-white',
              }
              const labels: Record<string, string> = { quente: '🔥 Quente', morno: '🌡️ Morno', frio: '❄️ Frio' }
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTemperatura(t)}
                  className={`flex-1 rounded-xl py-2 text-xs font-semibold transition-brand ${temperatura === t ? cores[t] : 'border border-border bg-card text-muted-foreground'
                    }`}
                >
                  {labels[t]}
                </button>
              )
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={handleSalvar}
          className="h-12 w-full rounded-2xl bg-primary text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-brand active:scale-[0.98]"
        >
          Adicionar lead
        </button>
      </div>
    </div>
  )
}
