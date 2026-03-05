import React from 'react'
import { a } from '@react-spring/web'
import Logo from '../Logo'

const sections = [
  {
    id: 'education',
    label: 'EDUCATION',
    items: [
      {
        title: 'M.Sc. Structural Engineering',
        sub: 'Bauhaus University Weimar — Avg. 1.5',
        detail: 'Thesis: Data Based Decisions in Early Design Stages (1.0)',
        year: '2022',
      },
      {
        title: 'B.Eng. Structural Engineering',
        sub: 'University of Applied Sciences Coburg — Avg. 1.3',
        detail: 'Thesis: Topology Optimization in Construction Design (1.0)',
        year: '2019',
      },
    ],
  },
  {
    id: 'experience',
    label: 'EXPERIENCE',
    items: [
      {
        title: 'Structural Engineer',
        sub: 'TRAGRAUM Ingenieure mbB Nürnberg',
        detail: 'Structural analysis LP1–LP4',
        year: '2024 →',
      },
      {
        title: 'Structural Engineer & Developer',
        sub: 'Spacio AS Oslo',
        detail: 'Developing a web-based design & simulation platform',
        year: '2023–24',
      },
      {
        title: 'Structural Engineer',
        sub: 'Bollinger+Grohmann Frankfurt',
        detail: 'Timber dept. · Digitalisation group',
        year: '2022–23',
      },
    ],
  },
  {
    id: 'publications',
    label: 'PUBLICATIONS',
    items: [
      {
        title: 'Haschke & Gengnagel (2023)',
        sub: 'Implementierung von Ökobilanzen in frühen Entwurfsphasen',
        detail: 'nbau. Nachhaltig Bauen, 01',
        year: '2023',
      },
      {
        title: 'Haschke, Hofbeck, Tascheva (2022)',
        sub: 'Data Based Decisions in Early Design Stages',
        detail: 'DMS 2022 · Springer, Cham',
        year: '2022',
      },
    ],
  },
  {
    id: 'awards',
    label: 'AWARDS',
    items: [
      { title: 'Auf IT gebaut Award', sub: 'Bayern', detail: '', year: '2023' },
      {
        title: 'Building Outside the Box',
        sub: 'Bayerische Ingenieurkammer Bau',
        detail: '',
        year: '2022',
      },
      { title: 'Joachim Kurbasik Award', sub: '', detail: '', year: '2021' },
      {
        title: 'Golden Medal',
        sub: 'Special achievements · UAS Coburg',
        detail: '',
        year: '2019',
      },
    ],
  },
]

const interests = [
  { id: 'art', label: 'Art', icon: '◈' },
  { id: 'meditation', label: 'Meditation', icon: '◉' },
  { id: 'skating', label: 'Skating', icon: '◎' },
]

const GOLD = '#E8B059'
const DARK = '#202020'

