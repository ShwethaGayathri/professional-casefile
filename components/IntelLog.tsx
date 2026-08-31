'use client'

import { projects } from '@/data/resume'

const statusColors = {
  LIVE: {
    border: 'border-[#7ab36a44]',
    text: 'text-[#7ab36a]',
    dot: 'bg-[#7ab36a]',
  },
  'IN PROGRESS': {
    border: 'border-[#e8c97a44]',
    text: 'text-[#e8c97a]',
    dot: 'bg-[#e8c97a]',
  },
  RESEARCH: {
    border: 'border-[#5a8ab844]',
    text: 'text-[#5a8ab8]',
    dot: 'bg-[#5a8ab8]',
  },
}

function playClick() {
  try {
    const ctx = new AudioContext()
    const buf = ctx.createBuffer(
      1,
      ctx.sampleRate * 0.08,
      ctx.sampleRate
    )

    const data = buf.getChannelData(0)

    for (let i = 0; i < data.length; i++) {
      const t = i / ctx.sampleRate
      data[i] = (Math.random() * 2 - 1) * Math.exp(-t * 30)
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

export default function IntelLog() {
  return (
    <div className="max-w-3xl mx-auto">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <p className="text-[9px] tracking-[4px] text-[#4a4438] uppercase">
          Mission Reports — {projects.length} operations on record
        </p>

        <div className="flex-1 h-[1px] bg-[#1e1c18]" />
      </div>

      {/* Projects */}
      <div className="space-y-4">
        {projects.map((project, index) => {
          const colors =
            statusColors[
              project.status as keyof typeof statusColors
            ] || statusColors['RESEARCH']

          return (
            <div
              key={project.id}
              className="border border-[#2a2720] bg-[#121109] p-4 hover:border-[#3a3428] transition-all duration-200"
            >

              {/* Top row */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">

                  {/* Mission number */}
                  <span className="text-[9px] text-[#3a3428]">
                    OP-{String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Name */}
                  <h3 className="text-[13px] text-[#c8c2b0] tracking-wide">
                    {project.name}
                  </h3>
                </div>

                {/* Status */}
                <div
                  className={`flex-shrink-0 flex items-center gap-1.5 border px-2 py-0.5 ${colors.border} ${colors.text}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                      colors.dot
                    } ${
                      project.status === 'LIVE'
                        ? 'animate-pulse'
                        : ''
                    }`}
                  />

                  <span className="text-[8px] tracking-[2px] uppercase">
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Category tag */}
              <div className="mb-3">
                <span className="text-[8px] tracking-[2px] border border-[#2a2720] text-[#4a4438] px-2 py-0.5 uppercase">
                  {project.category}
                </span>
              </div>

              {/* Description */}
              <p className="text-[11px] text-[#8a8070] leading-relaxed mb-3">
                {project.description}
              </p>

              {/* Impact */}
              {project.impact && (
                <div className="flex gap-2 items-start mb-3">
                  <span className="text-[#c05a3a] text-[10px] flex-shrink-0">
                    ▸
                  </span>

                  <p className="text-[10px] text-[#6a6458] italic">
                    {project.impact}
                  </p>
                </div>
              )}

              {/* Tech stack */}
              {project.tech.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] tracking-[1px] border border-[#2a2720] text-[#5a5448] px-2 py-0.5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {/* Links */}
              <div className="flex gap-4 mt-3 pt-3 border-t border-[#1e1c18]">

                {/* GitHub link */}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    className="text-[10px] tracking-[2px] text-[#5a5448] hover:text-[#e8c97a] uppercase transition-colors duration-200"
                  >
                    ▶ GitHub
                  </a>
                )}

                {/* Live site link */}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    className="text-[10px] tracking-[2px] text-[#5a5448] hover:text-[#e8c97a] uppercase transition-colors duration-200"
                  >
                    ▶ Live Site
                  </a>
                )}

                {/* No links */}
                {!project.github && !project.link && (
                  <span className="text-[10px] tracking-[2px] text-[#3a3428] uppercase">
                    ▶ Classified — not yet published
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer note */}
      <div className="mt-8 border-t border-[#1e1c18] pt-4">
        <p className="text-[9px] tracking-[3px] text-[#3a3428] uppercase">
          Additional operations pending declassification — check back soon
        </p>
      </div>

    </div>
  )
}   