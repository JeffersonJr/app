'use client'

import { useState } from 'react'
import { Check, X, ChevronDown, ChevronUp } from 'lucide-react'

export type FiltrosAvancadosImoveis = {
  statuses: string[]
  code: string
  alternativeCode: string
  purpose: string
  finality: string
  zone: string
  types: string[]
  subtypes: string[]
  cities: string[]
  neighborhoods: string[]
  dormCount: string
  suitCount: string
  carGarageCount: string
  minPrice: string
  maxPrice: string
  minTotalUsefulArea: string
  maxTotalUsefulArea: string
  minTotalArea: string
  maxTotalArea: string
  features: string[]
  proximities: string[]
  street: string
  numero: string
  searchName: string
}

export const defaultFiltrosAvancadosImoveis: FiltrosAvancadosImoveis = {
  statuses: [],
  code: '',
  alternativeCode: '',
  purpose: 'Qualquer',
  finality: 'Todas',
  zone: '',
  types: [],
  subtypes: [],
  cities: [],
  neighborhoods: [],
  dormCount: 'Qualquer',
  suitCount: 'Qualquer',
  carGarageCount: 'Qualquer',
  minPrice: '',
  maxPrice: '',
  minTotalUsefulArea: '',
  maxTotalUsefulArea: '',
  minTotalArea: '',
  maxTotalArea: '',
  features: [],
  proximities: [],
  street: '',
  numero: '',
  searchName: ''
}

