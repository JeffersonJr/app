'use client'

import { useState } from 'react'
import { Check, X, ChevronDown, ChevronUp } from 'lucide-react'

export type FiltrosAvancadosEmpreendimentos = {
  name: string
  code: string
  alternative_code: string
  street: string
  general_status: string
  availability_status: string
  finality: string
  city: string
  neighborhood: string
  min_price: string
  max_price: string
  dorm_count: string
  suite_count: string
  parking_lot_count: string
  car_garage_count: string
  flags: {
    rascunho: boolean
    sem_foto: boolean
    desatualizado: boolean
    destaque_home: boolean
    destaque_banner: boolean
    publicado_site: boolean
  }
}

export const defaultFiltrosAvancadosEmpreendimentos: FiltrosAvancadosEmpreendimentos = {
  name: '',
  code: '',
  alternative_code: '',
  street: '',
  general_status: 'Todos',
  availability_status: 'Disponível',
  finality: 'Todas',
  city: '',
  neighborhood: '',
  min_price: '',
  max_price: '',
  dorm_count: 'Qualquer',
  suite_count: 'Qualquer',
  parking_lot_count: 'Qualquer',
  car_garage_count: 'Qualquer',
  flags: {
    rascunho: false,
    sem_foto: false,
    desatualizado: false,
    destaque_home: false,
    destaque_banner: false,
    publicado_site: false,
  }
}

