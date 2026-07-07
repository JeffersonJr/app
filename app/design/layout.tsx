import Link from 'next/link'
import { Palette, Type, LayoutTemplate, Zap, Box, Code2, ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Microsistec Design System',
}

export default function DesignSystemLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-snow flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-border fixed h-screen overflow-y-auto hidden md:block">
        <div className="p-6">
          <Link href="/" className="inline-flex items-center gap-2 text-slate hover:text-teal-deep transition-colors mb-8 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Voltar ao App
          </Link>
          
          <h1 className="text-xl font-bold text-ink mb-6">Design System</h1>
          
          <nav className="space-y-6">
            <div>
              <h2 className="text-xs font-bold text-slate uppercase tracking-wider mb-3">Fundações</h2>
              <ul className="space-y-1">
                <NavItem href="#logo-icones" icon={<Palette className="w-4 h-4" />}>Logo & Ícones</NavItem>
                <NavItem href="#cores" icon={<Palette className="w-4 h-4" />}>Cores</NavItem>
                <NavItem href="#tipografia" icon={<Type className="w-4 h-4" />}>Tipografia</NavItem>
                <NavItem href="#sombras-efeitos" icon={<Zap className="w-4 h-4" />}>Sombras & Efeitos</NavItem>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xs font-bold text-slate uppercase tracking-wider mb-3">Formulários & Navegação</h2>
              <ul className="space-y-1">
                <NavItem href="#inputs" icon={<LayoutTemplate className="w-4 h-4" />}>Inputs & Selects</NavItem>
                <NavItem href="#tabs" icon={<LayoutTemplate className="w-4 h-4" />}>Tabs (Abas)</NavItem>
              </ul>
            </div>

            <div>
              <h2 className="text-xs font-bold text-slate uppercase tracking-wider mb-3">Componentes</h2>
              <ul className="space-y-1">
                <NavItem href="#botoes" icon={<Box className="w-4 h-4" />}>Botões</NavItem>
                <NavItem href="#badges" icon={<LayoutTemplate className="w-4 h-4" />}>Badges & Tags</NavItem>
                <NavItem href="#cards" icon={<LayoutTemplate className="w-4 h-4" />}>Cards (Imóveis, Leads)</NavItem>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xs font-bold text-slate uppercase tracking-wider mb-3">Desenvolvimento</h2>
              <ul className="space-y-1">
                <NavItem href="#padroes" icon={<Code2 className="w-4 h-4" />}>Padrões de Código</NavItem>
              </ul>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 bg-snow min-h-screen">
        <div className="max-w-4xl mx-auto p-8 md:p-12 lg:p-16">
          {children}
        </div>
      </main>
    </div>
  )
}

function NavItem({ href, icon, children }: { href: string, icon: React.ReactNode, children: React.ReactNode }) {
  return (
    <li>
      <a href={href} className="flex items-center gap-2 px-3 py-2 text-sm text-slate hover:text-teal-deep hover:bg-fog rounded-lg transition-colors font-medium">
        {icon}
        {children}
      </a>
    </li>
  )
}
