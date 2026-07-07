import Link from 'next/link'
import { Sparkles, Calendar, HeartHandshake, Database, ArrowRight, Bot, MessageCircle, Home, Target, MapPin, Users, Briefcase, Plane, Star } from 'lucide-react'

export const metadata = {
  title: 'Funcionalidades | Evolves CRM',
}

export default function FeaturesPage() {
  return (
    <div className="flex flex-col bg-snow">
      {/* Header */}
      <section className="pt-24 pb-12 bg-white border-b border-border/50 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-ink mb-6">
          O poder do <span className="text-teal-deep">Evolves.</span>
        </h1>
        <p className="text-slate max-w-2xl mx-auto text-lg">
          Conheça cada detalhe dos módulos desenhados para otimizar sua rotina e aproximar você dos seus clientes.
        </p>
      </section>

      {/* Feature 1: Funil e Negócios */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber/10 text-amber border border-amber/20 font-medium text-sm mb-6">
              Módulo de Negócios
            </div>
            <h2 className="text-3xl font-bold text-ink mb-4">Pipeline Fluido e Dinâmico</h2>
            <p className="text-slate text-lg mb-6">
              O núcleo do Evolves. Crie colunas personalizadas e mova seus leads entre elas com um simples arrastar de dedos (swipe). O visual em cards apresenta as informações de contato rápido, a etapa atual e se há alguma atividade pendente, tudo sem precisar abrir o cliente.
            </p>
            <ul className="space-y-3 text-slate">
              <li className="flex gap-2"><Database className="w-5 h-5 text-teal-mid shrink-0" /> Gestão de Funil por tipo de imóvel (Locação vs Venda).</li>
              <li className="flex gap-2"><Database className="w-5 h-5 text-teal-mid shrink-0" /> Indicadores visuais de temperatura (Quente, Morno, Frio).</li>
            </ul>
          </div>
          <div className="bg-fog rounded-3xl p-8 flex items-center justify-center overflow-hidden">
            {/* CSS App Mockup - Kanban (Negócios) */}
            <div className="relative w-full max-w-[320px] h-[500px] bg-white rounded-t-[3rem] border-[8px] border-ink border-b-0 shadow-2xl flex flex-col transform translate-y-12 lg:rotate-[5deg] lg:translate-x-4 hover:rotate-0 hover:translate-y-4 transition-transform duration-700 ease-out">
              {/* Fake iPhone Notch */}
              <div className="absolute top-0 inset-x-0 h-6 bg-ink rounded-b-xl w-32 mx-auto z-50"></div>
              
              <div className="bg-teal-deep pt-8 pb-4 px-4 flex items-center justify-between text-white shadow-sm z-10 rounded-t-[2.5rem]">
                <div className="flex flex-col">
                  <span className="text-[10px] font-semibold text-teal-light uppercase tracking-wider">Funil Ativo</span>
                  <span className="font-serif text-base font-bold flex items-center gap-1">Padrão Venda</span>
                </div>
                <div className="size-8 rounded-full bg-amber text-ink flex items-center justify-center font-bold text-xs">JC</div>
              </div>

              <div className="flex-1 bg-snow p-4 overflow-hidden flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-ink">Qualificação</span>
                    <span className="text-xs font-bold bg-amber/20 text-amber-800 px-2 py-0.5 rounded-full">4</span>
                  </div>
                </div>

                <article className="w-full rounded-[1.25rem] border border-border bg-white shadow-soft p-4 text-left">
                  <div className="flex w-full items-start gap-3">
                    <div className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-teal-deep/10 font-serif text-xs font-semibold text-teal-deep">
                      JD
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

                <article className="w-full rounded-[1.25rem] border border-border bg-white shadow-soft p-4 text-left">
                  <div className="flex w-full items-start gap-3">
                    <div className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-amber/10 font-serif text-xs font-semibold text-amber-600">
                      MC
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
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 2: Albert AI */}
      <section className="py-20 px-6 bg-teal-deep text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 bg-teal-shadow rounded-3xl p-8 flex items-center justify-center">
            <div className="w-full h-[400px] bg-ink rounded-2xl shadow-2xl flex flex-col p-6 border border-white/10">
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 bg-amber rounded-full flex items-center justify-center">
                   <Sparkles className="w-5 h-5 text-ink" />
                 </div>
                 <div>
                   <h3 className="font-bold">Albert I.A.</h3>
                   <p className="text-xs text-white/50">Assistente Virtual</p>
                 </div>
               </div>
               <div className="bg-white/5 p-4 rounded-xl text-sm text-teal-light mb-4">
                 "Aqui está uma descrição atraente para o imóvel MS-1042 focando na vista para o parque..."
               </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-teal-light font-medium text-sm mb-6">
              Módulo de Inteligência
            </div>
            <h2 className="text-3xl font-bold mb-4">A I.A. que pensa como corretor</h2>
            <p className="text-teal-light text-lg mb-6">
              Seu braço direito na criação de anúncios. Preencha apenas o básico (2 quartos, 1 vaga, sacada) e deixe o Albert escrever uma descrição vendedora de alto impacto. Além disso, o Albert pode sugerir o próximo passo de uma negociação lendo o histórico de notas.
            </p>
          </div>
        </div>
      </section>

      {/* Feature 3: FORD & 4Q */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber/10 text-amber border border-amber/20 font-medium text-sm mb-6">
              Módulo de Relacionamento
            </div>
            <h2 className="text-3xl font-bold text-ink mb-4">Método FORD & 4Q</h2>
            <p className="text-slate text-lg mb-6">
              Nós não temos "apenas" um campo de anotações. Nós estruturamos a empatia. Preencha informações de <b>F</b>amília, <b>O</b>cupação, <b>R</b>ecreação e <b>S</b>onhos (D - Dreams). Alinhe tudo com as 4 perguntas (Quem, O que, Quando, Quanto) e nunca mais esqueça de perguntar pelo filho do seu cliente.
            </p>
            <ul className="space-y-3 text-slate">
              <li className="flex gap-2"><HeartHandshake className="w-5 h-5 text-amber shrink-0" /> Relacionamento focado no ser humano, não só no imóvel.</li>
              <li className="flex gap-2"><Calendar className="w-5 h-5 text-amber shrink-0" /> Timeline completa de interações, e-mails enviados e visitas agendadas.</li>
            </ul>
          </div>
          <div className="bg-fog rounded-3xl p-8 flex items-center justify-center overflow-hidden">
            {/* CSS App Mockup - FORD */}
            <div className="relative w-full max-w-[320px] h-[500px] bg-white rounded-t-[3rem] border-[8px] border-ink border-b-0 shadow-2xl flex flex-col transform translate-y-12 lg:rotate-[-5deg] lg:-translate-x-4 hover:rotate-0 hover:translate-y-4 transition-transform duration-700 ease-out">
              {/* Fake iPhone Notch */}
              <div className="absolute top-0 inset-x-0 h-6 bg-ink rounded-b-xl w-32 mx-auto z-50"></div>
              
              <div className="bg-snow pt-10 pb-4 px-5 border-b border-border text-ink shadow-sm z-10 rounded-t-[2.5rem] flex items-center gap-3">
                <div className="size-10 rounded-full bg-amber/20 text-amber flex items-center justify-center font-bold text-sm">MC</div>
                <div>
                  <h3 className="font-bold text-sm">Mariana Costa</h3>
                  <p className="text-xs text-slate">Perfil & Relacionamento</p>
                </div>
              </div>

              <div className="flex-1 bg-snow p-5 overflow-hidden flex flex-col gap-5">
                
                <div className="bg-white rounded-[1.25rem] border border-border shadow-soft p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="size-6 rounded-full bg-teal-deep/10 text-teal-deep flex items-center justify-center"><Users className="size-3" /></div>
                    <span className="font-bold text-xs text-ink uppercase tracking-wider">Família</span>
                  </div>
                  <p className="text-xs text-slate">Casada com o Roberto. Têm uma filha de 5 anos (Júlia) e um cachorro (Golden). Buscam espaço verde.</p>
                </div>

                <div className="bg-white rounded-[1.25rem] border border-border shadow-soft p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="size-6 rounded-full bg-amber/10 text-amber-700 flex items-center justify-center"><Briefcase className="size-3" /></div>
                    <span className="font-bold text-xs text-ink uppercase tracking-wider">Ocupação</span>
                  </div>
                  <p className="text-xs text-slate">Diretora de Marketing em home office. Precisa de um quarto que possa virar escritório espaçoso.</p>
                </div>
                
                <div className="flex gap-4">
                   <div className="flex-1 bg-white rounded-[1.25rem] border border-border shadow-soft p-4">
                     <div className="flex items-center gap-2 mb-3">
                        <div className="size-6 rounded-full bg-teal-mid/10 text-teal-deep flex items-center justify-center"><Plane className="size-3" /></div>
                        <span className="font-bold text-xs text-ink uppercase tracking-wider">Lazer</span>
                      </div>
                      <p className="text-xs text-slate">Gosta de correr e pedalar aos finais de semana.</p>
                   </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 text-center border-t border-border/50 bg-white">
        <h2 className="text-2xl font-bold text-ink mb-6">Preparado para escalar suas vendas?</h2>
        <Link 
          href="/crm" 
          className="bg-teal-deep hover:bg-teal-shadow text-white px-8 py-4 rounded-xl text-base font-bold transition-all shadow-soft inline-flex items-center gap-2"
        >
          Acessar o App Agora
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  )
}
