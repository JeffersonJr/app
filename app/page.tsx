import Link from 'next/link'
import { LayoutDashboard, Globe, Palette, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Microsistec - Central de Acesso',
}

export default function HubPage() {
  return (
    <div className="min-h-screen bg-snow flex flex-col items-center justify-center p-6 font-sans">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-ink mb-4">
          Bem-vindo à <span className="text-teal-deep">Microsistec.</span>
        </h1>
        <p className="text-slate text-lg">
          Selecione o ambiente que deseja acessar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {/* Card: App CRM */}
        <Link 
          href="/crm" 
          className="group glass-panel p-8 rounded-3xl flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-soft border-2 border-transparent hover:border-teal-deep/20"
        >
          <div className="w-16 h-16 rounded-2xl bg-teal-deep flex items-center justify-center text-white mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
            <LayoutDashboard className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-ink mb-3">App (CRM)</h2>
          <p className="text-slate mb-8 flex-1">
            Acesse o protótipo funcional do CRM imobiliário com gestão de funil e método FORD.
          </p>
          <div className="text-teal-deep font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
            Acessar <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

        {/* Card: Sistema Web (Disabled) */}
        <div 
          className="group glass-panel p-8 rounded-3xl flex flex-col items-center text-center shadow-none border-2 border-border/50 opacity-60 cursor-not-allowed bg-fog/30"
        >
          <div className="w-16 h-16 rounded-2xl bg-slate/20 flex items-center justify-center text-slate mb-6">
            <Globe className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-ink mb-1">Sistema Web</h2>
          <span className="text-xs font-bold text-amber bg-amber/10 px-2 py-0.5 rounded-full mb-3 uppercase tracking-wider">Em breve</span>
          <p className="text-slate mb-8 flex-1">
            A versão desktop completa com relatórios avançados e gestão de equipe.
          </p>
          <div className="text-slate/50 font-bold flex items-center gap-2">
            Indisponível
          </div>
        </div>

        {/* Card: Site Institucional */}
        <Link 
          href="/site" 
          className="group glass-panel p-8 rounded-3xl flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-soft border-2 border-transparent hover:border-amber/20"
        >
          <div className="w-16 h-16 rounded-2xl bg-amber flex items-center justify-center text-white mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
            <Globe className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-ink mb-3">Site Institucional</h2>
          <p className="text-slate mb-8 flex-1">
            Visite a landing page de marketing focada em conversão e demonstração do produto.
          </p>
          <div className="text-amber font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
            Acessar <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

        {/* Card: Design System */}
        <Link 
          href="/design" 
          className="group glass-panel p-8 rounded-3xl flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-soft border-2 border-transparent hover:border-slate/20"
        >
          <div className="w-16 h-16 rounded-2xl bg-slate flex items-center justify-center text-white mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
            <Palette className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-ink mb-3">Design System</h2>
          <p className="text-slate mb-8 flex-1">
            Explore a documentação técnica, cores, tipografia e os componentes base do projeto.
          </p>
          <div className="text-slate font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
            Acessar <ArrowRight className="w-4 h-4" />
          </div>
        </Link>
      </div>
    </div>
  )
}