export function FiltrosAvancadosEmpreendimentosSheet({
  filtrosAtuais,
  onApply,
  onClose,
}: {
  filtrosAtuais: FiltrosAvancadosEmpreendimentos
  onApply: (f: FiltrosAvancadosEmpreendimentos) => void
  onClose: () => void
}) {
  const [f, setF] = useState<FiltrosAvancadosEmpreendimentos>(filtrosAtuais)

  const updateFiltro = (key: keyof FiltrosAvancadosEmpreendimentos, value: any) => {
    setF(prev => ({ ...prev, [key]: value }))
  }

  const toggleFlag = (key: keyof FiltrosAvancadosEmpreendimentos['flags']) => {
    setF(prev => ({
      ...prev,
      flags: {
        ...prev.flags,
        [key]: !prev.flags[key]
      }
    }))
  }

  const statusList = ['Todos', 'Na Planta', 'Em Obras', 'Pronto para Morar']
  const availabilityList = ['Qualquer', 'Disponível', 'Indisponível', 'Vendido']
  const finalidades = ['Todas', 'Residencial', 'Comercial', 'Misto']
  
  const numbersOptions = ['Qualquer', '1', '2', '3', '4', '5+']
  
  const applyMoneyMask = (value: string) => {
    const onlyDigits = value.replace(/\D/g, '')
    if (!onlyDigits) return ''
    const num = Number(onlyDigits) / 100
    return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const Section = ({ title, children }: { title: string, children: React.ReactNode }) => {
    const [open, setOpen] = useState(true)
    return (
      <div className="border-b border-border/50 py-4 last:border-0">
        <button 
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between text-left"
        >
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{title}</h3>
          {open ? <ChevronUp className="size-4 text-muted-foreground" /> : <ChevronDown className="size-4 text-muted-foreground" />}
        </button>
        {open && <div className="mt-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2">{children}</div>}
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <button
        type="button"
        aria-label="Fechar filtros"
        onClick={onClose}
        className="absolute inset-0 bg-teal-shadow/40 backdrop-blur-[2px]"
      />

      <div className="relative flex flex-col h-[90vh] rounded-t-3xl bg-card shadow-2xl animate-in slide-in-from-bottom duration-200">
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="h-1 w-10 rounded-full bg-border" />
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
          <h2 className="font-serif text-xl font-semibold text-foreground">Filtros Avançados</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-brand active:scale-95"
          >
            <X className="size-4" strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6 scrollbar-none">
          
          <Section title="Campos de Texto e Localização">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-foreground">Nome</label>
              <input type="text" value={f.name} onChange={(e) => updateFiltro('name', e.target.value)} className="h-10 px-3 rounded-lg border border-border bg-transparent text-sm focus:outline-primary/50" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-foreground">Código</label>
                <input type="text" value={f.code} onChange={(e) => updateFiltro('code', e.target.value)} className="h-10 px-3 rounded-lg border border-border bg-transparent text-sm focus:outline-primary/50" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-foreground">Código Alternativo</label>
                <input type="text" value={f.alternative_code} onChange={(e) => updateFiltro('alternative_code', e.target.value)} className="h-10 px-3 rounded-lg border border-border bg-transparent text-sm focus:outline-primary/50" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-foreground">Logradouro [Endereço]</label>
              <input type="text" value={f.street} onChange={(e) => updateFiltro('street', e.target.value)} className="h-10 px-3 rounded-lg border border-border bg-transparent text-sm focus:outline-primary/50" />
            </div>
          </Section>

          <Section title="Seleções e Dropdowns">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-foreground">Status</label>
              <select value={f.general_status} onChange={(e) => updateFiltro('general_status', e.target.value)} className="h-10 px-3 rounded-lg border border-border bg-transparent text-sm focus:outline-primary/50">
                {statusList.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-foreground">Disponibilidade</label>
                <select value={f.availability_status} onChange={(e) => updateFiltro('availability_status', e.target.value)} className="h-10 px-3 rounded-lg border border-border bg-transparent text-sm focus:outline-primary/50">
                  {availabilityList.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-foreground">Finalidade</label>
                <select value={f.finality} onChange={(e) => updateFiltro('finality', e.target.value)} className="h-10 px-3 rounded-lg border border-border bg-transparent text-sm focus:outline-primary/50">
                  {finalidades.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-foreground">Cidade</label>
                <input type="text" value={f.city} onChange={(e) => updateFiltro('city', e.target.value)} className="h-10 px-3 rounded-lg border border-border bg-transparent text-sm focus:outline-primary/50" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-foreground">Bairro</label>
                <input type="text" value={f.neighborhood} onChange={(e) => updateFiltro('neighborhood', e.target.value)} className="h-10 px-3 rounded-lg border border-border bg-transparent text-sm focus:outline-primary/50" />
              </div>
            </div>
          </Section>

          <Section title="Valores e Quantitativos">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-foreground">Valor Mínimo</label>
                <input type="text" value={f.min_price} onChange={(e) => updateFiltro('min_price', applyMoneyMask(e.target.value))} className="h-10 px-3 rounded-lg border border-border bg-transparent text-sm focus:outline-primary/50" placeholder="0,00" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-foreground">Valor Máximo</label>
                <input type="text" value={f.max_price} onChange={(e) => updateFiltro('max_price', applyMoneyMask(e.target.value))} className="h-10 px-3 rounded-lg border border-border bg-transparent text-sm focus:outline-primary/50" placeholder="0,00" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-foreground">Dormitórios</label>
                <select value={f.dorm_count} onChange={(e) => updateFiltro('dorm_count', e.target.value)} className="h-10 px-3 rounded-lg border border-border bg-transparent text-sm focus:outline-primary/50">
                  {numbersOptions.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-foreground">Suítes</label>
                <select value={f.suite_count} onChange={(e) => updateFiltro('suite_count', e.target.value)} className="h-10 px-3 rounded-lg border border-border bg-transparent text-sm focus:outline-primary/50">
                  {numbersOptions.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-foreground">Vagas de Estacionamento</label>
                <select value={f.parking_lot_count} onChange={(e) => updateFiltro('parking_lot_count', e.target.value)} className="h-10 px-3 rounded-lg border border-border bg-transparent text-sm focus:outline-primary/50">
                  {numbersOptions.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-foreground">Vagas de Garagem</label>
                <select value={f.car_garage_count} onChange={(e) => updateFiltro('car_garage_count', e.target.value)} className="h-10 px-3 rounded-lg border border-border bg-transparent text-sm focus:outline-primary/50">
                  {numbersOptions.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>
          </Section>

          <Section title="Filtros de Estado / Marcadores">
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: 'rascunho', label: 'Rascunho' },
                { key: 'sem_foto', label: 'Sem foto' },
                { key: 'desatualizado', label: 'Desatualizado' },
                { key: 'destaque_home', label: 'Destaque na pág. inic.' },
                { key: 'destaque_banner', label: 'Destaque no banner' },
                { key: 'publicado_site', label: 'Publicado no website' },
              ].map(flag => {
                const ativo = f.flags[flag.key as keyof typeof f.flags]
                return (
                  <button
                    key={flag.key}
                    onClick={() => toggleFlag(flag.key as keyof typeof f.flags)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-all text-xs font-semibold ${
                      ativo ? 'bg-primary/10 border-primary text-primary' : 'bg-transparent border-border text-foreground hover:bg-muted'
                    }`}
                  >
                    <div className={`size-4 rounded-sm border flex items-center justify-center transition-all ${ativo ? 'bg-primary border-primary' : 'border-border'}`}>
                      {ativo && <Check className="size-3 text-white" strokeWidth={3} />}
                    </div>
                    {flag.label}
                  </button>
                )
              })}
            </div>
          </Section>

        </div>

        <div className="p-5 border-t border-border/50 bg-background/50 flex gap-3 shrink-0 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
          <button
            onClick={() => setF(defaultFiltrosAvancadosEmpreendimentos)}
            className="flex-1 h-12 rounded-xl border border-border bg-card text-muted-foreground font-bold hover:bg-muted transition-all active:scale-95"
          >
            Limpar
          </button>
          <button
            onClick={() => onApply(f)}
            className="flex-[2] h-12 rounded-xl bg-primary text-primary-foreground font-bold shadow-md hover:bg-primary/90 transition-all active:scale-95"
          >
            Aplicar Filtros
          </button>
        </div>

      </div>
    </div>
  )
}
