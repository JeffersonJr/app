'use client'

import React from 'react'
import { Copy, Check, CheckCircle2, Bot, Calendar, Home, ListFilter, MapPin, Search, User, MessageCircle } from 'lucide-react'
import { TipoAtividade } from '@/lib/app-data'

export default function DesignSystemPage() {
  return (
    <div className="space-y-24 pb-24">
      
      {/* Intro */}
      <section>
        <h1 className="text-4xl font-extrabold text-ink mb-4">Microsistec UI</h1>
        <p className="text-lg text-slate leading-relaxed">
          Bem-vindo ao sistema de design da Microsistec. Este documento serve como fonte da verdade para cores, 
          tipografia, componentes e padrões de código utilizados no CRM Imobiliário. Use os componentes e classes 
          abaixo para manter a consistência visual em toda a aplicação.
        </p>
      </section>

      {/* Logo e Ícones */}
      <section id="logo-icones" className="scroll-mt-8">
        <SectionHeader title="Logo & Ícones" description="Logomarca da Microsistec e a biblioteca padrão de ícones." />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ComponentShowcase 
            title="Logotipo Microsistec" 
            code={`<span className="text-xl font-bold text-ink">\\n  Microsistec<span className="text-teal-mid">.</span>\\n</span>`}
          >
            <span className="text-4xl font-bold text-ink">
              Microsistec<span className="text-teal-mid">.</span>
            </span>
          </ComponentShowcase>
          
          <ComponentShowcase 
            title="Ícones (Lucide React)" 
            code={`import { Home, Calendar, Bot, ListFilter } from 'lucide-react'\\n\\n<Home className="w-5 h-5 text-slate" />\\n<Calendar className="w-5 h-5 text-slate" />\\n<Bot className="w-5 h-5 text-slate" />\\n<ListFilter className="w-5 h-5 text-slate" />`}
          >
            <div className="flex gap-4 items-center">
              <div className="flex flex-col items-center gap-2"><Home className="w-6 h-6 text-slate" /><span className="text-[10px] text-slate">Home</span></div>
              <div className="flex flex-col items-center gap-2"><Calendar className="w-6 h-6 text-slate" /><span className="text-[10px] text-slate">Calendar</span></div>
              <div className="flex flex-col items-center gap-2"><Bot className="w-6 h-6 text-slate" /><span className="text-[10px] text-slate">Bot</span></div>
              <div className="flex flex-col items-center gap-2"><ListFilter className="w-6 h-6 text-slate" /><span className="text-[10px] text-slate">ListFilter</span></div>
              <div className="flex flex-col items-center gap-2"><User className="w-6 h-6 text-slate" /><span className="text-[10px] text-slate">User</span></div>
              <div className="flex flex-col items-center gap-2"><MapPin className="w-6 h-6 text-slate" /><span className="text-[10px] text-slate">MapPin</span></div>
            </div>
          </ComponentShowcase>
        </div>
      </section>

      {/* Cores */}
      <section id="cores" className="scroll-mt-8">
        <SectionHeader title="Cores" description="Nossa paleta baseada no manual de marca (Manual Microsistec 03)." />
        
        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-bold text-slate uppercase tracking-wider mb-4">Cores Primárias da Marca</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ColorCard bgClass="bg-teal-deep" textClass="text-white" name="Teal Deep" hex="#2b5250" twClass="bg-teal-deep" />
              <ColorCard bgClass="bg-teal-mid" textClass="text-white" name="Teal Mid" hex="#5aa6a6" twClass="bg-teal-mid" />
              <ColorCard bgClass="bg-teal-light" textClass="text-ink" name="Teal Light" hex="#7cc1c1" twClass="bg-teal-light" />
              <ColorCard bgClass="bg-amber" textClass="text-ink" name="Amber" hex="#e8a14b" twClass="bg-amber" />
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-slate uppercase tracking-wider mb-4">Cores Neutras e Backgrounds</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ColorCard bgClass="bg-ink" textClass="text-white" name="Ink (Texto Principal)" hex="#1a1a1a" twClass="bg-ink" />
              <ColorCard bgClass="bg-slate" textClass="text-white" name="Slate (Texto Sec.)" hex="#6b7878" twClass="bg-slate" />
              <ColorCard bgClass="bg-fog" textClass="text-ink" name="Fog (Bordas/Inputs)" hex="#e8eded" twClass="bg-fog border border-border" />
              <ColorCard bgClass="bg-snow" textClass="text-ink" name="Snow (Fundo App)" hex="#fafbfb" twClass="bg-snow border border-border" />
              <ColorCard bgClass="bg-cream" textClass="text-ink" name="Cream (Fundo Sec.)" hex="#f7f3ea" twClass="bg-cream border border-border" />
            </div>
          </div>
        </div>
      </section>

      {/* Tipografia */}
      <section id="tipografia" className="scroll-mt-8">
        <SectionHeader title="Tipografia" description="Famílias de fontes baseadas em Inter, Space Grotesk e JetBrains Mono." />
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
             <div className="space-y-6">
               <div>
                 <p className="text-xs text-slate mb-1">Heading 1 - text-4xl font-extrabold</p>
                 <h1 className="text-4xl font-extrabold text-ink">A precisão de um engenheiro</h1>
               </div>
               <div>
                 <p className="text-xs text-slate mb-1">Heading 2 - text-2xl font-bold</p>
                 <h2 className="text-2xl font-bold text-ink">Pipeline Fluido e Dinâmico</h2>
               </div>
               <div>
                 <p className="text-xs text-slate mb-1">Body - text-base text-slate</p>
                 <p className="text-base text-slate">O CRM imobiliário da Microsistec no seu bolso. Aumente suas conversões com funis inteligentes e método FORD.</p>
               </div>
               <div>
                 <p className="text-xs text-slate mb-1">Small - text-sm font-medium</p>
                 <p className="text-sm font-medium text-slate">Última atualização há 12 min</p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Sombras e Efeitos */}
      <section id="sombras-efeitos" className="scroll-mt-8">
        <SectionHeader title="Sombras & Efeitos" description="Efeitos de Liquid Glass e sombras suaves que garantem o aspecto premium." />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ComponentShowcase 
            title="Sombra Suave (shadow-soft)" 
            code={`<div className="bg-white p-6 rounded-2xl shadow-soft">\\n  Card com sombra suave\\n</div>`}
          >
            <div className="bg-white p-6 rounded-2xl shadow-soft text-center text-ink font-medium">
              Card com sombra suave
            </div>
          </ComponentShowcase>

          <ComponentShowcase 
            title="Glass Panel" 
            code={`<div className="glass-panel p-6 rounded-2xl">\\n  Efeito Glassmorphism\\n</div>`}
          >
            {/* Background image to show glass effect */}
            <div className="relative p-8 rounded-2xl bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center">
              <div className="absolute inset-0 bg-teal-deep/30 rounded-2xl" />
              <div className="relative glass-panel p-6 rounded-2xl text-center text-ink font-bold shadow-xl">
                Efeito Glassmorphism
              </div>
            </div>
          </ComponentShowcase>
        </div>
      </section>

      {/* Inputs e Selects */}
      <section id="inputs" className="scroll-mt-8">
        <SectionHeader title="Inputs & Selects" description="Campos de formulário padronizados com os anéis de foco da marca." />
        
        <ComponentShowcase 
          title="Input de Texto e Select" 
          code={`{/* Input Text */}\\n<div className="space-y-1">\\n  <label className="text-xs font-semibold text-slate">Nome Completo</label>\\n  <input \\n    type="text" \\n    placeholder="Digite o nome..." \\n    className="w-full h-11 rounded-xl border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" \\n  />\\n</div>\\n\\n{/* Select Nativo */}\\n<div className="space-y-1">\\n  <label className="text-xs font-semibold text-slate">Status</label>\\n  <select className="w-full h-11 rounded-xl border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">\\n    <option>Ativo</option>\\n    <option>Inativo</option>\\n  </select>\\n</div>`}
        >
          <div className="w-full max-w-sm space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate">Nome Completo</label>
              <input 
                type="text" 
                placeholder="Digite o nome..." 
                className="w-full h-11 rounded-xl border border-border bg-white px-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-teal-mid" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate">Status</label>
              <select className="w-full h-11 rounded-xl border border-border bg-white px-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-teal-mid">
                <option>Ativo</option>
                <option>Inativo</option>
              </select>
            </div>
          </div>
        </ComponentShowcase>
      </section>

      {/* Tabs */}
      <section id="tabs" className="scroll-mt-8">
        <SectionHeader title="Tabs (Abas)" description="Navegação em pílulas para separar conteúdos no mesmo contexto." />
        
        <ComponentShowcase 
          title="Segmented Control (Pílulas)" 
          code={`<div className="flex gap-2 p-1.5 bg-fog/50 rounded-2xl border border-border">\\n  <button className="flex-1 rounded-xl py-2 text-sm font-semibold transition-all bg-white text-ink shadow-soft">\\n    Detalhes\\n  </button>\\n  <button className="flex-1 rounded-xl py-2 text-sm font-medium text-slate hover:bg-white/50 transition-all">\\n    Imóveis Compatíveis\\n  </button>\\n</div>`}
        >
          <div className="w-full max-w-sm flex gap-2 p-1.5 bg-fog/50 rounded-2xl border border-border">
            <button className="flex-1 rounded-xl py-2 text-sm font-semibold transition-all bg-white text-ink shadow-soft">
              Detalhes
            </button>
            <button className="flex-1 rounded-xl py-2 text-sm font-medium text-slate hover:bg-white/50 transition-all">
              Imóveis Compatíveis
            </button>
          </div>
        </ComponentShowcase>
      </section>

      {/* Botões */}
      <section id="botoes" className="scroll-mt-8">
        <SectionHeader title="Botões" description="Elementos interativos padronizados para formulários e chamadas de ação." />
        
        <ComponentShowcase 
          title="Variações de Botão" 
          code={`{/* Primário */}\\n<button className="bg-teal-deep hover:bg-teal-shadow text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-soft hover:shadow-md">\\n  Salvar Alterações\\n</button>\\n\\n{/* Secundário / Destaque */}\\n<button className="bg-amber hover:bg-amber/90 text-ink px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-soft">\\n  Acessar Web App\\n</button>\\n\\n{/* Contorno (Outline) */}\\n<button className="bg-white hover:bg-fog text-teal-deep border border-border px-5 py-2.5 rounded-xl text-sm font-bold transition-all">\\n  Cancelar\\n</button>\\n\\n{/* Fantasma (Ghost) */}\\n<button className="text-slate hover:text-teal-deep hover:bg-fog px-4 py-2 rounded-lg text-sm transition-colors">\\n  Detalhes\\n</button>`}
        >
          <div className="flex flex-wrap items-center gap-4">
            <button className="bg-teal-deep hover:bg-teal-shadow text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-soft hover:shadow-md">
              Salvar Alterações
            </button>
            <button className="bg-amber hover:bg-amber/90 text-ink px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-soft">
              Acessar Web App
            </button>
            <button className="bg-white hover:bg-fog text-teal-deep border border-border px-5 py-2.5 rounded-xl text-sm font-bold transition-all">
              Cancelar
            </button>
            <button className="text-slate hover:text-teal-deep hover:bg-fog px-4 py-2 rounded-lg text-sm transition-colors">
              Detalhes
            </button>
          </div>
        </ComponentShowcase>
      </section>

      {/* Badges e Tags */}
      <section id="badges" className="scroll-mt-8">
        <SectionHeader title="Badges & Tags" description="Utilizados para identificar status de temperatura, tipos de atividade ou etapas de funil." />
        
        <ComponentShowcase 
          title="Badges de Status / Temperatura" 
          code={`{/* Quente */}\\n<span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-destructive/10 text-destructive border border-destructive/20">\\n  Quente\\n</span>\\n\\n{/* Morno */}\\n<span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber/20 text-amber-800 border border-amber/30">\\n  Morno\\n</span>\\n\\n{/* Frio */}\\n<span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-teal-light/20 text-teal-shadow border border-teal-light/30">\\n  Frio\\n</span>\\n\\n{/* Tag Padrão (Locação) */}\\n<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber/10 text-amber border border-amber/20 font-medium text-sm">\\n  Locação\\n</div>`}
        >
          <div className="flex flex-wrap items-center gap-4">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-destructive/10 text-destructive border border-destructive/20">
              Quente
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber/20 text-amber-800 border border-amber/30">
              Morno
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-teal-light/20 text-teal-shadow border border-teal-light/30">
              Frio
            </span>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber/10 text-amber border border-amber/20 font-medium text-sm">
              Locação
            </div>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-mid/10 text-teal-deep border border-teal-mid/20 font-medium text-sm">
              Venda
            </div>
          </div>
        </ComponentShowcase>
      </section>

      {/* Cards */}
      <section id="cards" className="scroll-mt-8">
        <SectionHeader title="Cards" description="Estruturas em bloco para apresentação de informações complexas (Leads, Imóveis)." />
        
        <ComponentShowcase 
          title="Card de Funil Simplificado" 
          code={`<div className="bg-white border border-border rounded-xl p-4 shadow-sm">\\n  <div className="flex justify-between items-start mb-2">\\n    <div>\\n      <h4 className="font-bold text-ink">Mariana Costa</h4>\\n      <p className="text-xs text-slate">Apto 2 dorms · Jardins</p>\\n    </div>\\n    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-destructive/10 text-destructive border border-destructive/20">\\n      Quente\\n    </span>\\n  </div>\\n  <div className="mt-4 pt-3 border-t border-border flex justify-between items-center text-xs text-slate">\\n    <span className="font-medium text-teal-deep">R$ 890.000</span>\\n    <span>há 12 min</span>\\n  </div>\\n</div>`}
        >
          <div className="w-full max-w-sm bg-white border border-border rounded-xl p-4 shadow-sm hover:shadow-soft transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-bold text-ink">Mariana Costa</h4>
                <p className="text-xs text-slate">Apto 2 dorms · Jardins</p>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-destructive/10 text-destructive border border-destructive/20">
                Quente
              </span>
            </div>
            <div className="mt-4 pt-3 border-t border-border flex justify-between items-center text-xs text-slate">
              <span className="font-medium text-teal-deep">R$ 890.000</span>
              <span>há 12 min</span>
            </div>
          </div>
        </ComponentShowcase>

        <ComponentShowcase 
          title="Card de Negócios (Leads)" 
          code={`<article className="rounded-[1.25rem] border border-border bg-white shadow-soft p-4">\\n  <div className="flex w-full items-start gap-3">\\n    <div className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-teal-deep/10 font-serif text-sm font-semibold text-teal-deep">\\n      JD\\n      <span className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full border-2 border-white bg-destructive" />\\n    </div>\\n    <div className="min-w-0 flex-1">\\n      <div className="flex items-center gap-2">\\n        <span className="truncate text-sm font-semibold text-ink">João da Silva</span>\\n        <Bot className="size-3.5 text-teal-mid" />\\n        <span className="ml-auto shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold bg-teal-deep/10 text-teal-deep">\\n          Venda\\n        </span>\\n      </div>\\n      <span className="block text-xs text-slate">11 9999-9999</span>\\n    </div>\\n  </div>\\n\\n  <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">\\n    <button className="flex-1 rounded-full bg-teal-deep/10 px-3 py-1.5 text-xs font-semibold text-teal-deep">\\n      Abrir atendimento\\n    </button>\\n    <button className="flex size-7 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">\\n      <MessageCircle className="size-3.5" />\\n    </button>\\n  </div>\\n</article>`}
        >
          <article className="w-full max-w-sm rounded-[1.25rem] border border-border bg-white shadow-soft p-4 text-left">
            <div className="flex w-full items-start gap-3">
              <div className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-teal-deep/10 font-serif text-sm font-semibold text-teal-deep">
                JD
                <span className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full border-2 border-white bg-destructive" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm font-semibold text-ink">João da Silva</span>
                  <Bot className="size-3.5 text-teal-mid" />
                  <span className="ml-auto shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold bg-teal-deep/10 text-teal-deep">
                    Venda
                  </span>
                </div>
                <span className="block text-xs text-slate">11 9999-9999</span>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
              <button className="flex-1 rounded-full bg-teal-deep/10 px-3 py-1.5 text-xs font-semibold text-teal-deep transition-brand active:scale-95">
                Abrir atendimento
              </button>
              <button className="flex size-7 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
                <MessageCircle className="size-3.5" />
              </button>
            </div>
          </article>
        </ComponentShowcase>

        <ComponentShowcase 
          title="Card de Imóvel (Com Imagem)" 
          code={`<div className="group relative overflow-hidden rounded-[1.25rem] bg-white border border-border shadow-soft flex flex-col">\\n  <div className="relative aspect-[4/3] w-full overflow-hidden bg-fog">\\n    <img src="/placeholder.jpg" className="h-full w-full object-cover" />\\n    <div className="absolute left-3 top-3 flex flex-col gap-2">\\n      <span className="rounded-full bg-teal-deep/90 backdrop-blur px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">\\n        Venda\\n      </span>\\n    </div>\\n  </div>\\n  <div className="flex flex-1 flex-col p-4">\\n    <h3 className="line-clamp-2 text-sm font-bold text-ink leading-snug">\\n      Apartamento no Jardins com 3 suítes\\n    </h3>\\n    <div className="mt-4 pt-4 border-t border-border flex items-end justify-between">\\n      <p className="font-serif text-lg font-bold text-teal-deep">R$ 1.200.000</p>\\n    </div>\\n  </div>\\n</div>`}
        >
          <div className="w-full max-w-[280px] group relative overflow-hidden rounded-[1.25rem] bg-white border border-border shadow-soft flex flex-col text-left">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-fog">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-mid to-teal-deep opacity-10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Home className="w-12 h-12 text-teal-deep/20" />
              </div>
              <div className="absolute left-3 top-3 flex flex-col gap-2">
                <span className="rounded-full bg-teal-deep/90 backdrop-blur px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
                  Venda
                </span>
              </div>
            </div>
            <div className="flex flex-1 flex-col p-4">
              <h3 className="line-clamp-2 text-sm font-bold text-ink leading-snug">
                Apartamento Exemplo com 3 suítes e varanda gourmet
              </h3>
              <p className="mt-1 text-xs text-slate flex items-center gap-1">
                <MapPin className="size-3" /> Jardins, São Paulo
              </p>
              <div className="mt-4 pt-4 border-t border-border flex items-end justify-between">
                <p className="font-serif text-lg font-bold text-teal-deep">R$ 1.200.000</p>
              </div>
            </div>
          </div>
        </ComponentShowcase>
        
        <ComponentShowcase 
          title="Item de Histórico (Timeline / Nota)" 
          code={`<div className="flex gap-4">\\n  <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-amber/20 text-amber-600 shadow-sm">\\n    <Calendar className="size-4" />\\n  </div>\\n  <div className="flex-1 rounded-2xl bg-white border border-border p-4 shadow-sm">\\n    <div className="flex items-center justify-between gap-4">\\n      <span className="text-sm font-bold text-ink">Visita Agendada</span>\\n      <span className="shrink-0 text-xs text-slate">10/Oct</span>\\n    </div>\\n    <p className="mt-2 text-sm leading-relaxed text-slate">\\n      Visita agendada para sexta-feira.\\n    </p>\\n  </div>\\n</div>`}
        >
          <div className="w-full max-w-md flex gap-4 text-left">
            <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-amber/20 text-amber-600 shadow-sm border border-amber/30">
              <Calendar className="size-4" />
            </div>
            <div className="flex-1 rounded-2xl bg-white border border-border p-4 shadow-sm relative">
              <div className="absolute top-4 -left-[9px] w-4 h-4 bg-white border-b border-l border-border transform rotate-45" />
              <div className="flex items-center justify-between gap-4 relative z-10">
                <span className="text-sm font-bold text-ink">Visita Agendada</span>
                <span className="shrink-0 text-xs text-slate">10/Oct</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate relative z-10">
                Cliente confirmou a visita no decorado para a próxima sexta-feira às 15h.
              </p>
            </div>
          </div>
        </ComponentShowcase>

      </section>

      {/* Padrões de Código */}
      <section id="padroes" className="scroll-mt-8">
        <SectionHeader title="Padrões de Código e Arquitetura" description="Convenções e boas práticas no projeto." />
        
        <div className="bg-white border border-border rounded-2xl p-6 shadow-sm space-y-4 text-slate leading-relaxed">
          <ul className="space-y-4 list-disc list-inside">
            <li>
              <strong className="text-ink">Estrutura de Componentes:</strong> Os componentes específicos de domínio (como <code>screen-negocios.tsx</code> e formulários) residem na pasta <code>components/app</code>. Componentes genéricos de UI (se houver via Shadcn) ficariam em <code>components/ui</code>.
            </li>
            <li>
              <strong className="text-ink">Dados:</strong> O mock atual está em <code>lib/app-data.ts</code> (Leads, timeline) e <code>lib/empreendimentos-data.ts</code>. Quando for integrar ao backend, estes serão os primeiros arquivos a serem substituídos por requisições fetch/SWR.
            </li>
            <li>
              <strong className="text-ink">Responsividade e Touch:</strong> Este projeto é um web app "mobile-first". Sempre utilize gestos (ex: <code>onTouchStart/onTouchEnd</code> implementados em <code>screen-negocios.tsx</code> para o Swipe) antes de pensar em paginações complexas via clique.
            </li>
            <li>
              <strong className="text-ink">Ícones:</strong> Utilizamos exclusivamente a biblioteca <a href="https://lucide.dev" className="text-teal-deep hover:underline" target="_blank" rel="noreferrer">Lucide React</a>. Importe-os destruturando: <code>{`import { Home, Phone } from 'lucide-react'`}</code>.
            </li>
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* WIKI DO APP */}
      {/* ---------------------------------------------------- */}

      <div className="pt-24 border-t-4 border-fog">
        <h1 className="text-4xl font-extrabold text-teal-deep mb-4">Wiki do Aplicativo</h1>
        <p className="text-lg text-slate leading-relaxed mb-12">
          Esta seção é a documentação viva (Wiki) de todo o funcionamento da aplicação. Aqui você encontra as regras de negócio, o fluxo de cada tela, e explicações detalhadas sobre como o CRM Microsistec opera nos bastidores.
        </p>

        {/* Visão Geral */}
        <section id="wiki-visao-geral" className="scroll-mt-8 mb-20">
          <SectionHeader title="Visão Geral (Painel Hoje)" description="A central de comando do corretor de imóveis." />
          <div className="space-y-6 text-slate leading-relaxed bg-white p-6 md:p-8 rounded-2xl border border-border shadow-sm min-w-0">
            <h3 className="text-lg font-bold text-ink">O que é?</h3>
            <p>O painel "Hoje" é a tela inicial do aplicativo, acessada logo após o login. Funciona como um cockpit diário que resume os compromissos, finanças, metas e imóveis recomendados.</p>
            
            <h3 className="text-lg font-bold text-ink mt-8">O que faz?</h3>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Resumo Financeiro:</strong> Exibe comissões recebidas, a receber e estimativa futura baseada em propostas em andamento.</li>
              <li><strong>Metas Mensais:</strong> Um gráfico de progresso (ex: "Faltam R$ 32.500 para atingir a meta").</li>
              <li><strong>Atividades Diárias:</strong> Timeline rolável de tarefas, visitas e ligações agendadas para o dia.</li>
              <li><strong>Match de Imóveis:</strong> Carrossel de imóveis recomendados baseados no perfil dos clientes mais quentes do funil.</li>
            </ul>

            <h3 className="text-lg font-bold text-ink mt-8">Como faz? (Regras de Negócio)</h3>
            <p>Os dados na tela principal são agregados das atividades cadastradas no módulo de <em>Clientes</em>. A barra de rolagem horizontal permite visualizar dias futuros na agenda. Quando uma atividade é tocada, o sistema abre o Sheet de edição de atividade.</p>
          </div>
        </section>

        {/* Módulo de Negócios */}
        <section id="wiki-negocios" className="scroll-mt-8 mb-20">
          <SectionHeader title="Módulo de Negócios (Kanban)" description="Gestão de pipeline de vendas e locações." />
          <div className="space-y-6 text-slate leading-relaxed bg-white p-6 md:p-8 rounded-2xl border border-border shadow-sm min-w-0">
            <h3 className="text-lg font-bold text-ink">O que é?</h3>
            <p>A aba central do app (ícone de cifrão). É onde o ciclo de vida da venda/locação acontece, através de um quadro Kanban.</p>

            <h3 className="text-lg font-bold text-ink mt-8">O que faz?</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Visualiza negócios em etapas: <em>Prospecção</em>, <em>Qualificação</em>, <em>Proposta</em> e <em>Fechamento</em>.</li>
              <li>Permite mover cards entre colunas deslizando a tela horizontalmente (Swipe).</li>
              <li>Criação "Fast" de novos negócios apertando o botão <strong>+</strong> no topo.</li>
            </ul>

            <h3 className="text-lg font-bold text-ink mt-8">Como faz? (Regras de Negócio)</h3>
            <p>
              O sistema foi construído pensando "Mobile First". No celular, o corretor vê uma coluna por vez, e desliza <em>(Swipe)</em> para a lateral para ver as próximas etapas do funil. O sistema detecta o arraste do dedo via eventos <code>onTouchStart</code>, <code>onTouchMove</code> e <code>onTouchEnd</code>. 
            </p>
            <p>Cada card exibe uma <strong>Badge de Temperatura</strong>. A temperatura (Quente/Morno/Frio) determina a urgência do negócio. Os cards possuem também identificação visual rápida de quando a última interação ocorreu, mudando de cor para alertar se um negócio estiver abandonado.</p>
          </div>
        </section>

        {/* Relacionamento (FORD) */}
        <section id="wiki-relacionamento" className="scroll-mt-8 mb-20">
          <SectionHeader title="Relacionamento (Clientes & FORD 4Q)" description="Cadastro, histórico e perfis psicológicos de leads." />
          <div className="space-y-6 text-slate leading-relaxed bg-white p-6 md:p-8 rounded-2xl border border-border shadow-sm min-w-0">
            <h3 className="text-lg font-bold text-ink">O que é?</h3>
            <p>A tela de Clientes (acessada pelo ícone de usuários). É a central do CRM (Customer Relationship Management) da Microsistec, onde reside o histórico completo de interação.</p>

            <h3 className="text-lg font-bold text-ink mt-8">O que faz?</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Listagem de contatos com filtros rápidos (Favoritos, Ativos, etc).</li>
              <li><strong>Método F.O.R.D:</strong> Coleta de dados avançados sobre a <em>Família</em>, <em>Ocupação</em>, <em>Recreação</em> e <em>Desejos (Sonhos)</em> do cliente.</li>
              <li><strong>Matriz 4Q:</strong> Classificação das intenções de compra.</li>
              <li><strong>Timeline Interativa:</strong> Registro cronológico de visitas, ligações, e mensagens trocadas.</li>
            </ul>

            <h3 className="text-lg font-bold text-ink mt-8">Como faz? (Regras de Negócio)</h3>
            <p>
              Ao abrir o perfil de um cliente, o usuário visualiza uma ficha completa. O grande diferencial é a seção FORD 4Q, que utiliza acordiões expansíveis. Ao preencher os sonhos e ocupações de um lead, o algoritmo do app pode, futuramente, gerar um "match" perfeito com imóveis novos no mercado (ex: cliente gosta de Tênis, o app recomenda condomínios com quadra de Tênis).
            </p>
            <p>A aba de <strong>Atividades</strong> permite registrar novos contatos no sistema via um menu fixo <code>Sheet</code> animado na parte inferior da tela, que possui integração com calendário e envio de notificações.</p>
          </div>
        </section>

        {/* Captação */}
        <section id="wiki-captacao" className="scroll-mt-8 mb-20">
          <SectionHeader title="Captação (Imóveis)" description="Adição de portfólio, unidades e preenchimento IA." />
          <div className="space-y-6 text-slate leading-relaxed bg-white p-6 md:p-8 rounded-2xl border border-border shadow-sm min-w-0">
            <h3 className="text-lg font-bold text-ink">O que é?</h3>
            <p>Onde o corretor insere novos produtos para venda ou locação, incluindo imóveis avulsos e grandes empreendimentos.</p>

            <h3 className="text-lg font-bold text-ink mt-8">O que faz?</h3>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Captação Fast:</strong> Permite salvar um rascunho apenas com fotos e endereço no momento da visita, para concluir os detalhes no computador depois.</li>
              <li><strong>Captação de Empreendimentos:</strong> Gestão de prédios/loteamentos e suas respectivas unidades (lotes, apartamentos) individualizadas.</li>
              <li><strong>Envio de Mídia:</strong> Possibilidade de tirar fotos na hora, carregar da galeria e anexar ao formulário dinâmico.</li>
            </ul>

            <h3 className="text-lg font-bold text-ink mt-8">Como faz? (Regras de Negócio)</h3>
            <p>
              Os formulários de captação utilizam um sistema multi-passos controlados por variáveis de estado (<code>fase === 'formulario' | 'upload' | 'analisando'</code>). 
              A submissão de fotos interage nativamente com a câmera do celular através de inputs HTML do tipo <code>file accept="image/*"</code> que permanecem ocultos e são acionados via botões visuais da interface (<code>fileInputRef.current.click()</code>).
            </p>
          </div>
        </section>

        {/* Inteligência Artificial */}
        <section id="wiki-inteligencia" className="scroll-mt-8 mb-20">
          <SectionHeader title="Inteligência Artificial (Albert)" description="Automação, Upsell e IA Generativa na rotina." />
          <div className="space-y-6 text-slate leading-relaxed bg-white p-6 md:p-8 rounded-2xl border border-border shadow-sm min-w-0">
            <h3 className="text-lg font-bold text-ink">O que é?</h3>
            <p>O "Albert" é a IA embarcada dentro do sistema Microsistec. Ele ajuda a automatizar o trabalho braçal e trazer insights dos dados do CRM.</p>

            <h3 className="text-lg font-bold text-ink mt-8">O que faz?</h3>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Chatbot Especialista:</strong> Pode ser acionado no Painel Hoje para sugerir abordagens a clientes que esfriaram no funil ou buscar pendências diárias.</li>
              <li><strong>Visão Computacional na Captação:</strong> Ao subir as fotos de um imóvel novo, a IA varre as imagens para preencher os campos do formulário sozinha (detecta banheiros, suites, área externa, se é apartamento ou casa).</li>
              <li><strong>Geração de Descrições:</strong> Transforma atributos do imóvel (3 dorms, 2 vagas) em descrições românticas e atrativas para portais de anúncio.</li>
            </ul>

            <h3 className="text-lg font-bold text-ink mt-8">Como faz? (Regras de Negócio)</h3>
            <p>
              Na tela de Captação, se o corretor tenta usar a IA e não possui o plano ativado, um <strong>Upsell Modal</strong> bloqueia a ação, utilizando gatilhos de ancoragem cognitiva (Plano A vs B) e um selo animado de "Mais Popular" na versão com IA. Se a IA estiver ativada, uma animação com barras de progresso circulares (SVG Stroke) simula a análise neural, passando por estágios (OCR, Visão Computacional, Estimativa de Mercado). O formulário é então pré-preenchido utilizando mutação de estados nos componentes do React.
            </p>
          </div>
        </section>

      </div>

    </div>
  )
}

