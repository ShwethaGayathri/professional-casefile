'use client'

import { useState } from 'react'
import { experience, education, publication } from '@/data/resume'

function playPaper() {
  try {
    const ctx = new AudioContext()
    const duration = 0.08
    const buf = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate)
    const data = buf.getChannelData(0)

    for (let i = 0; i < data.length; i++) {
      const t = i / ctx.sampleRate
      const envelope = Math.exp(-t * 30)
      data[i] = (Math.random() * 2 - 1) * envelope
    }

    const hipass = ctx.createBiquadFilter()
    hipass.type = 'highpass'
    hipass.frequency.value = 3000

    const gain = ctx.createGain()
    gain.gain.value = 0.15

    const src = ctx.createBufferSource()
    src.buffer = buf
    src.connect(hipass)
    hipass.connect(gain)
    gain.connect(ctx.destination)
    src.start()
  } catch (_) {}
}

export default function CaseFiles() {
  const [openFile, setOpenFile] = useState<string | null>('visa')

  function toggleFile(id: string) {
    playPaper()
    setOpenFile((prev) => (prev === id ? null : id))
  }

  return (
    <div className="max-w-3xl mx-auto space-y-3">

      {/* Section label */}
      <div className="flex items-center gap-3 mb-6">
        <p className="text-[9px] tracking-[4px] text-[#4a4438] uppercase">
          Employment Dossiers — {experience.length} files on record
        </p>

        <div className="flex-1 h-[1px] bg-[#1e1c18]" />
      </div>

      {/* Experience files */}
      {experience.map((job, index) => (
        <div
          key={job.id}
          className={`border transition-all duration-300 cursor-pointer ${
            openFile === job.id
              ? 'border-[#e8c97a33] bg-[#131210]'
              : 'border-[#2a2720] bg-[#121109] hover:border-[#3a3428] hover:bg-[#141210]'
          }`}
          onClick={() => toggleFile(job.id)}
        >
          {/* File header */}
          <div className="flex items-center gap-4 px-4 py-3">

            {/* File number */}
            <span className="text-[9px] text-[#3a3428] w-6 flex-shrink-0">
              {String(index + 1).padStart(2, '0')}
            </span>

            {/* File icon */}
            <span className="text-lg flex-shrink-0">
              {job.status === 'ACTIVE' ? '🟡' : '📁'}
            </span>

            {/* File info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <p className="text-[12px] text-[#c8c2b0]">
                  {job.company}
                </p>

                <p className="text-[10px] text-[#5a5448]">
                  — {job.role}
                </p>
              </div>

              <p className="text-[9px] text-[#4a4438] mt-0.5">
                {job.start} → {job.end} · {job.location}
              </p>
            </div>

            {/* Status tag */}
            <div
              className={`flex-shrink-0 flex items-center gap-1.5 border px-2 py-0.5 ${
                job.status === 'ACTIVE'
                  ? 'border-[#7ab36a44] text-[#7ab36a]'
                  : 'border-[#2a2720] text-[#4a4438]'
              }`}
            >
              {job.status === 'ACTIVE' && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#7ab36a] animate-pulse" />
              )}

              <span className="text-[8px] tracking-[2px] uppercase">
                {job.status}
              </span>
            </div>

            {/* Toggle arrow */}
            <span
              className={`text-[#4a4438] text-xs transition-transform duration-300 flex-shrink-0 ${
                openFile === job.id ? 'rotate-90' : ''
              }`}
            >
              ▶
            </span>
          </div>

          {/* File content — expands on open */}
          {openFile === job.id && (
            <div className="px-4 pb-4 border-t border-[#1e1c18]">
              <div className="pt-4 space-y-4">

                {/* Classified stamp */}
                <div className="inline-block border border-[#c05a3a33] px-2 py-0.5 rotate-[-1deg]">
                  <span className="text-[#c05a3a] text-[8px] tracking-[3px] uppercase">
                    {job.status === 'ACTIVE'
                      ? 'Active Operation'
                      : 'Closed — Archived'}
                  </span>
                </div>

                {/* Bullets */}
                <div className="space-y-2">
                  <p className="text-[9px] tracking-[3px] text-[#4a4438] uppercase">
                    Evidence
                  </p>

                  {job.bullets.map((bullet, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-[#c05a3a] text-[10px] flex-shrink-0 mt-0.5">
                        ▸
                      </span>

                      <p className="text-[11px] text-[#8a8070] leading-relaxed">
                        {bullet}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tech */}
                {job.tech.length > 0 && (
                  <div>
                    <p className="text-[9px] tracking-[3px] text-[#4a4438] uppercase mb-2">
                      Weapons Used
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {job.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[9px] tracking-[1px] border border-[#2a2720] text-[#5a5448] px-2 py-0.5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}
        </div>
      ))}

      {/* Education section */}
      <div className="flex items-center gap-3 mt-8 mb-6">
        <p className="text-[9px] tracking-[4px] text-[#4a4438] uppercase">
          Academic Records
        </p>

        <div className="flex-1 h-[1px] bg-[#1e1c18]" />
      </div>

      {education.map((edu, index) => (
        <div
          key={edu.id}
          className={`border transition-all duration-300 cursor-pointer ${
            openFile === edu.id
              ? 'border-[#e8c97a33] bg-[#131210]'
              : 'border-[#2a2720] bg-[#121109] hover:border-[#3a3428]'
          }`}
          onClick={() => toggleFile(edu.id)}
        >
          <div className="flex items-center gap-4 px-4 py-3">

            <span className="text-[9px] text-[#3a3428] w-6 flex-shrink-0">
              {String(index + 1).padStart(2, '0')}
            </span>

            <span className="text-lg flex-shrink-0">
              🎓
            </span>

            <div className="flex-1 min-w-0">
              <p className="text-[12px] text-[#c8c2b0]">
                {edu.degree}
              </p>

              <p className="text-[9px] text-[#4a4438] mt-0.5">
                {edu.institution} · {edu.year}
              </p>
            </div>

            <div className="flex-shrink-0 border border-[#7ab36a44] text-[#7ab36a] px-2 py-0.5">
              <span className="text-[8px] tracking-[2px] uppercase">
                Verified
              </span>
            </div>

            <span
              className={`text-[#4a4438] text-xs transition-transform duration-300 flex-shrink-0 ${
                openFile === edu.id ? 'rotate-90' : ''
              }`}
            >
              ▶
            </span>
          </div>

          {openFile === edu.id && (
            <div className="px-4 pb-4 border-t border-[#1e1c18]">
              <div className="pt-4 space-y-3">

                <div className="flex gap-3">
                  <span className="text-[#c05a3a] text-[10px] flex-shrink-0 mt-0.5">
                    ▸
                  </span>

                  <p className="text-[11px] text-[#8a8070] leading-relaxed">
                    {edu.detail}
                  </p>
                </div>

                <div className="flex gap-2 items-center">
                  <span className="text-[9px] tracking-[2px] text-[#4a4438] uppercase">
                    CGPA
                  </span>

                  <span className="text-[11px] text-[#e8c97a]">
                    {edu.cgpa}
                  </span>

                  <span className="mx-2 text-[#2a2720]">
                    ·
                  </span>

                  <span className="text-[11px] text-[#8a8070]">
                    {edu.highlight}
                  </span>
                </div>

              </div>
            </div>
          )}
        </div>
      ))}

      {/* Publication */}
      <div className="flex items-center gap-3 mt-8 mb-6">
        <p className="text-[9px] tracking-[4px] text-[#4a4438] uppercase">
          Published Evidence
        </p>

        <div className="flex-1 h-[1px] bg-[#1e1c18]" />
      </div>

      <div className="border border-[#e8c97a22] bg-[#121109] px-4 py-3">
        <div className="flex items-start gap-4">

          <span className="text-lg flex-shrink-0">
            📄
          </span>

          <div className="flex-1">

            {/* FIXED: Added missing <a> opening tag */}
            <a
              href={publication.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-[#c8c2b0] hover:text-[#e8c97a] transition-colors leading-relaxed block"
              onClick={(e) => e.stopPropagation()}
            >
              {publication.title}
            </a>

            <p className="text-[9px] text-[#6a6458] mt-1">
              {publication.type} · {publication.publisher} ·{' '}
              {publication.year} · w/ {publication.coAuthor}
            </p>

          </div>

          <div className="flex-shrink-0 border border-[#e8c97a33] text-[#e8c97a] px-2 py-0.5">
            <span className="text-[8px] tracking-[2px] uppercase">
              Published
            </span>
          </div>

        </div>
      </div>

    </div>
  )
}