export default function AboutOverlay({
  selectedSection,
  onSectionClick,
  onLogoClick,
}) {
  return (
    <div className="overlay">
      <a.svg viewBox="0 0 583 720" xmlns="http://www.w3.org/2000/svg">
        {/* Logo marks */}
        <Logo onClick={onLogoClick} />

        {/* ── Metadata ─────────────────────────────────── */}
        <text
          fill={DARK}
          fontFamily="Inter"
          fontSize={6}
          fontWeight="bold"
          letterSpacing="0.08em"
        >
          <tspan x={328} y={46}>
            PROFILE
          </tspan>
        </text>
        <text
          fill={DARK}
          fontFamily="Inter"
          fontSize={6}
          fontWeight="bold"
          letterSpacing="0.08em"
        >
          <tspan x={392} y={46}>
            STRUCTURAL
          </tspan>
          <tspan x={392} y={54}>
            ENGINEER
          </tspan>
          <tspan x={392} y={62}>
            & DEVELOPER
          </tspan>
        </text>

        {/* ── Sub-heading ──────────────────────────────── */}
        <text
          fill={DARK}
          fontFamily="Inter"
          fontSize={9}
          fontWeight={500}
          letterSpacing="0.15em"
        >
          <tspan x={40} y={175}>
            NIKLAS HASCHKE
          </tspan>
        </text>

        {/* ── Section title ────────────────────────────── */}
        <text
          fill={GOLD}
          fontFamily="Inter"
          fontSize={52}
          fontWeight="bold"
          letterSpacing="-0.02em"
        >
          <tspan x={40} y={248}>
            About —
          </tspan>
        </text>

        {/* ── Divider ──────────────────────────────────── */}
        <line
          x1={40}
          y1={258}
          x2={543}
          y2={258}
          stroke={DARK}
          strokeWidth={0.5}
          opacity={0.15}
        />

        {/* ── Sections ─────────────────────────────────── */}
        {sections.map((section, si) => {
          const baseY = 275 + si * 110
          const isSelected = selectedSection === section.id
          const isOther = selectedSection && !isSelected

          return (
            <g
              key={section.id}
              style={{ cursor: 'pointer', pointerEvents: 'all' }}
              onClick={() => onSectionClick && onSectionClick(section.id)}
            >
              {/* Hit area */}
              <rect
                x={40}
                y={baseY - 10}
                width={503}
                height={105}
                fill="transparent"
              />

              {/* Section label */}
              <text
                fill={isSelected ? GOLD : DARK}
                fontFamily="Inter"
                fontSize={7}
                fontWeight="bold"
                letterSpacing="0.12em"
                opacity={isOther ? 0.2 : 1}
              >
                <tspan x={40} y={baseY + 4}>
                  {section.label}
                </tspan>
              </text>

              {/* Bullet */}
              <circle
                cx={45}
                cy={baseY + 14}
                r={isSelected ? 3.5 : 1.8}
                fill={isSelected ? GOLD : DARK}
                opacity={isOther ? 0.2 : 1}
              />

              {/* Items — show top 2 always, all if selected */}
              {section.items
                .slice(0, isSelected ? section.items.length : 2)
                .map((item, ii) => {
                  const iy = baseY + 14 + ii * 22
                  return (
                    <g key={ii}>
                      {/* Year badge */}
                      <text
                        fill={isSelected ? GOLD : DARK}
                        fontFamily="Inter"
                        fontSize={6.5}
                        fontWeight="bold"
                        opacity={isOther ? 0.15 : isSelected ? 0.9 : 0.45}
                      >
                        <tspan x={65} y={iy}>
                          {item.year}
                        </tspan>
                      </text>

                      {/* Title */}
                      <text
                        fill={isSelected ? GOLD : DARK}
                        fontFamily="Inter"
                        fontSize={9.5}
                        fontWeight="bold"
                        letterSpacing="-0.01em"
                        opacity={isOther ? 0.2 : 1}
                      >
                        <tspan x={110} y={iy}>
                          {item.title}
                        </tspan>
                      </text>

                      {/* Sub */}
                      {item.sub ? (
                        <text
                          fill={DARK}
                          fontFamily="Inter"
                          fontSize={7}
                          fontWeight={500}
                          opacity={isOther ? 0.1 : 0.55}
                        >
                          <tspan x={110} y={iy + 9}>
                            {item.sub}
                          </tspan>
                        </text>
                      ) : null}
                    </g>
                  )
                })}

              {/* Selection underline */}
              {isSelected && (
                <line
                  x1={65}
                  y1={baseY + 100}
                  x2={350}
                  y2={baseY + 100}
                  stroke={GOLD}
                  strokeWidth={1.5}
                />
              )}

              {/* Section separator */}
              <line
                x1={40}
                y1={baseY + 105}
                x2={543}
                y2={baseY + 105}
                stroke={DARK}
                strokeWidth={0.5}
                opacity={isOther ? 0.05 : 0.1}
              />
            </g>
          )
        })}

        {/* ── Interests Row ─────────────────────────────── */}
        <text
          fill={DARK}
          fontFamily="Inter"
          fontSize={7}
          fontWeight="bold"
          letterSpacing="0.12em"
          opacity={0.5}
        >
          <tspan x={40} y={718}>
            INTERESTS
          </tspan>
        </text>

        {interests.map((interest, i) => (
          <g key={interest.id}>
            <text
              fill={DARK}
              fontFamily="Inter"
              fontSize={8}
              fontWeight={600}
              letterSpacing="0.06em"
              opacity={0.7}
            >
              <tspan x={110 + i * 140} y={718}>
                {interest.icon} {interest.label.toUpperCase()}
              </tspan>
            </text>
          </g>
        ))}
      </a.svg>
    </div>
  )
}
