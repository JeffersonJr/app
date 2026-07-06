'use client'

import { useState } from 'react'
import { Bell } from 'lucide-react'
import { QuickAddSheet } from '@/components/app/quick-add-sheet'
import { ScreenClientes } from '@/components/app/screen-clientes'
import { ScreenAtividades } from '@/components/app/screen-atividades'
import { ScreenHoje } from '@/components/app/screen-hoje'
import { ScreenImoveis } from '@/components/app/screen-imoveis'
import { ScreenNegocios } from '@/components/app/screen-negocios'
import { TabBar, type TabId } from '@/components/app/tab-bar'
import { NotificacoesPanel } from '@/components/app/notificacoes-panel'
import { ScreenPerfil } from '@/components/app/screen-perfil'
import { clientes, funil } from '@/lib/app-data'

export default function Page() {
  const [tab, setTab] = useState<TabId>('hoje')
  const [quickAddAberto, setQuickAddAberto] = useState(false)
  const [clienteAbertoId, setClienteAbertoId] = useState<string | null>(null)
  const [atendimentoAbertoId, setAtendimentoAbertoId] = useState<string | null>(null)
  const [notificacoesAbertas, setNotificacoesAbertas] = useState(false)

  // Um lead do funil abre o perfil do cliente correspondente
  function abrirClientePorLead(leadId: string) {
    const lead = funil.flatMap((e) => e.leads).find((l) => l.id === leadId)
    const cliente = lead
      ? clientes.find((c) => c.nome === lead.nome)
      : clientes.find((c) => c.id === leadId)
    setClienteAbertoId((cliente ?? clientes[0]).id)
    setTab('clientes')
  }

  function abrirAtendimentoPorId(id: string) {
    setTab('negocios')
    setAtendimentoAbertoId(id)
  }

  function trocarTab(novaTab: TabId) {
    setClienteAbertoId(null)
    setAtendimentoAbertoId(null)
    setTab(novaTab)
  }

  function handleLogout() {
    window.location.href = '/login'
  }

  return (
    <main className="flex min-h-dvh justify-center bg-fog sm:py-6">
      {/* Moldura mobile */}
      <div className="relative flex h-dvh w-full max-w-md flex-col overflow-hidden bg-background sm:h-[min(56rem,calc(100dvh-3rem))] sm:rounded-[2.5rem] sm:border-8 sm:border-teal-shadow sm:shadow-2xl">

        {/* Header global com logo Microsistec e notificações */}
        <div className="glass-header flex items-center justify-between px-5 py-3">
        {/* Logo Microsistec */}
          <div className="flex items-center gap-2">
              <img
                src="/logo.svg"
                alt="Microsistec"
                className="size-8 object-contain"
              />
            <span className="font-serif text-base font-semibold text-foreground">Microsistec</span>
          </div>

          {/* Botão de notificações */}
          <button
            type="button"
            aria-label="Notificações"
            onClick={() => setNotificacoesAbertas(true)}
            className="relative flex size-10 items-center justify-center rounded-full bg-card border border-border text-foreground shadow-sm transition-brand active:scale-95"
          >
            <Bell className="size-5" strokeWidth={1.5} />
            {/* Badge de não lidas */}
            <span className="absolute right-2 top-2 size-2 rounded-full bg-amber" aria-hidden="true" />
          </button>
        </div>

        {/* Conteúdo principal */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {tab === 'hoje' && (
            <ScreenHoje
              onVerFunil={() => trocarTab('negocios')}
              onVerCliente={abrirClientePorLead}
              onVerPerfil={() => setTab('perfil')}
              onVerAtendimento={abrirAtendimentoPorId}
            />
          )}
          {tab === 'negocios' && (
            <ScreenNegocios 
              onVerCliente={abrirClientePorLead} 
              abrirAtendimentoId={atendimentoAbertoId}
              onAtendimentoAberto={() => setAtendimentoAbertoId(null)}
            />
          )}
          {tab === 'atividades' && <ScreenAtividades />}
          {tab === 'imoveis' && <ScreenImoveis />}
          {tab === 'clientes' && (
            <ScreenClientes
              clienteAbertoId={clienteAbertoId}
              onFecharCliente={() => setClienteAbertoId(null)}
              onAbrirCliente={setClienteAbertoId}
            />
          )}
          {tab === 'perfil' && (
            <ScreenPerfil
              onNotificacoes={() => setNotificacoesAbertas(true)}
              onLogout={handleLogout}
            />
          )}
        </div>

        <TabBar
          active={tab}
          onChange={trocarTab}
          onQuickAdd={() => setQuickAddAberto(true)}
        />

        {quickAddAberto && <QuickAddSheet onClose={() => setQuickAddAberto(false)} />}
        {notificacoesAbertas && (
          <NotificacoesPanel 
            onClose={() => setNotificacoesAbertas(false)} 
            onVerAtendimento={abrirAtendimentoPorId} 
          />
        )}
      </div>
    </main>
  )
}