export function FiltrosAvancadosImoveisSheet({
  filtrosAtuais,
  onApply,
  onClose,
}: {
  filtrosAtuais: FiltrosAvancadosImoveis
  onApply: (f: FiltrosAvancadosImoveis) => void
  onClose: () => void
}) {
  const [f, setF] = useState<FiltrosAvancadosImoveis>(filtrosAtuais)

  // Handlers
  const updateFiltro = (key: keyof FiltrosAvancadosImoveis, value: any) => {
    setF(prev => ({ ...prev, [key]: value }))
  }

  const toggleArray = (key: keyof FiltrosAvancadosImoveis, value: string) => {
    const current = f[key] as string[]
    if (current.includes(value)) {
      updateFiltro(key, current.filter(i => i !== value))
    } else {
      updateFiltro(key, [...current, value])
    }
  }

  // Lists
  const statusList = ['Livre', 'Ocupado', 'Em reforma', 'Reservado', 'Proposta']
  const finalidades = ['Todas', 'Residencial', 'Comercial', 'Industrial', 'Rural']
  const purposes = ['Qualquer', 'Venda', 'Locação']
  const typesList = ['Apartamento', 'Casa', 'Terreno', 'Sítio', 'Fazenda']
  const vagasOptions = ['Qualquer', '1', '2', '3', '4', '5+']
  
  // Mascara monetária simples (R$)
  const applyMoneyMask = (value: string) => {
    const onlyDigits = value.replace(/\D/g, '')
    if (!onlyDigits) return ''
    const num = Number(onlyDigits) / 100
    return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  // Mascara área simples (m²)
  const applyAreaMask = (value: string) => {
    const onlyDigits = value.replace(/\D/g, '')
    if (!onlyDigits) return ''
    return `${onlyDigits} m²`
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
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Fechar filtros"
        onClick={onClose}
        className="absolute inset-0 bg-teal-shadow/40 backdrop-blur-[2px]"
      />

      {/* Sheet Content */}
      <div className="relative flex flex-col h-[90vh] rounded-t-3xl bg-card shadow-2xl animate-in slide-in-from-bottom duration-200">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="h-1 w-10 rounded-full bg-border" />
        </div>

        {/* Header */}
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

        {/* Form */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 scrollbar-none">
          
          <Section title="Filtros e Seleções Principais">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-foreground">Status do imóvel</label>
              <div className="flex flex-wrap gap-2">
                {statusList.map(s => (
                  <button
                    key={s}
                    onClick={() => toggleArray('statuses', s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      f.statuses.includes(s) ? 'bg-primary/10 border-primary text-primary' : 'bg-transparent border-border text-muted-foreground'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-foreground">Código</label>
                <input type="text" value={f.code} onChange={(e) => updateFiltro('code', e.target.value)} className="h-10 px-3 rounded-lg border border-border bg-transparent text-sm focus:outline-primary/50" placeholder="Ex: EV-123" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-foreground">Código alternativo</label>
                <input type="text" value={f.alternativeCode} onChange={(e) => updateFiltro('alternativeCode', e.target.value)} className="h-10 px-3 rounded-lg border border-border bg-transparent text-sm focus:outline-primary/50" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-foreground">Imóvel para</label>
                <select value={f.purpose} onChange={(e) => updateFiltro('purpose', e.target.value)} className="h-10 px-3 rounded-lg border border-border bg-transparent text-sm focus:outline-primary/50">
                  {purposes.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-foreground">Finalidade</label>
                <select value={f.finality} onChange={(e) => updateFiltro('finality', e.target.value)} className="h-10 px-3 rounded-lg border border-border bg-transparent text-sm focus:outline-primary/50">
                  {finalidades.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-foreground">Zona</label>
              <input type="text" value={f.zone} onChange={(e) => updateFiltro('zone', e.target.value)} className="h-10 px-3 rounded-lg border border-border bg-transparent text-sm focus:outline-primary/50" placeholder="Ex: Sul" />
            </div>
          </Section>

          <Section title="Tipos e Localização">
            <div className="flex flex-col gap-2 opacity-50">
              <label className="text-xs font-semibold text-foreground">Tipos (Desabilitado)</label>
              <div className="flex flex-wrap gap-2">
                {typesList.map(t => (
                  <button disabled key={t} className="px-3 py-1.5 rounded-lg text-xs font-semibold border bg-muted border-border text-muted-foreground cursor-not-allowed">{t}</button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1 opacity-50">
              <label className="text-xs font-semibold text-foreground">Subtipos (Desabilitado)</label>
              <input disabled type="text" className="h-10 px-3 rounded-lg border border-border bg-muted text-sm cursor-not-allowed" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-foreground">Cidades</label>
              <input type="text" value={f.cities.join(', ')} onChange={(e) => updateFiltro('cities', e.target.value.split(',').map(s=>s.trim()).filter(Boolean))} className="h-10 px-3 rounded-lg border border-border bg-transparent text-sm focus:outline-primary/50" placeholder="Separadas por vírgula" />
            </div>

            <div className="flex flex-col gap-1 opacity-50">
              <label className="text-xs font-semibold text-foreground">Bairros (Desabilitado)</label>
              <input disabled type="text" className="h-10 px-3 rounded-lg border border-border bg-muted text-sm cursor-not-allowed" />
            </div>
          </Section>

          <Section title="Características Quantitativas">
            <div className="grid grid-cols-2 gap-3 opacity-50">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-foreground">Dorms (Desabilitado)</label>
                <select disabled className="h-10 px-3 rounded-lg border border-border bg-muted text-sm cursor-not-allowed">
                  <option>Qualquer</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-foreground">Suítes (Desabilitado)</label>
                <select disabled className="h-10 px-3 rounded-lg border border-border bg-muted text-sm cursor-not-allowed">
                  <option>Qualquer</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-foreground">Vagas</label>
              <select value={f.carGarageCount} onChange={(e) => updateFiltro('carGarageCount', e.target.value)} className="h-10 px-3 rounded-lg border border-border bg-transparent text-sm focus:outline-primary/50">
                {vagasOptions.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </Section>

          <Section title="Valores e Dimensões">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-foreground">Valor Mínimo (R$)</label>
                <input type="text" value={f.minPrice} onChange={(e) => updateFiltro('minPrice', applyMoneyMask(e.target.value))} className="h-10 px-3 rounded-lg border border-border bg-transparent text-sm focus:outline-primary/50" placeholder="0,00" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-foreground">Valor Máximo (R$)</label>
                <input type="text" value={f.maxPrice} onChange={(e) => updateFiltro('maxPrice', applyMoneyMask(e.target.value))} className="h-10 px-3 rounded-lg border border-border bg-transparent text-sm focus:outline-primary/50" placeholder="0,00" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-foreground">Área Útil Mín.</label>
                <input type="text" value={f.minTotalUsefulArea} onChange={(e) => updateFiltro('minTotalUsefulArea', applyAreaMask(e.target.value))} className="h-10 px-3 rounded-lg border border-border bg-transparent text-sm focus:outline-primary/50" placeholder="m²" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-foreground">Área Útil Máx.</label>
                <input type="text" value={f.maxTotalUsefulArea} onChange={(e) => updateFiltro('maxTotalUsefulArea', applyAreaMask(e.target.value))} className="h-10 px-3 rounded-lg border border-border bg-transparent text-sm focus:outline-primary/50" placeholder="m²" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-foreground">Área Total Mín.</label>
                <input type="text" value={f.minTotalArea} onChange={(e) => updateFiltro('minTotalArea', applyAreaMask(e.target.value))} className="h-10 px-3 rounded-lg border border-border bg-transparent text-sm focus:outline-primary/50" placeholder="m²" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-foreground">Área Total Máx.</label>
                <input type="text" value={f.maxTotalArea} onChange={(e) => updateFiltro('maxTotalArea', applyAreaMask(e.target.value))} className="h-10 px-3 rounded-lg border border-border bg-transparent text-sm focus:outline-primary/50" placeholder="m²" />
              </div>
            </div>
          </Section>

          <Section title="Detalhes e Endereço">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-foreground">Endereço</label>
              <input type="text" value={f.street} onChange={(e) => updateFiltro('street', e.target.value)} className="h-10 px-3 rounded-lg border border-border bg-transparent text-sm focus:outline-primary/50" placeholder="Rua, Avenida..." />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-foreground">Número</label>
              <input type="text" value={f.numero} onChange={(e) => updateFiltro('numero', e.target.value)} className="h-10 px-3 rounded-lg border border-border bg-transparent text-sm focus:outline-primary/50" />
            </div>
          </Section>

        </div>

        {/* Footer (Salvar Busca & Aplicar) */}
        <div className="p-5 border-t border-border/50 bg-background/50 flex flex-col gap-3 shrink-0 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
          <div className="flex items-center gap-3 w-full">
            <input 
              type="text" 
              value={f.searchName} 
              onChange={(e) => updateFiltro('searchName', e.target.value)} 
              placeholder="Nome para salvar a busca..." 
              className="flex-1 h-12 px-4 rounded-xl border border-border bg-card text-sm focus:outline-primary/50" 
            />
            <button 
              onClick={() => {
                if(!f.searchName) return alert('Digite um nome para a pesquisa');
                alert('Busca "' + f.searchName + '" salva com sucesso!');
              }}
              className="h-12 px-4 rounded-xl border border-primary text-primary font-bold hover:bg-primary/5 transition-all"
            >
              Salvar
            </button>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setF(defaultFiltrosAvancadosImoveis)}
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
    </div>
  )
}
