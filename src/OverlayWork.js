import React from 'react'
import { a } from '@react-spring/web'

// company code maps to job display name
const jobs = [
  {
    name: 'Werner Sobek',
    code: 'WS',
    role: 'Structural Engineering',
    years: '2017 — 2018',
  },
  {
    name: 'Bollinger+Grohmann',
    code: 'BG',
    role: 'Structural Engineering | Computational Design',
    years: '2021 - 2023',
  },
  {
    name: 'Spacio',
    code: 'SP',
    role: 'Software Engineering',
    years: '2023 — 2024',
  },
  {
    name: 'TRAGRAUM Ingenieure',
    code: 'TR',
    role: 'Structural Engineering | Computational Design',
    years: '2019 — 2020, 2024 — ',
  },
]

const startY = 310
const rowHeight = 88

export default function OverlayWork({
  onJobClick,
  selectedJob,
  onShowProjects,
}) {
  return (
    <div className="overlay">
      <a.svg viewBox="0 0 583 720" xmlns="http://www.w3.org/2000/svg">
        {/* Logo marks */}
        <path
          fill="#E8B059"
          d="M50.5 61h9v9h-9zM50.5 50.5h9v9h-9zM40 50.5h9v9h-9z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M61 40H50.5v9H61v10.5h9V40h-9z"
          fill="#E8B059"
        />

        {/* Top-right metadata */}
        <text
          fill="#202020"
          fontFamily="Inter"
          fontSize={6}
          fontWeight="bold"
          letterSpacing="0.08em"
        >
          <tspan x={328} y={46.182}>
            EXPERIENCE
          </tspan>
        </text>
        <text
          fill="#202020"
          fontFamily="Inter"
          fontSize={6}
          fontWeight="bold"
          letterSpacing="0.08em"
        >
          <tspan x={392} y={46.182}>
            STRUCTURAL
          </tspan>
          <tspan x={392} y={54.182}>
            ENGINEERING
          </tspan>
          <tspan x={392} y={62.182}>
            & DESIGN
          </tspan>
        </text>

        {/* Sub-heading */}
        <text
          fill="#202020"
          fontFamily="Inter"
          fontSize={9}
          fontWeight={500}
          letterSpacing="0.15em"
        >
          <tspan x={40} y={175}>
            POSITIONS HELD IN PRACTICE
          </tspan>
        </text>

        {/* Section title */}
        <text
          fill="#E8B059"
          fontFamily="Inter"
          fontSize={52}
          fontWeight="bold"
          letterSpacing="-0.02em"
        >
          <tspan x={40} y={248}>
            Work —
          </tspan>
        </text>

        {/* Job rows */}
        {jobs.map((job, i) => {
          const y = startY + i * rowHeight
          const isSelected = selectedJob === job.code
          const isOther = selectedJob && !isSelected

          return (
            <g
              key={job.code}
              style={{ cursor: 'pointer', pointerEvents: 'all' }}
              onClick={() => onJobClick(job.code)}
            >
              <rect
                x={40}
                y={y - 30}
                width={503}
                height={rowHeight - 8}
                fill="transparent"
              />

              {isSelected && (
                <rect
                  x={40}
                  y={y - 28}
                  width={3}
                  height={rowHeight - 14}
                  fill="#E8B059"
                />
              )}

              <text
                fill={isSelected ? '#E8B059' : '#202020'}
                fontFamily="Inter"
                fontSize={28}
                fontWeight="bold"
                letterSpacing="-0.02em"
                opacity={isOther ? 0.25 : 1}
              >
                <tspan x={62} y={y}>
                  {job.name}
                </tspan>
              </text>

              <text
                fill="#202020"
                fontFamily="Inter"
                fontSize={8}
                fontWeight={500}
                letterSpacing="0.08em"
                opacity={isOther ? 0.1 : 0.5}
              >
                <tspan x={62} y={y + 16}>
                  {job.role.toUpperCase()}
                </tspan>
              </text>
            </g>
          )
        })}

        {/* --- NEW: Show All Projects Button --- */}
        <g
          className="btn-show-projects"
          style={{ cursor: 'pointer', pointerEvents: 'all' }}
          onClick={onShowProjects}
        >
          {/* Button Background/Hit Area */}
          <rect
            x={40}
            y={660}
            width={130}
            height={30}
            fill="#E8B059"
            fillOpacity={0.1}
          />

          {/* Button Text */}
          <text
            fill="#202020"
            fontFamily="Inter"
            fontSize={9}
            fontWeight="bold"
            letterSpacing="0.1em"
          >
            <tspan x={54} y={679}>
              VIEW ALL PROJECTS
            </tspan>
          </text>

          {/* Decorative Arrow or Line */}
          <path
            d="M150 676.5l4 2.5-4 2.5"
            stroke="#E8B059"
            fill="none"
            strokeWidth={1.5}
          />
        </g>
      </a.svg>

      <style jsx>{`
        .btn-show-projects:hover rect {
          fill-opacity: 0.2;
        }
        .btn-show-projects:hover text {
          fill: #e8b059;
        }
      `}</style>
    </div>
  )
}
