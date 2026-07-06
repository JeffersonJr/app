'use client'

import { Bot, Brain, Camera, CheckCircle2, MessageCircle, Sparkles, Trophy, X, Zap } from 'lucide-react'

const BENEFICIOS = [
  {
    icon: Camera,
    cor: 'from-teal-deep to-teal-mid',
    emoji: '📸',
    titulo: 'Cadastro de Imóveis por IA',
    descricao:
      'Tire fotos do imóvel e a IA analisa automaticamente: identifica o tipo, estima a metragem, detecta a localização, avalia o valor de mercado e gera uma descrição completa em segundos.',
    itens: [
      'Tipo de imóvel detectado automaticamente',
      'Estimativa de metragem por visão computacional',
      'Valor de mercado sugerido pela IA',
      'Descrição profissional gerada em segundos',
      'Localização e bairro identificados',
    ],
  },
  {
    icon: Bot,
    cor: 'from-primary to-teal-deep',
    emoji: '🤖',
    titulo: 'Albert — IA de Atendimento',
    descricao:
      'O Albert é seu assistente de vendas 24h. Ele faz follow-up automático com leads, envia mensagens personalizadas no momento certo e garante que nenhum cliente seja esquecido.',
    itens: [
      'Follow-up automático por WhatsApp e e-mail',
      'Mensagens personalizadas para cada lead',
      'Reativação de leads frios sem esforço',
      'Notificações inteligentes de oportunidades',
      'Histórico completo de interações com IA',
    ],
  },
  {
    icon: Brain,
    cor: 'from-amber to-[#8a5a1e]',
    emoji: '📊',
    titulo: 'Insights e Previsão de Fechamento',
    descricao:
      'A IA analisa o comportamento dos leads e prevê quais têm maior probabilidade de fechar. Priorize seu tempo com quem realmente vai comprar.',
    itens: [
      'Score de probabilidade de fechamento',
      'Análise do perfil de cada lead',
      'Sugestão de próxima ação ideal',
      'Relatórios de performance gerados por IA',
      'Alertas de leads prontos para fechar',
    ],
  },
]

const ESTATISTICAS = [
  { valor: '3x', label: 'mais conversões de leads' },
  { valor: '78%', label: 'menos tempo no cadastro' },
  { valor: '24h', label: 'de follow-up automático' },
  { valor: '94%', label: 'de precisão na análise' },
]

export function IAUpsellPage({ onClose, origem }: { onClose: () => void; origem: 'albert' | 'imovel' }) {
  const beneficioDestaque = origem === 'albert' ? 1 : 0 // qual card mostrar primeiro

  return (
    <div className="absolute inset-0 z-50 flex flex-col overflow-y-auto bg-background">
      {/* Hero */}
      <div className="relative flex flex-col items-center justify-center overflow-hidden bg-primary px-6 pb-10 pt-[calc(3rem+env(safe-area-inset-top))] text-center">
        {/* Fechar */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-5 top-[calc(1rem+env(safe-area-inset-top))] flex size-10 items-center justify-center rounded-full bg-teal-shadow/40 text-primary-foreground transition-brand active:scale-95"
        >
          <X className="size-5" strokeWidth={1.5} />
        </button>

        {/* Ícone animado */}
        <div className="relative mb-5">
          <div className="flex size-20 items-center justify-center rounded-3xl bg-teal-shadow/50">
            <Sparkles className="size-10 text-primary-foreground" strokeWidth={1.5} />
          </div>
          {/* Pulso */}
          <span className="absolute inset-0 animate-ping rounded-3xl bg-teal-mid/30" />
        </div>

        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-teal-light">Microsistec IA</p>
        <h1 className="mt-2 font-serif text-3xl font-semibold leading-tight text-primary-foreground text-balance">
          Venda mais com<br />Inteligência Artificial
        </h1>
        <p className="mt-3 text-sm text-teal-light text-balance max-w-xs">
          {origem === 'albert'
            ? 'O Albert é um assistente de IA que faz follow-up automático dos seus leads para você nunca perder uma venda.'
            : 'Cadastre imóveis em segundos tirando fotos — a IA preenche tudo automaticamente.'}
        </p>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-4 gap-2 w-full">
          {ESTATISTICAS.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-0.5 rounded-2xl bg-teal-shadow/40 px-2 py-3">
              <span className="font-serif text-lg font-black text-primary-foreground">{s.valor}</span>
              <span className="text-[9px] font-medium text-teal-light text-center leading-tight">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Benefícios */}
      <div className="flex flex-col gap-5 px-5 py-6">
        <h2 className="font-serif text-xl font-semibold text-foreground text-center">
          O que você vai ter acesso
        </h2>

        {BENEFICIOS.map((b, idx) => {
          const Icon = b.icon
          const isDestaque = idx === beneficioDestaque
          return (
            <div
              key={b.titulo}
              className={`rounded-[1.25rem] overflow-hidden ${isDestaque ? 'ring-2 ring-primary ring-offset-2' : ''}`}
            >
              {/* Header do card */}
              <div className={`flex items-center gap-3 bg-gradient-to-r ${b.cor} px-5 py-4`}>
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/20">
                  <Icon className="size-6 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  {isDestaque && (
                    <span className="mb-1 inline-block rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                      {origem === 'albert' ? '⭐ Você tentou acessar' : '⭐ Você tentou acessar'}
                    </span>
                  )}
                  <p className="text-sm font-semibold text-white">{b.titulo}</p>
                </div>
              </div>

              {/* Conteúdo */}
              <div className="bg-card px-5 py-4">
                <p className="text-sm text-muted-foreground leading-relaxed">{b.descricao}</p>
                <ul className="mt-3 flex flex-col gap-2">
                  {b.itens.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 shrink-0 text-teal-mid mt-0.5" strokeWidth={2} />
                      <span className="text-xs font-medium text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}

        {/* Depoimento */}
        <div className="rounded-[1.25rem] bg-cream p-5">
          <div className="flex gap-1 mb-2">
            {[1,2,3,4,5].map(i => <span key={i} className="text-amber text-sm">★</span>)}
          </div>
          <p className="text-sm text-foreground italic leading-relaxed">
            "Com o Albert, minha taxa de conversão triplicou. Ele faz os follow-ups enquanto eu estou em visitas. É como ter um assistente trabalhando 24h por dia."
          </p>
          <div className="mt-3 flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 font-serif text-xs font-bold text-primary">
              RF
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">Roberto Figueiredo</p>
              <p className="text-[10px] text-muted-foreground">Corretor · São Paulo</p>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3 pb-8">
          <button
            type="button"
            className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition-brand active:scale-[0.98]"
          >
            <Zap className="size-4" strokeWidth={2} />
            Contratar Microsistec IA
          </button>
          <button
            type="button"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-border bg-card text-sm font-semibold text-foreground transition-brand active:scale-[0.98]"
          >
            <MessageCircle className="size-4 text-green-600" strokeWidth={1.5} />
            Falar com consultor pelo WhatsApp
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-10 w-full text-sm text-muted-foreground transition-brand"
          >
            Continuar sem IA
          </button>
        </div>
      </div>
    </div>
  )
}
