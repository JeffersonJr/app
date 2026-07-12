'use client'

import { useState } from 'react'
import { Star, X, Search, Check, PlusCircle, Bot, Mic, Sparkles, Clock, Loader2 } from 'lucide-react'
import { type TipoAtividade, tipoAtividadeConfig, atendimentos, perfilVazio, imoveis, atividadesHoje } from '@/lib/app-data'
import { useEffect, useRef } from 'react'

const TIPOS: TipoAtividade[] = ['visita', 'reuniao', 'ligacao', 'prazo', 'pos-venda', 'albert']

export function FormNovaAtividade({
  onClose,
  onSalvar,
  defaultClienteId,
  defaultImoveis,
  atividadeInicial,
}: {
  onClose: () => void,
  onSalvar?: (atendimentoId: string, novaAtividade?: any, novaTimeline?: any) => void,
  defaultClienteId?: string,
  defaultImoveis?: any[],
  atividadeInicial?: any,
}) {
  const [aba, setAba] = useState<'nota' | 'atividade' | 'email'>('atividade')
  const [tipo, setTipo] = useState<TipoAtividade>(atividadeInicial?.tipo || 'visita')
  const [titulo, setTitulo] = useState(atividadeInicial?.titulo || '')
  const [descricao, setDescricao] = useState(atividadeInicial?.descricao || '')
  const [data, setData] = useState(atividadeInicial?.data && atividadeInicial.data !== 'Hoje' && atividadeInicial.data !== 'Amanhã' ? atividadeInicial.data : '')
  const [hora, setHora] = useState(atividadeInicial?.hora || '')
  const [importante, setImportante] = useState(atividadeInicial?.importante || false)
  const [emailAssunto, setEmailAssunto] = useState('')
  const [emailCorpo, setEmailCorpo] = useState('')
  const [imoveisSelecionados, setImoveisSelecionados] = useState<any[]>(defaultImoveis || [])
  const [buscaImovel, setBuscaImovel] = useState('')

  // Albert Voice Assist States
  const [albertAberto, setAlbertAberto] = useState(false)
  const [albertStatus, setAlbertStatus] = useState<'idle' | 'gravando' | 'processando' | 'sucesso'>('idle')
  const [albertTextoSimulado, setAlbertTextoSimulado] = useState('')
  const [albertTimer, setAlbertTimer] = useState(0)
  const albertIntervalRef = useRef<any>(null)
  
  useEffect(() => {
    return () => {
      if (albertIntervalRef.current) clearInterval(albertIntervalRef.current)
    }
  }, [])

  const clienteInicial = defaultClienteId ? atendimentos.find(a => a.id === defaultClienteId) : null
  const [clienteBusca, setClienteBusca] = useState(clienteInicial ? clienteInicial.nome : '')
  const [clienteIdSelecionado, setClienteIdSelecionado] = useState(defaultClienteId || '')
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false)
  const [criarClienteAberto, setCriarClienteAberto] = useState(false)
  const [novoTelefone, setNovoTelefone] = useState('')
  const [novoWhatsapp, setNovoWhatsapp] = useState('')
  const [novoEmail, setNovoEmail] = useState('')

  const atendimentosFiltrados = clienteBusca
    ? atendimentos.filter(a => a.nome.toLowerCase().includes(clienteBusca.toLowerCase()))
    : atendimentos

  function startAlbertVoiceCapture() {
    setAlbertStatus('gravando')
    setAlbertTimer(0)
    setAlbertTextoSimulado('')
    
    let count = 0
    albertIntervalRef.current = setInterval(() => {
      count++
      setAlbertTimer(count)
      if (count === 3) {
        clearInterval(albertIntervalRef.current)
        processAlbertVoiceCommand('Ligar para Ricardo Almeida amanhã às 15:00 para falar do contrato de compra e venda')
      }
    }, 1000)
  }

  function processAlbertVoiceCommand(commandText: string) {
    setAlbertStatus('processando')
    setAlbertTextoSimulado(commandText)
    
    setTimeout(() => {
      setAlbertStatus('sucesso')
      setTitulo('Ligar para Ricardo Almeida')
      setDescricao('Conversar sobre o contrato de compra e venda e esclarecer dúvidas pendentes.')
      setTipo('ligacao')
      
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const tomorrowStr = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`
      setData(tomorrowStr)
      setHora('15:00')
      
      setTimeout(() => {
        setAlbertAberto(false)
        setAlbertStatus('idle')
      }, 1500)
    }, 2000)
  }

  function handleSalvar() {
    const clienteIndex = clienteIdSelecionado ? atendimentos.findIndex(a => a.id === clienteIdSelecionado) : -1

    if (clienteIdSelecionado && clienteIndex === -1 && aba !== 'atividade') {
      onClose()
      return
    }

    const now = new Date()
    const hojeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
    const agendadaPara = data || hojeStr
    const asHora = hora || now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

    let novaAtividade: any = null
    let novoTimeline: any = null

    if (aba === 'atividade') {
      if (atividadeInicial) {
        // Modo edição
        novaAtividade = {
          ...atividadeInicial,
          tipo,
          titulo,
          descricao,
          data: agendadaPara,
          hora: asHora,
          importante,
          imoveisVisitados: imoveisSelecionados.map(i => ({ id: i.id, nome: i.titulo || i.nome, visitado: false, endereco: i.enderecoCompleto || `${i.bairro}, ${i.cidade}` }))
        }

        // Atualizar no array global atividadesHoje
        const idxHoje = atividadesHoje.findIndex(a => a.id === atividadeInicial.id)
        if (idxHoje !== -1) atividadesHoje[idxHoje] = novaAtividade

        // Atualizar no cliente
        if (clienteIndex >= 0 && atendimentos[clienteIndex].atividades) {
          const idxCli = atendimentos[clienteIndex].atividades!.findIndex((a: any) => a.id === atividadeInicial.id)
          if (idxCli !== -1) atendimentos[clienteIndex].atividades![idxCli] = novaAtividade
        }
      } else {
        // Modo criação
        novaAtividade = {
          id: `a${Date.now()}`,
          tipo,
          titulo,
          descricao,
          data: agendadaPara,
          hora: asHora,
          importante,
          concluida: false,
          criadoEm: new Date().toISOString(),
          telefone: clienteIndex >= 0 ? atendimentos[clienteIndex].telefone : '',
          whatsapp: clienteIndex >= 0 ? atendimentos[clienteIndex].telefone : '',
          cliente: clienteIndex >= 0 ? atendimentos[clienteIndex].nome : 'Atividade Interna',
          imoveisVisitados: imoveisSelecionados.map(i => ({ id: i.id, nome: i.titulo || i.nome, visitado: false, endereco: i.enderecoCompleto || `${i.bairro}, ${i.cidade}` }))
        }
        if (clienteIndex >= 0) {
          atendimentos[clienteIndex].atividades = [...(atendimentos[clienteIndex].atividades || []), novaAtividade]
          atividadesHoje.push(novaAtividade)
        } else {
          atividadesHoje.push(novaAtividade)
        }
      }

      if (clienteIndex >= 0) {
        novoTimeline = {
          id: `t${Date.now()}`,
          tipo: tipo === 'visita' ? 'visita' : tipo === 'ligacao' ? 'ligacao' : 'atividade',
          titulo: `[${tipoAtividadeConfig[tipo].label}] ${titulo}`,
          descricao: descricao || `Agendada para ${agendadaPara} às ${asHora}`,
          data: agendadaPara,
          icone: null
        } as const
      }
    } else if (aba === 'nota' && clienteIndex >= 0) {
      novoTimeline = {
        id: `t${Date.now()}`,
        tipo: 'nota',
        titulo: 'Nova anotação',
        descricao: descricao,
        data: agendadaPara,
        icone: null
      } as const
    } else if (aba === 'email' && clienteIndex >= 0) {
      novoTimeline = {
        id: `t${Date.now()}`,
        tipo: 'email',
        titulo: `[E-mail] ${emailAssunto}`,
        descricao: emailCorpo,
        data: agendadaPara,
        icone: null
      } as const
    }

    if (novoTimeline && clienteIndex >= 0) {
      atendimentos[clienteIndex].timeline = [novoTimeline, ...(atendimentos[clienteIndex].timeline || [])]
    }

    if (onSalvar) {
      onSalvar(clienteIdSelecionado, novaAtividade, novoTimeline)
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('app-data-updated'))
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
      origem: 'Outros',
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
        <h2 className="font-serif text-xl font-semibold text-foreground">Nova atividade / Registro</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground"
        >
          <X className="size-4" strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex gap-2 rounded-2xl bg-muted p-1 mb-6">
        {(['nota', 'atividade', 'email'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setAba(t)}
            className={`flex-1 rounded-xl py-2 text-xs font-semibold uppercase tracking-wider transition-brand ${aba === t ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground'
              }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {aba === 'atividade' && (
          <>
            {/* Tipo */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Tipo de atividade</label>
              <div className="flex flex-wrap gap-2">
                {TIPOS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTipo(t)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-brand ${tipo === t
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
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Título *</label>
                <button
                  type="button"
                  onClick={() => setAlbertAberto(true)}
                  className="flex items-center gap-1 text-[10px] font-bold text-primary bg-primary/10 hover:bg-primary/20 px-2.5 py-1 rounded-lg transition-all active:scale-95 shadow-sm"
                >
                  <Bot className="size-3.5" />
                  Falar com Albert
                </button>
              </div>
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
          </>
        )}

        {aba === 'nota' && (
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Anotação *</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={4}
              placeholder="Digite sua anotação aqui..."
              className="w-full resize-none rounded-2xl border border-border bg-background p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        )}

        {aba === 'email' && (
          <>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Assunto *</label>
              <input type="text" value={emailAssunto} onChange={e => setEmailAssunto(e.target.value)} placeholder="Assunto do e-mail" className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Mensagem *</label>
              <textarea value={emailCorpo} onChange={e => setEmailCorpo(e.target.value)} rows={4} placeholder="Corpo do e-mail..." className="w-full resize-none rounded-2xl border border-border bg-background p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </>
        )}

        {/* Cliente */}
        {!defaultClienteId && (
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
                      <PlusCircle className="size-5" strokeWidth={2} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-primary">Criar novo cliente</span>
                      <span className="text-[10px] text-muted-foreground">Adicionar "{clienteBusca}"</span>
                    </div>
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Mini-formulário de contato do novo cliente */}
        {!defaultClienteId && criarClienteAberto && (
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

        {/* Data e Hora */}
        {aba === 'atividade' && (
          <>
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

            {/* Imóveis */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Imóveis vinculados {tipo === 'visita' ? '*' : '(opcional)'}
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="text"
                  value={buscaImovel}
                  onChange={(e) => setBuscaImovel(e.target.value)}
                  placeholder="Buscar imóvel por código, título ou bairro..."
                  className="h-12 w-full rounded-2xl border border-border bg-background pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              {buscaImovel && (
                <div className="mt-2 w-full max-h-40 overflow-y-auto rounded-2xl border border-border bg-card p-2 shadow-sm">
                  {imoveis
                    .filter(i =>
                      !imoveisSelecionados.find(s => s.id === i.id) &&
                      (i.titulo.toLowerCase().includes(buscaImovel.toLowerCase()) ||
                        i.codigo.toLowerCase().includes(buscaImovel.toLowerCase()) ||
                        i.bairro.toLowerCase().includes(buscaImovel.toLowerCase()))
                    )
                    .map(i => (
                      <button
                        key={i.id}
                        type="button"
                        onClick={() => {
                          setImoveisSelecionados([...imoveisSelecionados, i])
                          setBuscaImovel('')
                        }}
                        className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-muted"
                      >
                        <img src={i.foto} alt={i.titulo} className="size-10 rounded-lg object-cover" />
                        <div className="flex flex-col overflow-hidden">
                          <span className="truncate text-sm font-semibold text-foreground">{i.titulo}</span>
                          <span className="text-[10px] text-muted-foreground">{i.codigo} · {i.bairro}</span>
                        </div>
                        <PlusCircle className="ml-auto size-4 text-muted-foreground" />
                      </button>
                    ))}
                  {imoveis.filter(i =>
                    !imoveisSelecionados.find(s => s.id === i.id) &&
                    (i.titulo.toLowerCase().includes(buscaImovel.toLowerCase()) ||
                      i.codigo.toLowerCase().includes(buscaImovel.toLowerCase()) ||
                      i.bairro.toLowerCase().includes(buscaImovel.toLowerCase()))
                  ).length === 0 && (
                      <p className="p-3 text-center text-xs text-muted-foreground">Nenhum imóvel encontrado.</p>
                    )}
                </div>
              )}
              {imoveisSelecionados.length > 0 && (
                <div className="mt-3 flex flex-col gap-2">
                  {imoveisSelecionados.map((i) => (
                    <div key={i.id} className="flex items-center gap-3 rounded-xl border border-border bg-card p-2">
                      <img src={i.foto} alt={i.titulo} className="size-8 rounded-md object-cover" />
                      <div className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate text-xs font-semibold text-foreground">{i.titulo}</span>
                        <span className="text-[10px] text-muted-foreground">{i.codigo}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setImoveisSelecionados(imoveisSelecionados.filter(s => s.id !== i.id))}
                        className="flex size-6 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      >
                        <X className="size-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Importante */}
            <button
              type="button"
              onClick={() => setImportante(!importante)}
              className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold transition-brand ${importante
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
          </>
        )}

        <button
          type="button"
          onClick={handleSalvar}
          disabled={(aba !== 'atividade' && !clienteIdSelecionado) || (aba === 'atividade' ? (!titulo || !data || !hora || (tipo === 'visita' && imoveisSelecionados.length === 0)) : aba === 'nota' ? !descricao : (!emailAssunto || !emailCorpo))}
          className="h-12 w-full rounded-2xl bg-primary text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-brand active:scale-[0.98] disabled:opacity-50"
        >
          {aba === 'atividade' ? 'Salvar atividade' : aba === 'nota' ? 'Salvar nota' : 'Enviar e-mail'}
        </button>
      </div>

      {/* Albert Voice Command Assistant Overlay */}
      {albertAberto && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setAlbertAberto(false)} />
          <div className="relative z-50 w-full rounded-t-[2.5rem] bg-zinc-900 px-6 py-8 pb-[calc(2rem+env(safe-area-inset-bottom))] shadow-2xl animate-in slide-in-from-bottom duration-300 text-white flex flex-col items-center mx-auto max-w-md">
            <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-zinc-700" />
            
            <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/20 text-primary mb-4">
              <Bot className="size-8" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-white text-center">Albert Assistente de Voz</h3>
            <p className="text-xs text-zinc-400 text-center mt-1 mb-8 max-w-[280px]">
              Diga o que você precisa agendar. A IA vai preencher o título, a descrição e a data da tarefa automaticamente.
            </p>

            {albertStatus === 'idle' && (
              <button
                type="button"
                onClick={startAlbertVoiceCapture}
                className="flex size-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform active:scale-90"
              >
                <Mic className="size-8" />
              </button>
            )}

            {albertStatus === 'gravando' && (
              <div className="flex flex-col items-center gap-4">
                <div className="relative flex size-20 items-center justify-center rounded-full bg-red-500 text-white transition-transform active:scale-90">
                  <Mic className="size-8 animate-pulse" />
                </div>
                <p className="text-xs font-semibold text-red-400 mt-2 font-mono">Gravando... 0:0{albertTimer}</p>
                <div className="flex flex-col gap-1.5 mt-2 bg-zinc-800/40 p-3 rounded-xl border border-zinc-750">
                  <span className="text-[10px] uppercase font-bold text-zinc-500">Exemplos que você pode falar:</span>
                  <button 
                    type="button"
                    onClick={() => processAlbertVoiceCommand('Ligar para Ricardo Almeida amanhã às 15:00 para falar do contrato de compra e venda')}
                    className="text-xs text-left text-primary hover:underline"
                  >
                    "Ligar para Ricardo Almeida amanhã às 15:00..."
                  </button>
                  <button 
                    type="button"
                    onClick={() => processAlbertVoiceCommand('Visita no imóvel MS-1042 hoje às 17h com André')}
                    className="text-xs text-left text-primary hover:underline"
                  >
                    "Visita no imóvel MS-1042 hoje às 17h..."
                  </button>
                </div>
              </div>
            )}

            {albertStatus === 'processando' && (
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="size-10 text-primary animate-spin" />
                <p className="text-xs text-zinc-400 italic">"{albertTextoSimulado}"</p>
                <p className="text-xs font-semibold text-primary">Processando áudio com Albert IA...</p>
              </div>
            )}

            {albertStatus === 'sucesso' && (
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="flex size-14 items-center justify-center rounded-full bg-green-500/10 text-green-400">
                  <Check className="size-8" />
                </div>
                <p className="text-sm font-semibold text-green-400">Atividade processada com sucesso!</p>
                <p className="text-xs text-zinc-500">Formulário preenchido automaticamente.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
