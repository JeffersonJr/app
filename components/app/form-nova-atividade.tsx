'use client'

import { useState } from 'react'
import { Star, X, Search, Check, PlusCircle } from 'lucide-react'
import { type TipoAtividade, tipoAtividadeConfig, atendimentos, perfilVazio } from '@/lib/app-data'

const TIPOS: TipoAtividade[] = ['visita', 'reuniao', 'ligacao', 'prazo', 'pos-venda']

export function FormNovaAtividade({ onClose, onSalvar }: { onClose: () => void, onSalvar?: (atendimentoId: string) => void }) {
  const [tipo, setTipo] = useState<TipoAtividade>('visita')
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [data, setData] = useState('')
  const [hora, setHora] = useState('')
  const [importante, setImportante] = useState(false)
  const [clienteBusca, setClienteBusca] = useState('')
  const [clienteIdSelecionado, setClienteIdSelecionado] = useState('')
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false)
  const [criarClienteAberto, setCriarClienteAberto] = useState(false)
  const [novoTelefone, setNovoTelefone] = useState('')
  const [novoWhatsapp, setNovoWhatsapp] = useState('')
  const [novoEmail, setNovoEmail] = useState('')

  const atendimentosFiltrados = clienteBusca 
    ? atendimentos.filter(a => a.nome.toLowerCase().includes(clienteBusca.toLowerCase()))
    : atendimentos

  function handleSalvar() {
    if (onSalvar && clienteIdSelecionado) {
      onSalvar(clienteIdSelecionado)
    }
    onClose()
  }

  function abrirFormCriar() {
    setCriarClienteAberto(true)
    setMostrarSugestoes(false)
  }

  function handleCriarCliente() {
    const novoId = `c${Date.now()}`
    const novoNome = clienteBusca
    atendimentos.push({
      id: novoId,
      nome: novoNome,
      iniciais: novoNome.substring(0, 2).toUpperCase(),
      email: novoEmail || `${novoNome.toLowerCase().replace(/\s/g, '')}@email.com`,
      telefone: novoTelefone || novoWhatsapp || '(11) 99999-9999',
      origem: 'Novo',
      etapa: 'qualificando',
      temperatura: 'frio',
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
    setClienteIdSelecionado(novoId)
    setClienteBusca(novoNome)
    setCriarClienteAberto(false)
    setNovoTelefone('')
    setNovoWhatsapp('')
    setNovoEmail('')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-serif text-xl font-semibold text-foreground">Nova atividade</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground"
        >
          <X className="size-4" strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {/* Tipo */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Tipo de atividade</label>
          <div className="flex flex-wrap gap-2">
            {TIPOS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTipo(t)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-brand ${
                  tipo === t
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border bg-card text-muted-foreground'
                }`}
              >
                {tipoAtividadeConfig[t].emoji} {tipoAtividadeConfig[t].label}
              </button>
            ))}
          </div>
        </div>

        {/* Título */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Título *</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ex: Visita ao imóvel MS-1042"
            className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Descrição */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Descrição</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows={2}
            placeholder="Detalhes, instruções, observações..."
            className="w-full resize-none rounded-2xl border border-border bg-background p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Cliente */}
        <div className="relative">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Cliente</label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              value={clienteBusca}
              onChange={(e) => {
                setClienteBusca(e.target.value)
                setMostrarSugestoes(true)
                setClienteIdSelecionado('')
              }}
              onFocus={() => setMostrarSugestoes(true)}
              placeholder="Nome do cliente..."
              className="h-12 w-full rounded-2xl border border-border bg-background pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          {mostrarSugestoes && clienteBusca && (
            <div className="absolute top-full mt-2 w-full max-h-48 overflow-y-auto rounded-2xl border border-border bg-card p-2 shadow-xl z-50">
              {atendimentosFiltrados.map(a => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => {
                    setClienteBusca(a.nome)
                    setClienteIdSelecionado(a.id)
                    setMostrarSugestoes(false)
                  }}
                  className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-muted"
                >
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-teal-mid/10 text-xs font-bold text-teal-deep">
                    {a.iniciais}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">{a.nome}</span>
                    <span className="text-[10px] uppercase text-muted-foreground">{a.origem}</span>
                  </div>
                  {clienteIdSelecionado === a.id && <Check className="ml-auto size-4 text-primary" />}
                </button>
              ))}
              {atendimentosFiltrados.length === 0 && clienteBusca && (
                <button
                  type="button"
                  onClick={abrirFormCriar}
                  className="flex w-full items-center gap-3 rounded-xl p-3 text-left hover:bg-muted"
                >
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <PlusCircle className="size-4" strokeWidth={2} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-primary">Criar novo cliente</span>
                    <span className="text-xs text-muted-foreground">Adicionar "{clienteBusca}"</span>
                  </div>
                </button>
              )}
            </div>
          )}

          {/* Mini-formulário de contato do novo cliente */}
          {criarClienteAberto && (
            <div className="mt-3 rounded-2xl border border-primary/30 bg-primary/5 p-4 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-semibold text-foreground">Contatos de <span className="text-primary">{clienteBusca}</span></p>
                <button type="button" onClick={() => setCriarClienteAberto(false)} className="flex size-7 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <X className="size-3.5" strokeWidth={2} />
                </button>
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Telefone</label>
                <input
                  type="tel"
                  value={novoTelefone}
                  onChange={(e) => setNovoTelefone(e.target.value)}
                  placeholder="(11) 99999-9999"
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">WhatsApp</label>
                <input
                  type="tel"
                  value={novoWhatsapp}
                  onChange={(e) => setNovoWhatsapp(e.target.value)}
                  placeholder="(11) 99999-9999"
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">E-mail</label>
                <input
                  type="email"
                  value={novoEmail}
                  onChange={(e) => setNovoEmail(e.target.value)}
                  placeholder="nome@email.com"
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <button
                type="button"
                onClick={handleCriarCliente}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition-brand active:scale-[0.98]"
              >
                <PlusCircle className="size-4" strokeWidth={2} />
                Criar cliente e selecionar
              </button>
            </div>
          )}
        </div>

        {/* Data e Hora */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Data *</label>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="h-12 w-full rounded-2xl border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Hora *</label>
            <input
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className="h-12 w-full rounded-2xl border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Importante */}
        <button
          type="button"
          onClick={() => setImportante(!importante)}
          className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold transition-brand ${
            importante
              ? 'border-amber bg-amber/10 text-[#8a5a1e]'
              : 'border-border bg-card text-muted-foreground'
          }`}
        >
          <Star
            className={`size-5 ${importante ? 'fill-amber text-amber' : 'text-muted-foreground'}`}
            strokeWidth={importante ? 0 : 1.5}
          />
          Marcar como importante
        </button>

        <button
          type="button"
          onClick={handleSalvar}
          disabled={!titulo || !data || !hora || !clienteIdSelecionado}
          className="h-12 w-full rounded-2xl bg-primary text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-brand active:scale-[0.98] disabled:opacity-50"
        >
          Salvar atividade
        </button>
      </div>
    </div>
  )
}
