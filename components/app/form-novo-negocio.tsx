'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

const TIPOS_IMOVEL = ['Apartamento', 'Casa', 'Studio', 'Cobertura', 'Terreno', 'Sala Comercial', 'Galpão', 'Outro'] as const
const CIDADES = ['São Paulo', 'Barueri', 'Osasco', 'Guarulhos', 'Santo André', 'São Bernardo', 'Mogi das Cruzes', 'Outra'] as const
const PRAZOS = ['Imediato', '1-3 meses', '3-6 meses', 'Acima de 6 meses'] as const

export function FormNovoNegocio({ onClose }: { onClose: () => void }) {
  const [nomeCliente, setNomeCliente] = useState('')
  const [finalidade, setFinalidade] = useState<'Venda' | 'Locação'>('Venda')
  const [tipoImovel, setTipoImovel] = useState<(typeof TIPOS_IMOVEL)[number]>('Apartamento')
  const [cidade, setCidade] = useState<(typeof CIDADES)[number]>('São Paulo')
  const [bairros, setBairros] = useState('')
  const [quartos, setQuartos] = useState('')
  const [valorMin, setValorMin] = useState('')
  const [valorMax, setValorMax] = useState('')
  const [prazo, setPrazo] = useState<(typeof PRAZOS)[number]>('Imediato')
  const [observacoes, setObservacoes] = useState('')

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
        {/* Cliente */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Nome do cliente *</label>
          <input
            type="text"
            value={nomeCliente}
            onChange={(e) => setNomeCliente(e.target.value)}
            placeholder="Ex: Mariana Costa"
            className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
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
                className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-brand ${
                  finalidade === f ? 'bg-primary text-primary-foreground' : 'border border-border bg-card text-muted-foreground'
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
                className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-brand ${
                  quartos === q ? 'bg-primary text-primary-foreground' : 'border border-border bg-card text-muted-foreground'
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
              onChange={(e) => setValorMin(e.target.value)}
              placeholder="Mínimo"
              className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <input
              type="text"
              value={valorMax}
              onChange={(e) => setValorMax(e.target.value)}
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
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-brand ${
                  prazo === p ? 'bg-primary text-primary-foreground' : 'border border-border bg-card text-muted-foreground'
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
          onClick={onClose}
          className="h-12 w-full rounded-2xl bg-primary text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-brand active:scale-[0.98]"
        >
          Criar negócio
        </button>
      </div>
    </div>
  )
}
