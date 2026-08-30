'use client'

import Image from 'next/image'
import { subject, skills, publication, education } from '@/data/resume'

const categories = [
  'Frontend',
  'Backend',
  'Database',
  'Data',
  'AI/ML',
  'Testing',
  'Tools',
  'Cloud',
]

export default function SubjectProfile() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT — Mugshot + basic info */}
        <div className="md:col-span-1 space-y-4">

          {/* Photo */}
          <div className="border border-[#2a2720] p-3 bg-[#121109]">
            <div className="relative w-full aspect-square overflow-hidden">
              <Image
                src={subject.photo}
                alt={subject.name}
                fill
                className="object-cover object-top"
              />

              {/* Mugshot overlay effect */}
              <div className="absolute bottom-0 left-0 right-0 bg-[#0f0e0c] bg-opacity-80 px-2 py-1">
                <p className="text-[9px] tracking-[3px] text-[#e8c97a] uppercase">
                  {subject.name}
                </p>

                <p className="text-[8px] tracking-[2px] text-[#5a5448] uppercase">
                  {subject.title}
                </p>
              </div>
            </div>

            {/* Mugshot ruler */}
            <div className="flex justify-between mt-2 px-1">
              {['5\'0"', '5\'2"', '5\'4"', '5\'6"', '5\'8"'].map((h) => (
                <span
                  key={h}
                  className="text-[7px] text-[#2a2720]"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>

          {/* Status stamp */}
          <div className="border border-[#c05a3a] px-3 py-2 rotate-[-1deg] text-center">
            <p className="text-[#c05a3a] text-[10px] tracking-[4px] uppercase">
              At Large
            </p>

            <p className="text-[#5a5448] text-[8px] tracking-[2px] uppercase mt-1">
              Seeking Opportunities
            </p>
          </div>

          {/* Basic details */}
          <div className="border border-[#2a2720] bg-[#121109] p-4 space-y-3">
            {[
              {
                label: 'Jurisdiction',
                value: subject.location,
              },
              {
                label: 'Years Active',
                value: `${subject.yearsActive} years`,
              },
              {
                label: 'Status',
                value: 'Available',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex justify-between items-center border-b border-[#1e1c18] pb-2 last:border-0 last:pb-0"
              >
                <span className="text-[9px] tracking-[2px] text-[#4a4438] uppercase">
                  {item.label}
                </span>

                <span className="text-[11px] text-[#c8c2b0]">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Contact links */}
          <div className="border border-[#2a2720] bg-[#121109] p-4 space-y-2">
            <p className="text-[9px] tracking-[3px] text-[#4a4438] uppercase mb-3">
              Contact
            </p>

            <a
              href={`mailto:${subject.email}`}
              className="flex items-center gap-2 text-[11px] text-[#5a5448] hover:text-[#e8c97a] transition-colors duration-200"
            >
              <span className="text-[#2a2720]">▶</span>
              {subject.email}
            </a>

            <a
              href={subject.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[11px] text-[#5a5448] hover:text-[#e8c97a] transition-colors duration-200"
            >
              <span className="text-[#2a2720]">▶</span>
              GitHub
            </a>

            <a
              href={subject.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[11px] text-[#5a5448] hover:text-[#e8c97a] transition-colors duration-200"
            >
              <span className="text-[#2a2720]">▶</span>
              LinkedIn
            </a>
          </div>
        </div>

        {/* RIGHT — Details */}
        <div className="md:col-span-2 space-y-4">

          {/* Tagline */}
          <div className="border border-[#2a2720] bg-[#121109] p-4">
            <p className="text-[9px] tracking-[3px] text-[#4a4438] uppercase mb-2">
              Field Assessment
            </p>

            <p className="text-sm text-[#c8c2b0] italic leading-relaxed">
              "{subject.tagline}"
            </p>
          </div>

          {/* Publication — exhibit */}
          <div className="border border-[#e8c97a33] bg-[#121109] p-4">
            <p className="text-[9px] tracking-[3px] text-[#e8c97a] uppercase mb-2">
              Exhibit A — Defensive Publication
            </p>

            <a
              href={publication.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-[#c8c2b0] hover:text-[#e8c97a] transition-colors leading-relaxed block"
            >
              {publication.title}
            </a>

            <p className="text-[9px] text-[#4a4438] mt-1">
              {publication.publisher} · {publication.year} · w/ {publication.coAuthor}
            </p>
          </div>

          {/* Education */}
          <div className="border border-[#2a2720] bg-[#121109] p-4">
            <p className="text-[9px] tracking-[3px] text-[#4a4438] uppercase mb-3">
              Academic Record
            </p>

            <div className="space-y-3">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="border-b border-[#1e1c18] pb-3 last:border-0 last:pb-0"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[11px] text-[#c8c2b0]">
                        {edu.degree}
                      </p>

                      <p className="text-[10px] text-[#5a5448]">
                        {edu.institution}
                      </p>

                      <p className="text-[9px] text-[#3a3428] mt-1">
                        {edu.detail}
                      </p>
                    </div>

                    <div className="text-right flex-shrink-0 ml-4">
                      <p className="text-[10px] text-[#e8c97a]">
                        {edu.highlight}
                      </p>

                      <p className="text-[9px] text-[#4a4438]">
                        {edu.year}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skill threat assessment */}
          <div className="border border-[#2a2720] bg-[#121109] p-4">
            <p className="text-[9px] tracking-[3px] text-[#4a4438] uppercase mb-4">
              Threat Assessment — Skills
            </p>

            <div className="space-y-4">
              {categories.map((cat) => {
                const catSkills = skills.filter(
                  (s) => s.category === cat
                )

                if (catSkills.length === 0) return null

                return (
                  <div key={cat}>
                    <p className="text-[8px] tracking-[2px] text-[#3a3428] uppercase mb-2">
                      {cat}
                    </p>

                    <div className="space-y-2">
                      {catSkills.map((skill) => (
                        <div
                          key={skill.name}
                          className="flex items-center gap-3"
                        >
                          <span className="text-[10px] text-[#5a5448] w-24 flex-shrink-0">
                            {skill.name}
                          </span>

                          <div className="flex-1 h-[2px] bg-[#1e1c18] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#e8c97a] rounded-full transition-all duration-1000"
                              style={{
                                width: `${skill.level}%`,
                              }}
                            />
                          </div>

                          <span className="text-[9px] text-[#3a3428] w-6 text-right">
                            {skill.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}