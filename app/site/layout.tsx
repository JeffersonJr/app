import Link from 'next/link'
import { Home, Phone } from 'lucide-react'

export const metadata = {
  title: 'Microsistec - CRM Imobiliário',
  description: 'O melhor aplicativo para gestão imobiliária e relacionamento com o cliente.',
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-snow flex flex-col font-sans">
      <header className="glass-header">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/site" className="flex items-center gap-2">
            <img src="/logo.svg" alt="Microsistec Logo" className="w-8 h-8" />
            <span className="text-xl font-bold text-ink">Microsistec<span className="text-teal-mid">.</span></span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/site" className="text-sm font-medium text-slate hover:text-teal-deep transition-colors">Início</Link>
            <Link href="/site/funcionalidades" className="text-sm font-medium text-slate hover:text-teal-deep transition-colors">Funcionalidades</Link>
            <Link href="/site/precos" className="text-sm font-medium text-slate hover:text-teal-deep transition-colors">Preços</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/crm" className="hidden md:flex text-sm font-medium text-slate hover:text-teal-deep transition-colors">
              Fazer Login
            </Link>
            <Link 
              href="/crm" 
              className="bg-teal-deep hover:bg-teal-shadow text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-soft hover:shadow-md"
            >
              Baixar App
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        {children}
      </main>

      <footer className="bg-ink text-fog py-12 border-t border-white/10 mt-auto">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.svg" alt="Microsistec Logo" className="w-6 h-6 brightness-0 invert opacity-80" />
              <span className="text-lg font-bold text-white">Microsistec<span className="text-teal-mid">.</span></span>
            </div>
            <p className="text-sm text-slate max-w-xs mb-6">
              A revolução no relacionamento imobiliário. Funil dinâmico, método FORD e inteligência artificial na palma da sua mão.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Produto</h4>
            <ul className="space-y-3 text-sm text-slate">
              <li><Link href="/site/funcionalidades" className="hover:text-amber transition-colors">Funcionalidades</Link></li>
              <li><Link href="/site/precos" className="hover:text-amber transition-colors">Preços</Link></li>
              <li><Link href="#" className="hover:text-amber transition-colors">Changelog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Contato</h4>
            <ul className="space-y-3 text-sm text-slate">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> (11) 9999-9999</li>
              <li>suporte@microsistec.com.br</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-slate">
          <p>© 2026 Microsistec. Todos os direitos reservados.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Termos de Uso</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacidade</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
