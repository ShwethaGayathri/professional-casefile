'use client'

import { useState } from 'react'
import {
    subject,
    experience,
    education,
    projects,
    skills,
    publication,
} from '@/data/resume'

type Pin = {
    id: string
    label: string
    value: string
    sub?: string
    color: string
    dotColor: string
    x: number
    y: number
}

const pins: Pin[] = [
    // Subject — center
    {
        id: 'subject',
        label: 'Subject',
        value: 'Gayathri U',
        sub: 'Sr. Software Engineer',
        color: '#e8c97a',
        dotColor: '#e8c97a',
        x: 42,
        y: 38,
    },

    // Experience
    {
        id: 'visa',
        label: 'Active Operation',
        value: 'Visa',
        sub: 'Aug 2024 — Present',
        color: '#7ab36a',
        dotColor: '#7ab36a',
        x: 68,
        y: 18,
    },
    {
        id: 'avaya',
        label: 'Closed File',
        value: 'Avaya',
        sub: 'Aug 2023 — Aug 2024',
        color: '#c8c2b0',
        dotColor: '#c8c2b0',
        x: 72,
        y: 52,
    },
    {
        id: 'cognizant',
        label: 'Closed File',
        value: 'Cognizant',
        sub: 'Aug 2019 — Aug 2023',
        color: '#c8c2b0',
        dotColor: '#c8c2b0',
        x: 68,
        y: 76,
    },

    // Education
    {
        id: 'bits',
        label: 'Academic Record',
        value: 'BITS Pilani',
        sub: 'M.Tech · 9.5 CGPA',
        color: '#5a8ab8',
        dotColor: '#5a8ab8',
        x: 18,
        y: 18,
    },
    {
        id: 'kct',
        label: 'Academic Record',
        value: 'KCT Coimbatore',
        sub: 'B.E · 8.5 CGPA',
        color: '#5a8ab8',
        dotColor: '#5a8ab8',
        x: 14,
        y: 52,
    },

    // Publication
    {
        id: 'publication',
        label: 'Exhibit A',
        value: 'TGNN Publication',
        sub: 'Fraud Spike Prediction',
        color: '#c05a3a',
        dotColor: '#c05a3a',
        x: 42,
        y: 72,
    },

    // Skills cluster
    {
        id: 'frontend',
        label: 'Weapons',
        value: 'Frontend',
        sub: 'Angular · React · TS',
        color: '#8a6ab8',
        dotColor: '#8a6ab8',
        x: 20,
        y: 78,
    },
    {
        id: 'backend',
        label: 'Weapons',
        value: 'Backend',
        sub: 'Java · Python · FastAPI',
        color: '#8a6ab8',
        dotColor: '#8a6ab8',
        x: 6,
        y: 34,
    },
    {
        id: 'aiml',
        label: 'Weapons',
        value: 'AI / ML',
        sub: 'GenAI · TGNN · ML Models',
        color: '#c05a3a',
        dotColor: '#c05a3a',
        x: 82,
        y: 35,
    },
]

// String connections — [from pin id, to pin id, color]
const connections: [string, string, string][] = [
    ['subject', 'visa', '#7ab36a'],
    ['subject', 'avaya', '#c8c2b0'],
    ['subject', 'cognizant', '#c8c2b0'],
    ['subject', 'bits', '#5a8ab8'],
    ['subject', 'kct', '#5a8ab8'],
    ['subject', 'publication', '#c05a3a'],
    ['visa', 'publication', '#c05a3a'],
    ['visa', 'aiml', '#c05a3a'],
    ['subject', 'frontend', '#8a6ab8'],
    ['subject', 'backend', '#8a6ab8'],
    ['bits', 'aiml', '#8a6ab8'],
    ['kct', 'frontend', '#8a6ab8'],
]

function playPin() {
    try {
        const ctx = new AudioContext()

        const buf = ctx.createBuffer(
            1,
            ctx.sampleRate * 0.06,
            ctx.sampleRate
        )

        const data = buf.getChannelData(0)

        for (let i = 0; i < data.length; i++) {
            const t = i / ctx.sampleRate

            data[i] =
                Math.sin(2 * Math.PI * 800 * t) *
                Math.exp(-t * 40)
        }

        const gain = ctx.createGain()
        gain.gain.value = 0.2

        const src = ctx.createBufferSource()
        src.buffer = buf

        src.connect(gain)
        gain.connect(ctx.destination)

        src.start()
    } catch (_) { }
}

