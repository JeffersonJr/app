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
import { ScreenDesempenho } from '../../components/app/screen-desempenho'
import { clientes, funil } from '@/lib/app-data'
import { useOnboarding } from '@/lib/contexts/OnboardingContext'
import { useEffect } from 'react'

export default function Page() {
  const { isFirstLogin, startTour } = useOnboarding()
  const tenants = [
    { id: 'evolves-prime', nome: 'Evolves Prime', creci: 'CRECI 4321-J', logo: '💼', hasCheckin: true },
    { id: 'lopes-imob', nome: 'Lopes Imobiliária', creci: 'CRECI 9876-J', logo: '🏢', hasCheckin: true },
    { id: 'remax-parceria', nome: 'Remax Parceria', creci: 'CRECI 7755-J', logo: '🏠', hasCheckin: false }
  ]
  const [tenantAtivo, setTenantAtivo] = useState(tenants[0])
  const [tab, setTab] = useState<TabId>('hoje')
  const [quickAddAberto, setQuickAddAberto] = useState(false)
  const [quickAddAcao, setQuickAddAcao] = useState<any>(null)
  const [quickAddDefaultCliente, setQuickAddDefaultCliente] = useState<string | undefined>()
  const [clienteAbertoId, setClienteAbertoId] = useState<string | null>(null)
  const [atendimentoAbertoId, setAtendimentoAbertoId] = useState<string | null>(null)
  const [notificacoesAbertas, setNotificacoesAbertas] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    // startTour('general')
  }, [isFirstLogin, startTour])

  // Um lead do funil abre o perfil do cliente correspondente
  function abrirClientePorLead(leadId: string) {
    const lead = funil.flatMap((e) => e.leads).find((l) => l.id === leadId)
    const cliente = lead
      ? clientes.find((c) => c.nome === lead.nome)
      : clientes.find((c) => c.id === leadId)
    setClienteAbertoId((cliente ?? clientes[0]).id)
    setTab('clientes')
  }

  function abrirAtendimentoPorId(id: string | null | undefined) {
    if (!id) {
      setToastMessage('Atividade criada com sucesso!')
      setTimeout(() => setToastMessage(''), 3000)
      return
    }
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
    <main className="flex min-h-dvh bg-background w-full">
      {/* Container principal */}
      <div className="relative flex h-dvh w-full flex-col overflow-hidden bg-background">

        {/* Header global com logo evolves e notificações */}
        <div className="glass-header flex items-center justify-between px-5 py-3">
          {/* Logo evolves */}
          <button type="button" onClick={() => setTab('hoje')} className="flex items-center gap-2 transition-brand active:opacity-70 text-left">
            <img
              src="/logo-evolves.svg"
              alt="evolves"
              className="size-8 object-contain"
            />
            <span className="font-serif text-base font-semibold text-foreground">evolves</span>
          </button>

          <div className="flex items-center gap-2">
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

            {/* Botão de Perfil */}
            <button
              id="tour-target-profile-btn"
              onClick={() => setTab('perfil')}
              type="button"
              aria-label="Meu Perfil"
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#2B5250] text-sm font-semibold text-white shadow-sm border border-[#2B5250] transition-transform active:scale-95"
            >
              JC
            </button>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {tab === 'hoje' && (
            <ScreenHoje
              onVerFunil={() => setTab('negocios')}
              onVerCliente={(id) => {
                const leadInFunil = funil.flatMap((e) => e.leads).find((l) => l.id === id)
                const client = leadInFunil
                  ? clientes.find((c) => c.nome === leadInFunil.nome)
                  : (clientes.find((c) => c.id === id) || clientes.find((c) => c.nome === id))
                setClienteAbertoId(client ? client.id : id)
                setTab('clientes')
              }}
              onVerPerfil={() => setTab('perfil')}
              onVerAtendimento={abrirAtendimentoPorId}
              onAbrirNovaAtividade={(clienteId?: string) => {
                setQuickAddAcao('atividade')
                setQuickAddDefaultCliente(clienteId)
                setQuickAddAberto(true)
              }}
              onVerAtividades={() => setTab('atividades')}
              onVerDesempenho={() => setTab('desempenho')}
              tenantAtivo={tenantAtivo}
              setTenantAtivo={setTenantAtivo}
              tenants={tenants}
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
          {tab === 'desempenho' && <ScreenDesempenho onBack={() => setTab('hoje')} />}
          {tab === 'imoveis' && (
            <ScreenImoveis
              onCaptar={() => { setQuickAddAcao('captar-imovel'); setQuickAddAberto(true); }}
              tenantAtivo={tenantAtivo}
              setTenantAtivo={setTenantAtivo}
              tenants={tenants}
            />
          )}
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
          onQuickAdd={() => { setQuickAddAcao(null); setQuickAddAberto(true); }}
        />

        {quickAddAberto && (
        <QuickAddSheet
          onClose={() => { setQuickAddAberto(false); setQuickAddAcao(null); setQuickAddDefaultCliente(undefined); }}
          defaultAcao={quickAddAcao}
          defaultClienteId={quickAddDefaultCliente}
          onAtividadeCriada={(id) => abrirAtendimentoPorId(id)}
        />
      )}
        {notificacoesAbertas && (
          <NotificacoesPanel
            onClose={() => setNotificacoesAbertas(false)}
            onVerAtendimento={abrirAtendimentoPorId}
          />
        )}

        {/* Toast Feedback */}
        {toastMessage && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-5 fade-in duration-300">
            <div className="rounded-2xl bg-foreground px-4 py-3 text-sm font-semibold text-background shadow-xl">
              {toastMessage}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
