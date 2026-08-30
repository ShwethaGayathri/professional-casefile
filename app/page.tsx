'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { caseStatus } from '@/data/resume'

const CHAR_SPEED = 35

export default function Home() {
  const router = useRouter()
  const [entered, setEntered] = useState(false)
  const [overlayVisible, setOverlayVisible] = useState(true)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [displayedLines, setDisplayedLines] = useState<string[]>(['', '', '', ''])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [showButton, setShowButton] = useState(false)
  const [buttonVisible, setButtonVisible] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const ambientRef = useRef<HTMLAudioElement | null>(null)

  // Dynamic lines based on case status
  const LINES = [
    { text: 'FILE #1997-PRESENT', delay: 0 },
    { text: 'OPERATION: HIRE ME', delay: 400 },
    { text: 'Subject identified. Evidence collected.', delay: 800 },
    {
      text: caseStatus.status === 'OPEN'
        ? `Case status: OPEN. ${caseStatus.statusLabel}.`
        : `Case status: CLOSED. Hired @ ${caseStatus.companyHired}.`,
      delay: 600,
    },
  ]

  // Setup ambient audio on mount
  useEffect(() => {
    const audio = new Audio('/ambient.mp3')
    audio.loop = true
    audio.volume = 0.15
    ambientRef.current = audio
    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  function handleEnter() {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext()
    }
    audioCtxRef.current.resume()
    ambientRef.current?.play().catch(() => {})
    setMusicPlaying(true)
    setOverlayVisible(false)
    setTimeout(() => setEntered(true), 800)
  }

  function toggleMusic() {
    const audio = ambientRef.current
    if (!audio) return
    if (audio.paused) {
      audio.play().catch(() => {})
      setMusicPlaying(true)
    } else {
      audio.pause()
      setMusicPlaying(false)
    }
  }

  function playClick() {
    try {
      const ctx = audioCtxRef.current
      if (!ctx) return
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.04, ctx.sampleRate)
      const data = buf.getChannelData(0)
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / 200)
      }
      const src = ctx.createBufferSource()
      src.buffer = buf
      src.connect(ctx.destination)
      src.start()
    } catch (_) {}
  }

  // Typewriter
  useEffect(() => {
    if (!entered) return
    if (currentLine >= LINES.length) {
      setTimeout(() => setShowButton(true), 600)
      return
    }
    const line = LINES[currentLine]
    if (currentChar < line.text.length) {
      const timeout = setTimeout(() => {
        playClick()
        setDisplayedLines(prev => {
          const updated = [...prev]
          updated[currentLine] = line.text.slice(0, currentChar + 1)
          return updated
        })
        setCurrentChar(c => c + 1)
      }, CHAR_SPEED)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setCurrentLine(l => l + 1)
        setCurrentChar(0)
      }, line.delay)
      return () => clearTimeout(timeout)
    }
  }, [entered, currentLine, currentChar])

  useEffect(() => {
    if (showButton) {
      requestAnimationFrame(() => setButtonVisible(true))
    }
  }, [showButton])

  const isOpen = caseStatus.status === 'OPEN'

  return (
    <main className="min-h-screen bg-[#0f0e0c] flex items-center justify-center px-6 relative overflow-hidden">

      {/* Music toggle */}
      {entered && (
        <button
          onClick={toggleMusic}
          className="fixed top-4 right-4 z-50 border border-[#2a2720] text-[#5a5448] font-mono text-[9px] tracking-[2px] uppercase px-3 py-2 hover:border-[#e8c97a] hover:text-[#e8c97a] transition-all duration-200"
        >
          {musicPlaying ? '▮▮ Music' : '▶ Music'}
        </button>
      )}

      {/* Entry overlay */}
      {!entered && (
        <div
          className={`absolute inset-0 z-50 bg-[#0f0e0c] flex flex-col items-center justify-center transition-opacity duration-700 ${
            overlayVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Top detail */}
          <p className="text-[9px] tracking-[6px] text-[#2a2720] uppercase mb-16 font-mono">
            Confidential — Authorized Personnel Only
          </p>

          {/* Title block */}
          <div className="text-center mb-8">
            <div className="inline-block border border-[#c05a3a] px-4 py-1 rotate-[-1deg] mb-8">
              <span className="text-[#c05a3a] text-[10px] tracking-[5px] font-mono uppercase">
                Classified
              </span>
            </div>
            <h1 className="text-5xl font-bold tracking-[8px] text-[#e8c97a] font-mono mb-3">
              OPERATION
            </h1>
            <h2 className="text-2xl tracking-[6px] text-[#5a5448] font-mono mb-6">
              HIRE ME
            </h2>

            {/* Case status badge — dynamic */}
            <div className={`inline-flex items-center gap-2 border px-4 py-1.5 ${
              isOpen
                ? 'border-[#7ab36a33] text-[#7ab36a]'
                : 'border-[#c05a3a33] text-[#c05a3a]'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                isOpen ? 'bg-[#7ab36a] animate-pulse' : 'bg-[#c05a3a]'
              }`} />
              <span className="text-[9px] tracking-[3px] uppercase font-mono">
                {isOpen
                  ? `Case Open — ${caseStatus.statusLabel}`
                  : `Case Closed — Hired @ ${caseStatus.companyHired}`}
              </span>
            </div>
          </div>

          {/* Enter button */}
          <div className="mt-10">
            <button
              onClick={handleEnter}
              className="group border border-[#3a3428] text-[#5a5448] font-mono text-xs tracking-[5px] uppercase px-10 py-4 transition-all duration-300 hover:border-[#e8c97a] hover:text-[#e8c97a] animate-pulse hover:animate-none"
            >
              ▶ Click to Enter
            </button>
          </div>

          {/* Bottom detail */}
          <p className="absolute bottom-8 text-[9px] tracking-[3px] text-[#1e1c18] font-mono uppercase">
            Case File Active — 1997 to Present
          </p>
        </div>
      )}

      {/* Typewriter content */}
      <div className="max-w-lg w-full">
        <div className="mb-10 inline-block border border-[#c05a3a] px-3 py-1 rotate-[-2deg]">
          <span className="text-[#c05a3a] text-xs tracking-[4px] font-mono uppercase">
            Classified
          </span>
        </div>

        <div className="space-y-4 font-mono">
          <p className="text-[10px] tracking-[6px] text-[#5a5448] uppercase">
            {displayedLines[0]}
            {entered && currentLine === 0 && <span className="animate-pulse">▋</span>}
          </p>
          <h1 className="text-4xl font-bold tracking-widest text-[#e8c97a]">
            {displayedLines[1]}
            {entered && currentLine === 1 && <span className="animate-pulse">▋</span>}
          </h1>
          <p className="text-sm text-[#8a8070]">
            {displayedLines[2]}
            {entered && currentLine === 2 && <span className="animate-pulse">▋</span>}
          </p>
          {/* Line 4 — colour changes based on status */}
          <p className={`text-sm ${isOpen ? 'text-[#7ab36a]' : 'text-[#c05a3a]'}`}>
            {displayedLines[3]}
            {entered && currentLine === 3 && <span className="animate-pulse">▋</span>}
          </p>
        </div>

        {/* Declassify / Case Resolved button */}
        {showButton && (
          <button
            onClick={() => router.push('/case')}
            className={`mt-12 px-8 py-3 border font-mono text-sm tracking-[4px] uppercase transition-all duration-700 ${
              isOpen
                ? 'border-[#e8c97a] text-[#e8c97a] hover:bg-[#e8c97a] hover:text-[#0f0e0c]'
                : 'border-[#c05a3a] text-[#c05a3a] hover:bg-[#c05a3a] hover:text-[#0f0e0c]'
            } ${buttonVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
          >
            {isOpen ? '▶ Declassify' : '▶ View Closed Case'}
          </button>
        )}
      </div>
    </main>
  )
}