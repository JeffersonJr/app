'use client'

import { Building2, Home, Plus, TrendingUp, Users, CalendarDays, User } from 'lucide-react'

export type TabId = 'hoje' | 'negocios' | 'atividades' | 'imoveis' | 'clientes' | 'perfil' | 'desempenho'

const tabs: { id: TabId; label: string; icon: any }[] = [
  { id: 'hoje', label: 'Home', icon: Home },
  { id: 'negocios', label: 'Negócios', icon: TrendingUp },
  { id: 'imoveis', label: 'Imóveis', icon: Building2 },
  { id: 'clientes', label: 'Clientes', icon: Users },
]

export function TabBar({
  active,
  onChange,
  onQuickAdd,
}: {
  active: TabId
  onChange: (tab: TabId) => void
  onQuickAdd: () => void
}) {
  const left = tabs.slice(0, 2)
  const right = tabs.slice(2)

  return (
    <nav
      aria-label="Navegação principal"
      className="absolute inset-x-0 bottom-0 z-40 border-t border-border bg-background pb-[env(safe-area-inset-bottom)]"
    >
      <div className="flex items-center justify-between px-2">
        {left.map((tab) => (
          <TabButton key={tab.id} tab={tab} active={active === tab.id} onChange={onChange} />
        ))}

        <button
          id="tour-target-add-fab"
          type="button"
          onClick={onQuickAdd}
          aria-label="Adicionar novo"
          className="relative -top-4 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-brand active:scale-95"
        >
          <Plus className="size-6" strokeWidth={1.5} />
        </button>

        {right.map((tab) => (
          <TabButton key={tab.id} tab={tab} active={active === tab.id} onChange={onChange} />
        ))}
      </div>
    </nav>
  )
}

function TabButton({
  tab,
  active,
  onChange,
}: {
  tab: { id: TabId; label: string; icon: any }
  active: boolean
  onChange: (tab: TabId) => void
}) {
  const Icon = tab.icon
  return (
    <button
      id={`tab-${tab.id}`}
      type="button"
      onClick={() => onChange(tab.id)}
      aria-current={active ? 'page' : undefined}
      className={`flex min-w-16 flex-col items-center gap-1 px-2 py-2.5 transition-brand ${
        active ? 'text-primary' : 'text-muted-foreground'
      }`}
    >
      <Icon className="size-6" strokeWidth={active ? 2 : 1.5} />
      <span className={`text-[10px] leading-none ${active ? 'font-semibold' : 'font-medium'}`}>
        {tab.label}
      </span>
    </button>
  )
}
