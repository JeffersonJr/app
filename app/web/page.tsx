'use client'

import { useState } from 'react'
import { ScreenHoje } from '@/components/app/screen-hoje'
import { ScreenImoveis } from '@/components/app/screen-imoveis'
import { ScreenNegocios } from '@/components/app/screen-negocios'
import { ScreenClientes } from '@/components/app/screen-clientes'
import { ScreenPerfil } from '@/components/app/screen-perfil'
import { LayoutDashboard, Users, Home, Settings, PieChart, DollarSign } from 'lucide-react'
import { BRAND } from '@/lib/branding'
import Link from 'next/link'

type TabType = 'hoje' | 'kanban' | 'clientes' | 'imoveis' | 'perfil'

export default function WebSystemPage() {
  const [activeTab, setActiveTab] = useState<TabType>('hoje')
  const [notificacoesAbertas, setNotificacoesAbertas] = useState(false)
  
  const navItems = [
    { id: 'hoje', label: 'Painel Hoje', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'kanban', label: 'Negócios', icon: <DollarSign className="w-5 h-5" /> },
    { id: 'clientes', label: 'Clientes', icon: <Users className="w-5 h-5" /> },
    { id: 'imoveis', label: 'Imóveis', icon: <Home className="w-5 h-5" /> },
    { id: 'perfil', label: 'Configurações', icon: <Settings className="w-5 h-5" /> },
  ]

  return (
    <div className="flex w-full min-h-screen bg-snow">
      {/* Sidebar Desktop */}
      <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col">
        <div className="p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2 transition-brand active:opacity-70 text-left">
            <img
              src={BRAND.logoUrl}
              alt={BRAND.name}
              className="size-8 object-contain"
            />
            <span className="font-serif text-lg font-semibold text-foreground">{BRAND.name}</span>
          </Link>
          <div className="mt-2 text-xs font-bold text-amber bg-amber/10 px-2 py-0.5 rounded-full inline-block uppercase tracking-wider">
            Web Desktop
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as TabType)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm ${
                activeTab === item.id 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-2">
            <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
              JC
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-foreground">Jefferson Costa</p>
              <p className="text-xs text-muted-foreground">Corretor Associado</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative flex flex-col h-screen">
        <div className="flex-1 flex justify-center w-full">
          {/* Wrapper to constrain width slightly for readability, matching CRM feel but wider */}
          <div className="w-full max-w-5xl mx-auto h-full flex flex-col relative bg-background border-x border-border shadow-sm">
            
            {/* Topbar for mobile/tablet fallback inside the web system */}
            <div className="md:hidden glass-header flex items-center justify-between px-5 py-3">
              <div className="flex items-center gap-2">
                <img src={BRAND.logoUrl} alt={BRAND.name} className="size-8 object-contain" />
                <span className="font-serif text-base font-semibold text-foreground">{BRAND.name}</span>
              </div>
            </div>

            {/* Render Screen */}
            <div className="flex-1 overflow-y-auto scrollbar-none pb-24 md:pb-0 relative">
              {activeTab === 'hoje' && <ScreenHoje setTab={setActiveTab} />}
              {activeTab === 'kanban' && <ScreenNegocios />}
              {activeTab === 'clientes' && <ScreenClientes onNotificacoes={() => setNotificacoesAbertas(true)} />}
              {activeTab === 'imoveis' && <ScreenImoveis />}
              {activeTab === 'perfil' && <ScreenPerfil />}
            </div>
            
          </div>
        </div>
      </main>
    </div>
  )
}
