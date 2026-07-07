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
          {/* Wrapper to utilize full width, allowing fluid responsive behavior */}
          <div className="w-full h-full flex flex-col relative bg-background shadow-sm">
            
            {/* Topbar for mobile/tablet fallback */}
            <div className="md:hidden glass-header flex items-center justify-between px-5 py-3">
              <div className="flex items-center gap-2">
                <img src={BRAND.logoUrl} alt={BRAND.name} className="size-8 object-contain" />
                <span className="font-serif text-base font-semibold text-foreground">{BRAND.name}</span>
              </div>
            </div>

            {/* Desktop Topbar */}
            <header className="hidden md:flex items-center justify-between px-8 py-4 border-b border-border bg-white sticky top-0 z-10">
              <div className="flex-1 max-w-xl">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Buscar imóveis, leads, contratos..."
                    className="block w-full pl-10 pr-3 py-2 border border-border rounded-full bg-snow text-sm placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="relative p-2 rounded-full border border-border text-foreground hover:bg-muted transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-amber" />
                </button>
                <div className="flex items-center gap-2">
                  <div className="text-right hidden lg:block">
                    <p className="text-sm font-semibold text-foreground leading-tight">Jefferson Costa</p>
                    <p className="text-[10px] text-muted-foreground">Corretor · SP</p>
                  </div>
                  <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                    JC
                  </div>
                </div>
              </div>
            </header>

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
