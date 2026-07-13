'use client'

import { ChevronLeft, Phone, PhoneOff, Mic, Wifi, Check, Send, PhoneCall, Video } from 'lucide-react'
import { useState, useEffect } from 'react'

export function SimulatedWifiScreen({ onClose }: { onClose: () => void }) {
  const [conectado, setConectado] = useState(false)

  return (
    <div className="fixed inset-0 z-[200] bg-zinc-100 flex flex-col animate-in fade-in slide-in-from-right-8 duration-300">
      <div className="bg-white border-b border-zinc-200 px-4 pt-12 pb-4 flex items-center gap-3 shadow-sm">
        <button type="button" onClick={onClose} className="flex items-center text-blue-600 active:opacity-70 transition-opacity">
          <ChevronLeft className="size-6" />
          <span className="text-[17px] font-medium">Ajustes</span>
        </button>
        <h1 className="text-[17px] font-semibold flex-1 text-center pr-12">Wi-Fi</h1>
      </div>
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-zinc-200 mb-6">
          <div className="px-4 py-3 flex items-center justify-between border-b border-zinc-200">
            <span className="text-[17px]">Wi-Fi</span>
            <div className="w-12 h-7 bg-green-500 rounded-full flex items-center justify-end px-0.5">
              <div className="size-6 bg-white rounded-full shadow-sm" />
            </div>
          </div>
          {conectado && (
            <div className="px-4 py-3 flex items-center gap-3 bg-zinc-50">
              <Check className="size-5 text-blue-600" />
              <div className="flex-1">
                <p className="text-[17px] font-medium text-blue-600">imobiliária</p>
              </div>
              <Wifi className="size-5 text-blue-600" />
            </div>
          )}
        </div>

        <h2 className="text-sm uppercase text-zinc-500 font-medium px-4 mb-2">Redes Disponíveis</h2>
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-zinc-200">
          {!conectado && (
            <button 
              type="button" 
              onClick={() => {
                setConectado(true)
                setTimeout(() => {
                  onClose()
                }, 1000)
              }}
              className="w-full px-4 py-3 flex items-center justify-between border-b border-zinc-200 active:bg-zinc-100 transition-colors text-left"
            >
              <span className="text-[17px] font-medium">imobiliária</span>
              <Wifi className="size-5 text-zinc-800" />
            </button>
          )}
          <div className="px-4 py-3 flex items-center justify-between border-b border-zinc-200">
            <span className="text-[17px]">Evolves_Visitantes</span>
            <Wifi className="size-5 text-zinc-800" />
          </div>
          <div className="px-4 py-3 flex items-center justify-between">
            <span className="text-[17px]">Rede_5G_Pro</span>
            <Wifi className="size-5 text-zinc-800" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function SimulatedLigacaoScreen({ onClose, contatoNome, contatoTelefone }: { onClose: () => void, contatoNome?: string, contatoTelefone?: string }) {
  const [tempo, setTempo] = useState(0)
  const [conectado, setConectado] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setConectado(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!conectado) return
    const interval = setInterval(() => {
      setTempo(t => t + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [conectado])

  const formatTempo = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className="fixed inset-0 z-[200] bg-zinc-900 flex flex-col animate-in fade-in slide-in-from-bottom duration-300">
      <div className="pt-12 px-4">
        <button type="button" onClick={onClose} className="flex items-center text-zinc-300 active:opacity-70 transition-opacity">
          <ChevronLeft className="size-6" />
          <span className="text-[17px] font-medium">App</span>
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="mb-8 flex size-24 items-center justify-center rounded-full bg-zinc-800 text-4xl text-zinc-300 font-bold border border-zinc-700 shadow-xl">
          {contatoNome ? contatoNome.substring(0, 2).toUpperCase() : 'C'}
        </div>
        <h2 className="text-3xl font-serif font-semibold text-white mb-2">{contatoNome || 'Desconhecido'}</h2>
        <p className="text-zinc-400 font-medium">{conectado ? formatTempo(tempo) : 'Chamando...'}</p>
        <p className="text-zinc-500 text-sm mt-1">{contatoTelefone || '(00) 00000-0000'}</p>
      </div>
      <div className="p-10 flex items-center justify-center gap-8 pb-16">
        <button type="button" className="flex size-16 items-center justify-center rounded-full bg-zinc-800 text-white transition-transform active:scale-90 border border-zinc-700">
          <Mic className="size-6" />
        </button>
        <button 
          type="button" 
          onClick={onClose}
          className="flex size-20 items-center justify-center rounded-full bg-red-500 text-white transition-transform active:scale-90 shadow-lg shadow-red-500/20"
        >
          <PhoneOff className="size-8" />
        </button>
        <button type="button" className="flex size-16 items-center justify-center rounded-full bg-zinc-800 text-white transition-transform active:scale-90 border border-zinc-700">
          <Phone className="size-6" />
        </button>
      </div>
    </div>
  )
}

export function SimulatedWhatsappScreen({ onClose, contatoNome }: { onClose: () => void, contatoNome?: string }) {
  return (
    <div className="fixed inset-0 z-[200] bg-[#efeae2] flex flex-col animate-in fade-in slide-in-from-right-8 duration-300">
      {/* Header WhatsApp */}
      <div className="bg-[#075e54] text-white px-2 pt-12 pb-3 flex items-center gap-3 shadow-md">
        <button type="button" onClick={onClose} className="flex items-center active:opacity-70 transition-opacity">
          <ChevronLeft className="size-7" />
          <div className="size-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
            {contatoNome ? contatoNome.substring(0, 2).toUpperCase() : 'C'}
          </div>
        </button>
        <div className="flex-1 leading-tight cursor-pointer" onClick={onClose}>
          <h1 className="text-[17px] font-semibold">{contatoNome || 'Contato'}</h1>
          <p className="text-xs text-white/80">visto por último hoje às 12:00</p>
        </div>
        <div className="flex items-center gap-4 px-2">
          <Video className="size-5" />
          <PhoneCall className="size-4.5" />
        </div>
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col justify-end gap-2 bg-[url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')] bg-cover bg-center">
        <div className="bg-white rounded-lg rounded-tl-none p-2 px-3 self-start max-w-[80%] shadow-sm relative">
          <p className="text-[15px] text-[#111b21] leading-snug">Olá! Tudo bem? Vi que tentou me ligar mais cedo.</p>
          <span className="text-[10px] text-zinc-500 float-right mt-1 ml-3">12:05</span>
        </div>
        <div className="bg-[#d9fdd3] rounded-lg rounded-tr-none p-2 px-3 self-end max-w-[80%] shadow-sm relative mt-2">
          <p className="text-[15px] text-[#111b21] leading-snug">Olá! Sim, te liguei para falarmos sobre as opções de imóveis que você gostou.</p>
          <div className="flex items-center justify-end gap-1 mt-1 ml-3 float-right">
            <span className="text-[10px] text-[#667781]">12:10</span>
            <Check className="size-3 text-[#53bdeb] ml-0.5" />
          </div>
        </div>
      </div>
      
      {/* Input Area */}
      <div className="bg-[#f0f2f5] p-2 flex items-end gap-2">
        <div className="flex-1 bg-white rounded-3xl min-h-[44px] flex items-center px-4 py-2 shadow-sm">
          <input type="text" placeholder="Mensagem" className="w-full bg-transparent outline-none text-[15px]" />
        </div>
        <button type="button" className="size-11 rounded-full bg-[#00a884] flex items-center justify-center text-white shrink-0 shadow-sm active:scale-95 transition-transform">
          <Send className="size-5 ml-0.5" />
        </button>
      </div>
    </div>
  )
}