export default function EvidenceBoard() {
    const [activePin, setActivePin] = useState<string | null>(null)

    // Build a lookup for pin positions by id
    const pinMap = Object.fromEntries(
        pins.map((p) => [p.id, p])
    )

    return (
        <div className="max-w-5xl mx-auto">

            {/* Board hint */}
            <div className="flex items-center gap-3 mb-4">
                <p className="text-[9px] tracking-[4px] text-[#4a4438] uppercase">
                    Evidence Board — click a pin to inspect
                </p>

                <div className="flex-1 h-[1px] bg-[#1e1c18]" />
            </div>

            {/* Board */}
            <div
                className="relative w-full bg-[#0d0b09] border border-[#2a2720] overflow-hidden"
                style={{ paddingBottom: '60%' }}
            >

                {/* Cork texture overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, #1e1c18 1px, transparent 0)`,
                        backgroundSize: '24px 24px',
                        opacity: 0.4,
                    }}
                />

                {/* SVG string connections */}
                <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                >
                    {connections.map(([fromId, toId, color]) => {
                        const from = pinMap[fromId]
                        const to = pinMap[toId]

                        if (!from || !to) return null

                        // Center of each card
                        const x1 = from.x + 6
                        const y1 = from.y + 5
                        const x2 = to.x + 6
                        const y2 = to.y + 5

                        return (
                            <line
                                key={`${fromId}-${toId}`}
                                x1={x1}
                                y1={y1}
                                x2={x2}
                                y2={y2}
                                stroke={color}
                                strokeWidth="0.3"
                                strokeOpacity="0.4"
                                strokeDasharray="1 0.5"
                            />
                        )
                    })}
                </svg>

                {/* Pin cards */}
                {pins.map((pin) => (
                    <div
                        key={pin.id}
                        className="absolute cursor-pointer"
                        style={{
                            left: `${pin.x}%`,
                            top: `${pin.y}%`,
                            width: '13%',
                        }}
                        onClick={() => {
                            playPin()
                            setActivePin((prev) =>
                                prev === pin.id ? null : pin.id
                            )
                        }}
                    >

                        {/* Pin dot */}
                        <div
                            className="w-3 h-3 rounded-full mx-auto mb-1 border-2 border-[#0d0b09]"
                            style={{ background: pin.dotColor }}
                        />

                        {/* Card */}
                        <div className={`border p-2 transition-all duration-200 ${activePin === pin.id
                                ? 'border-[#e8c97a] bg-[#1a1814] scale-105'
                                : 'border-[#2a2720] bg-[#131210] hover:border-[#3a3428]'
                            }`}>
                            {/* Photo circle for subject pin */}
                            {pin.id === 'subject' ? (
                                <div className="flex flex-col items-center gap-1">
                                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#e8c97a] mx-auto">
                                        <img
                                            src="/photo.jpg"
                                            alt="Subject"
                                           
                                        />
                                    </div>
                                    <p className="text-[7px] tracking-[1.5px] uppercase text-center"
                                        style={{ color: pin.color }}>
                                        {pin.label}
                                    </p>
                                    <p className="text-[9px] text-[#c8c2b0] leading-tight font-medium text-center">
                                        {pin.value}
                                    </p>
                                    {pin.sub && (
                                        <p className="text-[7px] text-[#5a5448] leading-tight text-center">
                                            {pin.sub}
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <p
                                        className="text-[7px] tracking-[1.5px] uppercase mb-1"
                                        style={{ color: pin.color }}
                                    >
                                        {pin.label}
                                    </p>
                                    <p className="text-[9px] text-[#c8c2b0] leading-tight font-medium">
                                        {pin.value}
                                    </p>
                                    {pin.sub && (
                                        <p className="text-[7px] text-[#5a5448] mt-1 leading-tight">
                                            {pin.sub}
                                        </p>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Detail panel — shows when a pin is active */}
            {activePin &&
                (() => {
                    const pin = pinMap[activePin]

                    if (!pin) return null

                    // Get rich detail based on pin id
                    const job = experience.find(
                        (e) => e.id === activePin
                    )

                    const edu = education.find(
                        (e) => e.id === activePin
                    )

                    const proj = projects.find(
                        (p) => p.id === activePin
                    )

                    return (
                        <div className="mt-4 border border-[#2a2720] bg-[#121109] p-4 transition-all duration-300">

                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <p
                                        className="text-[9px] tracking-[3px] uppercase mb-1"
                                        style={{ color: pin.color }}
                                    >
                                        {pin.label}
                                    </p>

                                    <p className="text-sm text-[#c8c2b0]">
                                        {pin.value}
                                    </p>

                                    {pin.sub && (
                                        <p className="text-[10px] text-[#5a5448] mt-0.5">
                                            {pin.sub}
                                        </p>
                                    )}
                                </div>

                                <button
                                    onClick={() => setActivePin(null)}
                                    className="text-[#3a3428] hover:text-[#c8c2b0] text-xs transition-colors"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Job detail */}
                            {job && (
                                <div className="space-y-2 mt-3 border-t border-[#1e1c18] pt-3">
                                    {job.bullets.slice(0, 2).map((b, i) => (
                                        <div key={i} className="flex gap-2">
                                            <span className="text-[#c05a3a] text-[10px] flex-shrink-0">
                                                ▸
                                            </span>

                                            <p className="text-[10px] text-[#8a8070] leading-relaxed">
                                                {b}
                                            </p>
                                        </div>
                                    ))}

                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {job.tech.slice(0, 5).map((t) => (
                                            <span
                                                key={t}
                                                className="text-[8px] border border-[#2a2720] text-[#4a4438] px-1.5 py-0.5"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Education detail */}
                            {edu && (
                                <div className="mt-3 border-t border-[#1e1c18] pt-3">
                                    <p className="text-[10px] text-[#8a8070]">
                                        {edu.detail}
                                    </p>

                                    <p className="text-[10px] text-[#e8c97a] mt-1">
                                        CGPA: {edu.cgpa} · {edu.highlight}
                                    </p>
                                </div>
                            )}

                            {/* Publication detail */}
                            {activePin === 'publication' && (
                                <div className="mt-3 border-t border-[#1e1c18] pt-3">
                                    <p className="text-[10px] text-[#8a8070] leading-relaxed">
                                        {publication.title}
                                    </p>

                                    <p className="text-[9px] text-[#5a5448] mt-1">
                                        {publication.publisher} · {publication.year}
                                    </p>

                                    {/* FIXED: Added missing <a> opening tag */}
                                    <a
                                        href={publication.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[9px] text-[#e8c97a] hover:underline mt-2 block"
                                    >
                                        ▶ View Publication
                                    </a>
                                </div>
                            )}

                            {/* Skills detail */}
                            {['frontend', 'backend', 'aiml'].includes(activePin) && (
                                <div className="mt-3 border-t border-[#1e1c18] pt-3">
                                    <div className="flex flex-wrap gap-2">
                                        {skills
                                            .filter((s) =>
                                                activePin === 'frontend'
                                                    ? s.category === 'Frontend'
                                                    : activePin === 'backend'
                                                        ? ['Backend', 'Database'].includes(
                                                            s.category
                                                        )
                                                        : ['AI/ML', 'Data'].includes(
                                                            s.category
                                                        )
                                            )
                                            .map((s) => (
                                                <div
                                                    key={s.name}
                                                    className="flex items-center gap-2"
                                                >
                                                    <span className="text-[9px] text-[#5a5448]">
                                                        {s.name}
                                                    </span>

                                                    <div className="w-12 h-[2px] bg-[#1e1c18]">
                                                        <div
                                                            className="h-full bg-[#e8c97a]"
                                                            style={{
                                                                width: `${s.level}%`,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    )
                })()}

            {/* Legend */}
            <div className="mt-4 flex flex-wrap gap-4">
                {[
                    { color: '#e8c97a', label: 'Subject' },
                    { color: '#7ab36a', label: 'Active' },
                    { color: '#c8c2b0', label: 'Experience' },
                    { color: '#5a8ab8', label: 'Education' },
                    { color: '#8a6ab8', label: 'Skills' },
                    { color: '#c05a3a', label: 'Research' },
                ].map((item) => (
                    <div
                        key={item.label}
                        className="flex items-center gap-1.5"
                    >
                        <div
                            className="w-2 h-2 rounded-full"
                            style={{ background: item.color }}
                        />

                        <span className="text-[9px] text-[#4a4438] uppercase tracking-[1px]">
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>

        </div>
    )
}