import Link from 'next/link'
import { Check, X, Sparkles } from 'lucide-react'

export const metadata = {
  title: 'Planos e Preços | Microsistec CRM',
}

export default function PricingPage() {
  return (
    <div className="flex flex-col bg-snow min-h-screen">
      <section className="pt-24 pb-16 bg-white border-b border-border/50 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-ink mb-6">
          Invista no seu <span className="text-teal-deep">fechamento.</span>
        </h1>
        <p className="text-slate max-w-2xl mx-auto text-lg">
          Escolha o plano ideal para alavancar suas vendas. Sem taxas escondidas. Cancele quando quiser.
        </p>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
          
          {/* Plano Básico */}
          <div className="bg-white rounded-3xl border border-border p-8 shadow-sm">
            <h3 className="text-xl font-bold text-ink mb-2">Padrão</h3>
            <p className="text-sm text-slate mb-6">Para o corretor autônomo que quer organização total.</p>
            <div className="mb-8">
              <span className="text-4xl font-extrabold text-ink">R$ 149</span>
              <span className="text-slate">/mês</span>
            </div>
            
            <Link href="/crm" className="block w-full text-center bg-fog hover:bg-border text-ink font-bold py-3 rounded-xl transition-colors mb-8">
              Começar Agora
            </Link>

            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-ink"><Check className="size-5 text-teal-mid" /> Gestão de Funil (Kanban)</li>
              <li className="flex items-center gap-3 text-sm text-ink"><Check className="size-5 text-teal-mid" /> Método FORD & 4Q</li>
              <li className="flex items-center gap-3 text-sm text-ink"><Check className="size-5 text-teal-mid" /> Base de Imóveis ilimitada</li>
              <li className="flex items-center gap-3 text-sm text-slate opacity-60"><X className="size-5" /> Geração de Textos com I.A</li>
              <li className="flex items-center gap-3 text-sm text-slate opacity-60"><X className="size-5" /> Resumo Inteligente de Leads</li>
              <li className="flex items-center gap-3 text-sm text-slate opacity-60"><X className="size-5" /> Suporte Prioritário</li>
            </ul>
          </div>

          {/* Plano Pro (Com IA) - Destacado (Ancoragem) */}
          <div className="bg-teal-deep rounded-3xl border border-teal-shadow p-8 shadow-xl relative transform lg:-translate-y-4">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber text-ink text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
              <Sparkles className="size-3" /> Mais Escolhido
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Profissional I.A.</h3>
            <p className="text-sm text-teal-light mb-6">A experiência completa do Alto Padrão com o Albert I.A.</p>
            <div className="mb-8">
              <span className="text-4xl font-extrabold text-white">R$ 249</span>
              <span className="text-teal-light">/mês</span>
            </div>
            
            <Link href="/crm" className="block w-full text-center bg-amber hover:bg-amber/90 text-ink font-bold py-3 rounded-xl transition-colors mb-8 shadow-lg">
              Testar Grátis por 7 dias
            </Link>

            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-white"><Check className="size-5 text-amber" /> Tudo do plano Padrão</li>
              <li className="flex items-center gap-3 text-sm text-white"><Check className="size-5 text-amber" /> Geração de Textos com I.A</li>
              <li className="flex items-center gap-3 text-sm text-white"><Check className="size-5 text-amber" /> Resumo Inteligente de Leads</li>
              <li className="flex items-center gap-3 text-sm text-white"><Check className="size-5 text-amber" /> Sugestão de Follow-up com I.A</li>
              <li className="flex items-center gap-3 text-sm text-white"><Check className="size-5 text-amber" /> Suporte Prioritário VIP</li>
            </ul>
          </div>

          {/* Plano Elite - Âncora de Preço Alto */}
          <div className="bg-white rounded-3xl border border-border p-8 shadow-sm">
            <h3 className="text-xl font-bold text-ink mb-2">Equipe Elite</h3>
            <p className="text-sm text-slate mb-6">Para imobiliárias e líderes de equipe. (Até 5 usuários)</p>
            <div className="mb-8">
              <span className="text-4xl font-extrabold text-ink">R$ 899</span>
              <span className="text-slate">/mês</span>
            </div>
            
            <Link href="mailto:contato@microsistec.com.br" className="block w-full text-center bg-white border border-border hover:bg-fog text-ink font-bold py-3 rounded-xl transition-colors mb-8">
              Falar com Consultor
            </Link>

            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-ink"><Check className="size-5 text-teal-mid" /> Tudo do plano Profissional I.A.</li>
              <li className="flex items-center gap-3 text-sm text-ink"><Check className="size-5 text-teal-mid" /> 5 Acessos (Corretores)</li>
              <li className="flex items-center gap-3 text-sm text-ink"><Check className="size-5 text-teal-mid" /> Painel do Gestor</li>
              <li className="flex items-center gap-3 text-sm text-ink"><Check className="size-5 text-teal-mid" /> Relatórios de Conversão Avançados</li>
              <li className="flex items-center gap-3 text-sm text-ink"><Check className="size-5 text-teal-mid" /> Treinamento de Onboarding</li>
            </ul>
          </div>

        </div>
      </section>
    </div>
  )
}
