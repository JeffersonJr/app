import Image from 'next/image'
import Link from 'next/link'
import { Sparkles, Calendar, HeartHandshake, Database, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Funcionalidades | Microsistec CRM',
}

export default function FeaturesPage() {
  return (
    <div className="flex flex-col bg-snow">
      {/* Header */}
      <section className="pt-24 pb-12 bg-white border-b border-border/50 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-ink mb-6">
          O poder do <span className="text-teal-deep">Microsistec.</span>
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
              O núcleo do Microsistec. Crie colunas personalizadas e mova seus leads entre elas com um simples arrastar de dedos (swipe). O visual em cards apresenta as informações de contato rápido, a etapa atual e se há alguma atividade pendente, tudo sem precisar abrir o cliente.
            </p>
            <ul className="space-y-3 text-slate">
              <li className="flex gap-2"><Database className="w-5 h-5 text-teal-mid shrink-0" /> Gestão de Funil por tipo de imóvel (Locação vs Venda).</li>
              <li className="flex gap-2"><Database className="w-5 h-5 text-teal-mid shrink-0" /> Indicadores visuais de temperatura (Quente, Morno, Frio).</li>
            </ul>
          </div>
          <div className="bg-fog rounded-3xl p-8 flex items-center justify-center">
            <div className="w-full h-[400px] bg-white rounded-2xl shadow-soft flex items-center justify-center text-slate/50 p-6 text-center border border-border">
              <span className="font-bold text-xl">Representação do Kanban</span>
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
          <div className="relative">
            {/* The second mockup fits perfectly here to show the timeline */}
            <Image 
              src="/images/crm_property_mockup_1783430281713.png" 
              alt="Client Timeline Mockup" 
              width={600} 
              height={600} 
              className="drop-shadow-xl rounded-2xl mx-auto object-contain"
            />
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