// Helpers components for the documentation page

function SectionHeader({ title, description }: { title: string, description: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-ink mb-2">{title}</h2>
      <p className="text-slate">{description}</p>
      <hr className="mt-6 border-border" />
    </div>
  )
}

function ColorCard({ bgClass, textClass, name, hex, twClass }: { bgClass: string, textClass: string, name: string, hex: string, twClass: string }) {
  return (
    <div className="group rounded-xl overflow-hidden shadow-sm border border-border">
      <div className={`h-24 w-full ${bgClass} flex items-end p-3`} />
      <div className="bg-white p-3">
        <p className="font-bold text-ink text-sm">{name}</p>
        <p className="text-xs text-slate mt-1 font-mono">{hex}</p>
        <p className="text-[10px] text-slate/70 mt-1 font-mono">bg-{twClass.replace('bg-', '').split(' ')[0]}</p>
      </div>
    </div>
  )
}

function ComponentShowcase({ title, code, children }: { title: string, code: string, children: React.ReactNode }) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mb-12 border border-border rounded-2xl overflow-hidden bg-white shadow-sm min-w-0">
      <div className="p-4 border-b border-border bg-fog/50 flex justify-between items-center">
        <h3 className="font-bold text-ink text-sm">{title}</h3>
      </div>
      <div className="p-4 sm:p-8 bg-snow flex items-center justify-center min-h-[160px]">
        {children}
      </div>
      <div className="relative group border-t border-border bg-ink">
        <div className="absolute top-3 right-3">
          <button 
            onClick={handleCopy}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
            title="Copiar código"
          >
            {copied ? <Check className="w-4 h-4 text-teal-light" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
        <pre className="p-4 sm:p-6 overflow-x-auto text-xs sm:text-sm text-fog font-mono leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}
