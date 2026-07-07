'use client'

import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  Mail,
  MessageCircle,
  Phone,
  Search,
  PlusCircle
} from 'lucide-react'
import { clientes, tempConfig, type Cliente, type EventoTimeline } from '@/lib/app-data'
import { RegistrarAtividadeSheet } from '@/components/app/registrar-atividade-sheet'

const segmentos = ['Todos', 'Comprador', 'Locatário', 'Proprietário'] as const

export function ScreenClientes({
  clienteAbertoId,
  onFecharCliente,
  onAbrirCliente,
}: {
  clienteAbertoId: string | null
  onFecharCliente: () => void
  onAbrirCliente: (id: string) => void
}) {
  const [segmento, setSegmento] = useState<(typeof segmentos)[number]>('Todos')
  const [busca, setBusca] = useState('')

  const clienteAberto = clientes.find((c) => c.id === clienteAbertoId) ?? null

  const lista = useMemo(() => {
    return clientes.filter((c) => {
      const matchSeg = segmento === 'Todos' || c.tipo === segmento
      const q = busca.trim().toLowerCase()
      return matchSeg && (!q || c.nome.toLowerCase().includes(q))
    })
  }, [segmento, busca, clientes.length]) // Add clientes.length to trigger re-render on mutation

  function handleCriarCliente() {
    const novoId = `c${Date.now()}`
    const novoNome = busca
    clientes.push({
      id: novoId,
      nome: novoNome,
      iniciais: novoNome.substring(0, 2).toUpperCase(),
      tipo: 'Comprador',
      temperatura: 'frio',
      telefone: '(11) 99999-9999',
      email: `${novoNome.toLowerCase().replace(/\s/g, '')}@email.com`,
      ultimoContato: 'Agora',
      timeline: []
    })
    setBusca('')
    onAbrirCliente(novoId)
  }

  if (clienteAberto) {
    return <ClienteDetail cliente={clienteAberto} onBack={onFecharCliente} />
  }

  return (
    <div className="flex flex-col gap-4 px-5 pt-4 pb-28">
      <header>
        <h1 className="font-serif text-2xl font-semibold text-foreground">Clientes</h1>
        <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {lista.length} contatos
        </p>
      </header>

      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground"
          strokeWidth={1.5}
        />
        <input
          type="search"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar por nome..."
          aria-label="Buscar clientes"
          className="h-12 w-full rounded-2xl border border-border bg-card pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-none -mx-5 px-5">
        {segmentos.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSegmento(s)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-brand ${
              segmento === s
                ? 'bg-primary text-primary-foreground'
                : 'border border-border bg-card text-muted-foreground'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <ul className="flex flex-col gap-2">
        {lista.map((c) => (
          <li key={c.id}>
            <button
              type="button"
              onClick={() => onAbrirCliente(c.id)}
              className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card p-3.5 text-left transition-brand active:scale-[0.98]"
            >
              <span className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 font-serif text-sm font-semibold text-primary">
                {c.iniciais}
                <span
                  className={`absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-card ${tempConfig[c.temperatura].dot}`}
                  aria-label={`Temperatura: ${tempConfig[c.temperatura].label}`}
                />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-foreground">
                  {c.nome}
                </span>
                <span className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="inline-flex rounded-md border border-border bg-muted/50 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-foreground">
                    {c.tipo}
                  </span>
                  <span>·</span>
                  <span>contato {c.ultimoContato}</span>
                </span>
              </span>
              <span className="flex gap-2">
                <span
                  aria-hidden="true"
                  className="flex size-9 items-center justify-center rounded-full bg-muted text-primary"
                >
                  <Phone className="size-4" strokeWidth={1.5} />
                </span>
              </span>
            </button>
          </li>
        ))}
        {lista.length === 0 && busca && (
          <li>
            <button
              type="button"
              onClick={handleCriarCliente}
              className="flex w-full items-center gap-3 rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-3.5 text-left transition-brand hover:bg-primary/10 active:scale-[0.98]"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <PlusCircle className="size-5" strokeWidth={2} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-primary">
                  Criar novo cliente
                </span>
                <span className="block text-xs text-muted-foreground">
                  Adicionar "{busca}"
                </span>
              </span>
            </button>
          </li>
        )}
      </ul>
    </div>
  )
}

function ClienteDetail({ cliente, onBack }: { cliente: Cliente; onBack: () => void }) {
  const [mostrarNovaInteracao, setMostrarNovaInteracao] = useState(false)
  const [localTimeline, setLocalTimeline] = useState(cliente.timeline)

  function handleSalvarInteracao(evt: EventoTimeline) {
    const novo = {
      data: `Hoje, ${evt.hora}`,
      evento: evt.descricao,
      tipo: evt.tipo === 'nota' ? 'nota' : evt.tipo === 'email' ? 'email' : 'atividade'
    }
    setLocalTimeline((prev) => [novo, ...prev])
    setMostrarNovaInteracao(false)
  }

  return (
    <div className="flex flex-col pb-28 md:px-12 md:pt-10 w-full">
      {/* Header imersivo */}
      <div className="bg-primary px-5 pb-6 pt-[calc(1rem+env(safe-area-inset-top))] text-primary-foreground">
        <button
          type="button"
          onClick={onBack}
          aria-label="Voltar para a lista de clientes"
          className="flex size-10 items-center justify-center rounded-full bg-teal-shadow/40 transition-brand active:scale-95"
        >
          <ArrowLeft className="size-5" strokeWidth={1.5} />
        </button>
        <div className="mt-4 flex items-center gap-4">
          <span className="flex size-16 items-center justify-center rounded-full bg-teal-mid/30 font-serif text-xl font-semibold">
            {cliente.iniciais}
          </span>
          <div className="min-w-0">
            <h1 className="truncate font-serif text-xl font-semibold">{cliente.nome}</h1>
            <p className="text-sm text-teal-light">
              {cliente.tipo} ·{' '}
              <span className="uppercase tracking-wide">
                {tempConfig[cliente.temperatura].label}
              </span>
            </p>
          </div>
        </div>

        {/* Ações de contato — 1 toque */}
        <div className="mt-5 grid grid-cols-3 gap-2">
          {[
            { icon: Phone, label: 'Ligar' },
            { icon: MessageCircle, label: 'WhatsApp' },
            { icon: Mail, label: 'E-mail' },
          ].map((acao) => (
            <button
              key={acao.label}
              type="button"
              className="flex flex-col items-center gap-1.5 rounded-2xl bg-teal-shadow/40 py-3 transition-brand active:scale-95"
            >
              <acao.icon className="size-5" strokeWidth={1.5} />
              <span className="text-xs font-medium">{acao.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pt-5">
        <div className="grid grid-cols-1 gap-2 rounded-2xl border border-border bg-card p-4">
          <p className="font-mono text-xs text-muted-foreground">{cliente.telefone}</p>
          <p className="font-mono text-xs text-muted-foreground">{cliente.email}</p>
        </div>

        <h2 className="mt-6 mb-3 font-serif text-lg font-semibold text-foreground">
          Linha do tempo
        </h2>
        <ol className="relative flex flex-col gap-5 border-l border-border pl-5">
          {localTimeline.map((item, i) => (
            <li key={item.evento} className="relative">
              <span
                className={`absolute -left-[26px] top-1 size-2.5 rounded-full ${
                  i === 0 ? 'bg-amber' : 'bg-teal-mid'
                }`}
                aria-hidden="true"
              />
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {item.data}
              </p>
              <p className="mt-0.5 text-sm font-medium text-foreground text-pretty">
                {item.evento}
              </p>
            </li>
          ))}
        </ol>

        <button
          type="button"
          onClick={() => setMostrarNovaInteracao(true)}
          className="mt-6 w-full rounded-2xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-brand active:scale-[0.98]"
        >
          Registrar interação
        </button>
      </div>

      {/* Sheet Registrar Interação */}
      {mostrarNovaInteracao && (
        <RegistrarAtividadeSheet
          onClose={() => setMostrarNovaInteracao(false)}
          onSave={handleSalvarInteracao}
        />
      )}
    </div>
  )
}
