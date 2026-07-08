'use client'

import { useState } from 'react'
import { X, Search, Check, PlusCircle, Star } from 'lucide-react'
import { atendimentos, perfilVazio } from '@/lib/app-data'
import { maskCurrency, maskPhone } from '@/lib/masks'

const TIPOS_IMOVEL = ['Apartamento', 'Casa', 'Studio', 'Cobertura', 'Terreno', 'Sala Comercial', 'Galpão', 'Outro'] as const
const CIDADES = ['São Paulo', 'Barueri', 'Osasco', 'Guarulhos', 'Santo André', 'São Bernardo', 'Mogi das Cruzes', 'Outra'] as const
const PRAZOS = ['Imediato', '1-3 meses', '3-6 meses', 'Acima de 6 meses'] as const

export function FormNovoNegocio({ onClose, onSalvar }: { onClose: () => void, onSalvar?: (id: string) => void }) {
  const [nomeCliente, setNomeCliente] = useState('')
  const [clienteIdSelecionado, setClienteIdSelecionado] = useState('')
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false)
  const [criarClienteAberto, setCriarClienteAberto] = useState(false)
  const [telefones, setTelefones] = useState<{ numero: string, isWhatsapp: boolean }[]>([{ numero: '', isWhatsapp: true }])
  const [telPrincipalIdx, setTelPrincipalIdx] = useState(0)
  const [emails, setEmails] = useState<string[]>([''])
  const [emailPrincipalIdx, setEmailPrincipalIdx] = useState(0)
  const [finalidade, setFinalidade] = useState<'Venda' | 'Locação'>('Venda')
  const [tipoImovel, setTipoImovel] = useState<(typeof TIPOS_IMOVEL)[number]>('Apartamento')
  const [cidade, setCidade] = useState<(typeof CIDADES)[number]>('São Paulo')
  const [bairros, setBairros] = useState('')
  const [quartos, setQuartos] = useState('')
  const [valorMin, setValorMin] = useState('')
  const [valorMax, setValorMax] = useState('')
  const [prazo, setPrazo] = useState<(typeof PRAZOS)[number]>('Imediato')
  const [observacoes, setObservacoes] = useState('')

  const atendimentosFiltrados = nomeCliente
    ? atendimentos.filter(a => a.nome.toLowerCase().includes(nomeCliente.toLowerCase()))
    : atendimentos.slice(0, 5)

  function abrirFormCriar() {
    setCriarClienteAberto(true)
    setMostrarSugestoes(false)
  }

  function handleCriarCliente() {
    const novoId = `c${Date.now()}`
    const novoNome = nomeCliente

    const validEmailIdx = emailPrincipalIdx < emails.length ? emailPrincipalIdx : 0
    const emailPrincipal = emails[validEmailIdx] || `${novoNome.toLowerCase().replace(/\s/g, '')}@email.com`
    const emailsSecundarios = emails.filter((_, idx) => idx !== validEmailIdx).filter(Boolean)

    const validTelIdx = telPrincipalIdx < telefones.length ? telPrincipalIdx : 0
    const telPrincipalObj = telefones[validTelIdx]
    const telPrincipal = telPrincipalObj?.numero || '(11) 99999-9999'
    const telefonesSecundariosObj = telefones.filter((_, idx) => idx !== validTelIdx)
    const telefonesAdicionais = telefonesSecundariosObj.map(t => t.numero).filter(Boolean)
    const whatsappsAdicionais = telefonesSecundariosObj.filter(t => t.isWhatsapp).map(t => t.numero).filter(Boolean)

    atendimentos.push({
      id: novoId,
      nome: novoNome,
      iniciais: novoNome.substring(0, 2).toUpperCase(),
      email: emailPrincipal,
      emailsAdicionais: emailsSecundarios,
      telefone: telPrincipal,
      telefonesAdicionais,
      whatsappsAdicionais,
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
    setNomeCliente(novoNome)
    setCriarClienteAberto(false)
    setTelefones([{ numero: '', isWhatsapp: true }])
    setEmails([''])
    return novoId
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-serif text-xl font-semibold text-foreground">Novo negócio</h2>
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
        {/* Cliente — campo com busca */}
        <div className="relative">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Nome do cliente *</label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              value={nomeCliente}
              onChange={(e) => { setNomeCliente(e.target.value); setMostrarSugestoes(true); setClienteIdSelecionado('') }}
              onFocus={() => setMostrarSugestoes(true)}
              placeholder="Buscar ou criar cliente..."
              className="h-12 w-full rounded-2xl border border-border bg-background pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          {mostrarSugestoes && (
            <div className="absolute top-full mt-2 w-full max-h-48 overflow-y-auto rounded-2xl border border-border bg-card p-2 shadow-xl z-50">
              {atendimentosFiltrados.map(a => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => { setNomeCliente(a.nome); setClienteIdSelecionado(a.id); setMostrarSugestoes(false) }}
                  className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-muted"
                >
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-teal-mid/10 text-xs font-bold text-teal-deep">{a.iniciais}</div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">{a.nome}</span>
                    <span className="text-[10px] uppercase text-muted-foreground">{a.origem}</span>
                  </div>
                  {clienteIdSelecionado === a.id && <Check className="ml-auto size-4 text-primary" />}
                </button>
              ))}
              {atendimentosFiltrados.length === 0 && nomeCliente && (
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
                    <span className="text-xs text-muted-foreground">Adicionar "{nomeCliente}"</span>
                  </div>
                </button>
              )}
            </div>
          )}

          {/* Mini-formulário de contatos */}
          {criarClienteAberto && (
            <div className="mt-3 rounded-2xl border border-primary/30 bg-primary/5 p-4 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-semibold text-foreground">Contatos de <span className="text-primary">{nomeCliente}</span></p>
                <button type="button" onClick={() => setCriarClienteAberto(false)} className="flex size-7 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <X className="size-3.5" strokeWidth={2} />
                </button>
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Telefones (até 3)</label>
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
                        className="h-10 flex-1 rounded-xl border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newTels = [...telefones]
                          newTels[idx].isWhatsapp = !newTels[idx].isWhatsapp
                          setTelefones(newTels)
                        }}
                        className={`flex size-10 items-center justify-center rounded-xl border transition-colors ${tel.isWhatsapp ? 'bg-[#25D366]/10 border-[#25D366]/30 text-[#25D366]' : 'bg-card border-border text-muted-foreground'}`}
                        title={tel.isWhatsapp ? "É WhatsApp" : "Não é WhatsApp"}
                      >
                        <span className="font-bold text-[10px] text-center leading-none">WA</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setTelPrincipalIdx(idx)}
                        className={`flex size-10 items-center justify-center rounded-xl border transition-colors ${telPrincipalIdx === idx ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' : 'bg-card border-border text-muted-foreground'}`}
                        title={telPrincipalIdx === idx ? "Telefone Principal" : "Definir como Principal"}
                      >
                        <Star className={`size-4 ${telPrincipalIdx === idx ? 'fill-current' : ''}`} />
                      </button>
                      {telefones.length > 1 && (
                        <button type="button" onClick={() => {
                          setTelefones(telefones.filter((_, i) => i !== idx))
                          if (telPrincipalIdx === idx) setTelPrincipalIdx(0)
                          else if (telPrincipalIdx > idx) setTelPrincipalIdx(telPrincipalIdx - 1)
                        }} className="flex size-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                          <X className="size-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                  {telefones.length < 3 && (
                    <button type="button" onClick={() => setTelefones([...telefones, { numero: '', isWhatsapp: false }])} className="flex items-center gap-2 text-[10px] font-semibold text-primary mt-1">
                      <PlusCircle className="size-3" /> Adicionar telefone
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">E-mails (até 3)</label>
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
                        placeholder="nome@email.com"
                        className="h-10 flex-1 rounded-xl border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      <button
                        type="button"
                        onClick={() => setEmailPrincipalIdx(idx)}
                        className={`flex size-10 items-center justify-center rounded-xl border transition-colors ${emailPrincipalIdx === idx ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' : 'bg-card border-border text-muted-foreground'}`}
                        title={emailPrincipalIdx === idx ? "E-mail Principal" : "Definir como Principal"}
                      >
                        <Star className={`size-4 ${emailPrincipalIdx === idx ? 'fill-current' : ''}`} />
                      </button>
                      {emails.length > 1 && (
                        <button type="button" onClick={() => {
                          setEmails(emails.filter((_, i) => i !== idx))
                          if (emailPrincipalIdx === idx) setEmailPrincipalIdx(0)
                          else if (emailPrincipalIdx > idx) setEmailPrincipalIdx(emailPrincipalIdx - 1)
                        }} className="flex size-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                          <X className="size-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                  {emails.length < 3 && (
                    <button type="button" onClick={() => setEmails([...emails, ''])} className="flex items-center gap-2 text-[10px] font-semibold text-primary mt-1">
                      <PlusCircle className="size-3" /> Adicionar e-mail
                    </button>
                  )}
                </div>
              </div>
              <button type="button" onClick={handleCriarCliente} className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition-brand active:scale-[0.98]">
                <PlusCircle className="size-4" strokeWidth={2} />
                Criar cliente e selecionar
              </button>
            </div>
          )}
        </div>

        {/* Finalidade */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Finalidade</label>
          <div className="flex gap-2">
            {(['Venda', 'Locação'] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFinalidade(f)}
                className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-brand ${finalidade === f ? 'bg-primary text-primary-foreground' : 'border border-border bg-card text-muted-foreground'
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Tipo de imóvel */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Tipo de imóvel</label>
          <select
            value={tipoImovel}
            onChange={(e) => setTipoImovel(e.target.value as (typeof TIPOS_IMOVEL)[number])}
            className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring appearance-none"
          >
            {TIPOS_IMOVEL.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* Cidade */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Cidade</label>
          <select
            value={cidade}
            onChange={(e) => setCidade(e.target.value as (typeof CIDADES)[number])}
            className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring appearance-none"
          >
            {CIDADES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Bairros */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Bairros de interesse</label>
          <input
            type="text"
            value={bairros}
            onChange={(e) => setBairros(e.target.value)}
            placeholder="Ex: Jardins, Itaim, Moema"
            className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Quartos */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Quartos mínimos</label>
          <div className="flex gap-2">
            {['1', '2', '3', '4', '5+'].map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setQuartos(q)}
                className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-brand ${quartos === q ? 'bg-primary text-primary-foreground' : 'border border-border bg-card text-muted-foreground'
                  }`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Faixa de valor */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Faixa de valor</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={valorMin}
              onChange={(e) => setValorMin(maskCurrency(e.target.value))}
              placeholder="Mínimo"
              className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <input
              type="text"
              value={valorMax}
              onChange={(e) => setValorMax(maskCurrency(e.target.value))}
              placeholder="Máximo"
              className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Prazo */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Prazo para comprar</label>
          <div className="flex flex-wrap gap-2">
            {PRAZOS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPrazo(p)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-brand ${prazo === p ? 'bg-primary text-primary-foreground' : 'border border-border bg-card text-muted-foreground'
                  }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Observações */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Observações</label>
          <textarea
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            rows={3}
            placeholder="Informações adicionais sobre o negócio..."
            className="w-full resize-none rounded-2xl border border-border bg-background p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <button
          type="button"
          onClick={() => {
            if (clienteIdSelecionado) {
              if (onSalvar) onSalvar(clienteIdSelecionado)
              onClose()
            } else if (nomeCliente) {
              const idCriado = handleCriarCliente()
              if (onSalvar) onSalvar(idCriado)
              onClose()
            }
          }}
          className="h-12 w-full rounded-2xl bg-primary text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-brand active:scale-[0.98]"
        >
          Criar negócio
        </button>
      </div>
    </div>
  )
}
