'use client'

import { useState } from 'react'
import { caseStatus, subject } from '@/data/resume'
import EvidenceBoard from '@/components/EvidenceBoard'
import CaseFiles from '@/components/CaseFiles'
import SubjectProfile from '@/components/SubjectProfile'
import IntelLog from '@/components/IntelLog'

type Tab = 'evidence' | 'files' | 'profile' | 'intel'

export default function CasePage() {
  const [activeTab, setActiveTab] = useState<Tab>('evidence')

  function playPaper() {
    try {
      const ctx = new AudioContext()
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.12, ctx.sampleRate)
      const data = buf.getChannelData(0)
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / 1500) * 0.4
      }
      const filter = ctx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.value = 1200
      filter.Q.value = 0.8
      const src = ctx.createBufferSource()
      src.buffer = buf
      src.connect(filter)
      filter.connect(ctx.destination)
      src.start()
    } catch (_) {}
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'evidence', label: 'Evidence Board' },
    { id: 'files', label: 'Case Files' },
    { id: 'profile', label: 'Subject Profile' },
    { id: 'intel', label: 'Intel Log' },
  ]

  return (
    <main className="min-h-screen bg-[#0f0e0c] text-[#c8c2b0] font-mono">

      {/* Top bar */}
      <div className="border-b border-[#2a2720] bg-[#121109] px-6 py-3 flex items-center gap-4">
        <div>
          <p className="text-[9px] tracking-[3px] text-[#4a4438] uppercase">
            Professional Case File
          </p>
          <p className="text-sm tracking-widest text-[#e8c97a]">
            OPERATION: HIRE ME
          </p>
        </div>
        <div className="flex-1" />
        {/* Case status badge */}
        <div className={`flex items-center gap-2 border px-3 py-1 ${
          caseStatus.status === 'OPEN'
            ? 'border-[#7ab36a] text-[#7ab36a]'
            : 'border-[#c05a3a] text-[#c05a3a]'
        }`}>
          <span className={`w-2 h-2 rounded-full ${
            caseStatus.status === 'OPEN' ? 'bg-[#7ab36a] animate-pulse' : 'bg-[#c05a3a]'
          }`} />
          <span className="text-[10px] tracking-[3px] uppercase">
            {caseStatus.status === 'OPEN'
              ? caseStatus.statusLabel
              : `Hired @ ${caseStatus.companyHired}`}
          </span>
        </div>
        {/* Subject name */}
        <div className="text-[10px] tracking-[2px] text-[#4a4438] uppercase">
          Subject: {subject.name}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#2a2720] bg-[#0d0c0a] flex">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              playPaper()
              setActiveTab(tab.id)
            }}
            className={`px-6 py-3 text-[11px] tracking-[2px] uppercase border-r border-[#2a2720] transition-all duration-200 ${
              activeTab === tab.id
                ? 'text-[#e8c97a] border-b-2 border-b-[#e8c97a] bg-[#161410]'
                : 'text-[#5a5448] hover:text-[#c8c2b0] hover:bg-[#1a1815]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-6">
        {activeTab === 'evidence' && <EvidenceBoard />}
        {activeTab === 'files' && <CaseFiles />}
        {activeTab === 'profile' && <SubjectProfile />}
        {activeTab === 'intel' && <IntelLog />}
      </div>

    </main>
  )
}