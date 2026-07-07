import Link from 'next/link'
import { ArrowRight, Brain, Filter, LineChart, Target, Zap, CheckCircle2, Bot, MessageCircle, Calendar, Home, MapPin } from 'lucide-react'

export default function SiteHomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-deep/5 to-transparent -z-10" />
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-start text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber/10 text-amber border border-amber/20 font-medium text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber"></span>
              </span>
              Nova versão disponível
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-extrabold text-ink leading-[1.1] tracking-tight">
              O CRM Imobiliário feito com a <span className="text-teal-deep">precisão de um engenheiro.</span>
            </h1>
            
            <p className="text-xl text-slate max-w-lg leading-relaxed">
              Diga adeus às planilhas genéricas. Aumente suas conversões com funis inteligentes, inteligência artificial integrada e o método FORD na palma da sua mão.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full pt-4">
              <Link 
                href="/crm" 
                className="bg-teal-deep hover:bg-teal-shadow text-white px-8 py-4 rounded-xl text-base font-bold transition-all shadow-soft flex items-center justify-center gap-2 group"
              >
                Baixar para iPhone
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/crm" 
                className="bg-white hover:bg-fog text-teal-deep border border-border px-8 py-4 rounded-xl text-base font-bold transition-all flex items-center justify-center gap-2"
              >
                Baixar para Android
              </Link>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-slate mt-8">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-teal-light border-2 border-white" />
                <div className="w-8 h-8 rounded-full bg-amber border-2 border-white" />
                <div className="w-8 h-8 rounded-full bg-teal-mid border-2 border-white" />
              </div>
              <p>Junte-se a <span className="font-bold text-ink">5.000+</span> corretores top producers.</p>
            </div>
          </div>
          
          <div className="relative lg:h-[600px] flex items-center justify-center">
            {/* Background glowing blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber/20 blur-3xl rounded-full -z-10" />
            
            {/* CSS App Mockup - Home (Hoje) */}
            <div className="relative w-full max-w-[320px] h-[600px] bg-fog rounded-[3rem] border-[8px] border-ink shadow-2xl overflow-hidden flex flex-col transform lg:rotate-[-5deg] lg:translate-x-12 hover:rotate-0 hover:translate-x-0 transition-transform duration-700 ease-out">
              {/* Fake iPhone Notch */}
              <div className="absolute top-0 inset-x-0 h-6 bg-ink rounded-b-xl w-32 mx-auto z-50"></div>
              
              {/* App Header */}
              <div className="bg-teal-deep pt-8 pb-6 px-5 flex flex-col gap-4 text-white shadow-sm z-10">
                <div className="flex items-center justify-between">
                  <div className="size-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm">JC</div>
                  <div className="size-10 rounded-full bg-white/10 flex items-center justify-center relative">
                    <span className="absolute top-2 right-2 size-2 bg-amber rounded-full border border-teal-deep"></span>
                    <Bot className="size-5" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold">Bom dia, Jefferson</h2>
                  <p className="text-teal-light text-xs mt-1">Você tem 3 tarefas atrasadas hoje.</p>
                </div>
              </div>

              {/* App Body - Dashboard */}
              <div className="flex-1 bg-snow p-4 overflow-hidden flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-2xl p-4 border border-border shadow-soft">
                    <span className="text-xs text-slate font-semibold uppercase">Negócios</span>
                    <div className="text-2xl font-bold text-teal-deep mt-1">12</div>
                  </div>
                  <div className="bg-white rounded-2xl p-4 border border-border shadow-soft">
                    <span className="text-xs text-slate font-semibold uppercase">Visitas</span>
                    <div className="text-2xl font-bold text-amber mt-1">4</div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <h3 className="font-bold text-sm text-ink">Próximas Atividades</h3>
                </div>

                {/* Activity 1 */}
                <div className="bg-white rounded-2xl p-3 border border-border flex items-start gap-3 shadow-sm">
                  <div className="size-8 rounded-full bg-destructive/10 text-destructive flex items-center justify-center shrink-0">
                    <Calendar className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-ink">Ligar para Mariana</p>
                    <p className="text-[10px] text-destructive font-medium mt-0.5">Atrasado (Ontem, 14:00)</p>
                  </div>
                </div>

                {/* Activity 2 */}
                <div className="bg-white rounded-2xl p-3 border border-border flex items-start gap-3 shadow-sm">
                  <div className="size-8 rounded-full bg-amber/10 text-amber-600 flex items-center justify-center shrink-0">
                    <MapPin className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-ink">Visita - Apto Jardins</p>
                    <p className="text-[10px] text-slate mt-0.5">Hoje, 15:30 • João Silva</p>
                  </div>
                </div>
              </div>

              {/* App Bottom Bar */}
              <div className="h-16 bg-white border-t border-border flex items-center justify-around px-4 pb-2 shrink-0">
                <div className="flex flex-col items-center text-teal-deep"><Home className="size-5 mb-1" /><span className="text-[9px] font-bold">Hoje</span></div>
                <div className="flex flex-col items-center text-slate"><Target className="size-5 mb-1" /><span className="text-[9px] font-medium">Negócios</span></div>
                <div className="flex flex-col items-center text-slate"><Calendar className="size-5 mb-1" /><span className="text-[9px] font-medium">Agenda</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white border-y border-border/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">Tudo que você precisa em um só lugar</h2>
          <p className="text-slate max-w-2xl mx-auto mb-16 text-lg">
            Um ecossistema completo focado em relacionamento real e fechamento de alto padrão.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Filter />}
              title="Funis de Vendas Dinâmicos"
              description="Visualize seus negócios como nunca antes. Arraste (swipe) e movimente clientes entre as etapas do funil com máxima fluidez."
            />
            <FeatureCard 
              icon={<Brain />}
              title="Inteligência Artificial"
              description="Escreva descrições matadoras para seus imóveis e resuma o histórico do cliente em um toque com o Albert (nossa I.A. nativa)."
            />
            <FeatureCard 
              icon={<Target />}
              title="Método FORD & 4Q Integrados"
              description="Conheça seu cliente a fundo. Mapeie Família, Ocupação, Recreação e Sonhos diretamente no card de relacionamento."
            />
            <FeatureCard 
              icon={<LineChart />}
              title="Timeline de Interações"
              description="Cada WhatsApp, e-mail, reunião ou visita fica perfeitamente documentado numa linha do tempo automática."
            />
            <FeatureCard 
              icon={<Zap />}
              title="Recomendação de Imóveis"
              description="Busque imóveis compatíveis instantaneamente no perfil do lead e envie as fichas em PDF num clique."
            />
            <FeatureCard 
              icon={<CheckCircle2 />}
              title="Gestão de Atividades"
              description="Não perca follow-ups. Um calendário inteligente que avisa o que está em dia, o que é pra amanhã e o que atrasou."
            />
          </div>
        </div>
      </section>

      {/* Deep Dive Section */}
      <section className="py-24 bg-snow overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            {/* Background glowing blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-mid/10 blur-3xl rounded-full -z-10" />
            
            {/* CSS App Mockup - Kanban (Negócios) */}
            <div className="relative w-full max-w-[320px] h-[600px] bg-fog rounded-[3rem] border-[8px] border-ink shadow-2xl overflow-hidden flex flex-col mx-auto transform lg:rotate-[5deg] hover:rotate-0 transition-transform duration-700 ease-out">
              {/* Fake iPhone Notch */}
              <div className="absolute top-0 inset-x-0 h-6 bg-ink rounded-b-xl w-32 mx-auto z-50"></div>
              
              {/* App Header */}
              <div className="bg-teal-deep pt-8 pb-4 px-4 flex items-center justify-between text-white shadow-sm z-10">
                <div className="flex flex-col">
                  <span className="text-[10px] font-semibold text-teal-light uppercase tracking-wider">Funil Ativo</span>
                  <span className="font-serif text-base font-bold flex items-center gap-1">Padrão Venda</span>
                </div>
                <div className="size-8 rounded-full bg-amber text-ink flex items-center justify-center font-bold text-xs">JC</div>
              </div>

              {/* App Body - Kanban Column */}
              <div className="flex-1 bg-snow p-4 overflow-hidden flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-ink">Qualificação</span>
                    <span className="text-xs font-bold bg-amber/20 text-amber-800 px-2 py-0.5 rounded-full">4</span>
                  </div>
                </div>

                {/* Lead Card 1 */}
                <article className="w-full rounded-[1.25rem] border border-border bg-white shadow-soft p-4 text-left">
                  <div className="flex w-full items-start gap-3">
                    <div className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-teal-deep/10 font-serif text-xs font-semibold text-teal-deep">
                      JD
                      <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-white bg-destructive" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <span className="truncate text-xs font-semibold text-ink">João da Silva</span>
                        <Bot className="size-3 text-teal-mid" />
                      </div>
                      <span className="block text-[10px] text-slate mt-1">11 9999-9999</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border flex gap-2">
                    <button className="flex-1 rounded-full bg-teal-deep/10 py-1.5 text-[10px] font-semibold text-teal-deep">Abrir</button>
                    <button className="flex size-6 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]"><MessageCircle className="size-3" /></button>
                  </div>
                </article>

                {/* Lead Card 2 */}
                <article className="w-full rounded-[1.25rem] border border-border bg-white shadow-soft p-4 text-left">
                  <div className="flex w-full items-start gap-3">
                    <div className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-amber/10 font-serif text-xs font-semibold text-amber-600">
                      MC
                      <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-white bg-amber" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <span className="truncate text-xs font-semibold text-ink">Mariana Costa</span>
                      </div>
                      <span className="block text-[10px] text-slate mt-1">11 9888-8888</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border flex gap-2">
                    <button className="flex-1 rounded-full bg-teal-deep/10 py-1.5 text-[10px] font-semibold text-teal-deep">Abrir</button>
                    <button className="flex size-6 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]"><MessageCircle className="size-3" /></button>
                  </div>
                </article>
              </div>

              {/* App Bottom Bar */}
              <div className="h-16 bg-white border-t border-border flex items-center justify-around px-4 pb-2 shrink-0">
                <div className="flex flex-col items-center text-slate"><Home className="size-5 mb-1" /><span className="text-[9px] font-medium">Hoje</span></div>
                <div className="flex flex-col items-center text-teal-deep"><Target className="size-5 mb-1" /><span className="text-[9px] font-bold">Negócios</span></div>
                <div className="flex flex-col items-center text-slate"><Calendar className="size-5 mb-1" /><span className="text-[9px] font-medium">Agenda</span></div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex flex-col items-start space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-ink leading-tight">
              A experiência do <br/><span className="text-amber">Alto Padrão.</span>
            </h2>
            <p className="text-lg text-slate leading-relaxed">
              Seus clientes esperam um serviço classe A. Por que o seu software não deveria ser?
              Nossa interface usa um visual refinado que acompanha o seu nível de profissionalismo, desde a visualização de fotos estonteantes de imóveis até o feed de atividades.
            </p>
            <ul className="space-y-4 mt-4 w-full">
              {[
                'Design líquido (Liquid Glass)',
                'Sem formulários intermináveis (cadastro super fast)',
                'Aba rápida para visualização de documentos e anexos',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-light/20 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-deep" />
                  </div>
                  <span className="text-ink font-medium">{item}</span>
                </li>
              ))}
            </ul>
            
            <Link 
              href="/site/funcionalidades" 
              className="mt-8 text-teal-deep font-bold hover:text-teal-shadow inline-flex items-center gap-2 group"
            >
              Ver todas as funcionalidades
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="py-24 bg-teal-deep text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-teal-shadow/20" />
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Pronto para transformar seus fechamentos?
          </h2>
          <p className="text-teal-light text-xl mb-10 max-w-xl">
            Baixe o protótipo agora e sinta na pele a fluidez de um CRM pensado para você.
          </p>
          <Link 
            href="/crm" 
            className="bg-amber hover:bg-amber/90 text-ink px-10 py-5 rounded-xl text-lg font-bold transition-all shadow-xl hover:scale-105"
          >
            Acessar o Web App
          </Link>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="glass-panel p-8 rounded-2xl flex flex-col items-start text-left hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-soft group">
      <div className="w-12 h-12 rounded-xl bg-teal-deep/5 flex items-center justify-center text-teal-deep mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-ink mb-3">{title}</h3>
      <p className="text-slate leading-relaxed">
        {description}
      </p>
    </div>
  )
}
