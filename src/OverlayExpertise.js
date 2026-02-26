import React from 'react'
import { a } from '@react-spring/web'

const expertise = [
  {
    id: 'structural',
    title: 'Structural Analysis',
    subtitle: 'FEA, Load Calculation, Steel & Concrete',
    details: 'Advanced simulation and safety verification.',
  },
  {
    id: 'parametric',
    title: 'Parametric Design',
    subtitle: 'Grasshopper, Rhino, Geometry Optimization',
    details: 'Algorithmic approaches to complex forms.',
  },
  {
    id: 'coding',
    title: 'Coding',
    subtitle: 'React, Three.js, C#, Python',
    details: 'Building tools for AEC workflows.',
  },
]

const startY = 310
const rowHeight = 100 // Increased slightly for a more "expert" feel

export default function OverlayExpertise({
  onExpertiseClick,
  selectedExpertise,
}) {
  return (
    <div className="overlay">
      <a.svg viewBox="0 0 583 720" xmlns="http://www.w3.org/2000/svg">
        {/* Branding Logo Marks */}
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

        {/* Metadata */}
        <text
          fill="#202020"
          fontFamily="Inter"
          fontSize={6}
          fontWeight="bold"
          letterSpacing="0.08em"
        >
          <tspan x={328} y={46}>
            SKILLSET
          </tspan>
        </text>
        <text
          fill="#202020"
          fontFamily="Inter"
          fontSize={6}
          fontWeight="bold"
          letterSpacing="0.08em"
        >
          <tspan x={392} y={46}>
            COMPUTATIONAL
          </tspan>
          <tspan x={392} y={54}>
            ENGINEERING
          </tspan>
          <tspan x={392} y={62}>
            & DEVELOPMENT
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
            CORE COMPETENCIES
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
            Expertise —
          </tspan>
        </text>

        {/* Expertise Rows */}
        {expertise.map((item, i) => {
          const y = startY + i * rowHeight
          const isSelected = selectedExpertise === item.id
          const isOther = selectedExpertise && !isSelected

          return (
            <g
              key={item.id}
              style={{ cursor: 'pointer', pointerEvents: 'all' }}
              onClick={() => onExpertiseClick(item.id)}
            >
              {/* Invisible Hit Area */}
              <rect
                x={40}
                y={y - 40}
                width={500}
                height={rowHeight}
                fill="transparent"
              />

              {/* Active Bullet/Indicator */}
              <circle
                cx={45}
                cy={y - 8}
                r={isSelected ? 4 : 2}
                fill={isSelected ? '#E8B059' : '#202020'}
                opacity={isOther ? 0.2 : 1}
              />

              {/* Title */}
              <text
                fill={isSelected ? '#E8B059' : '#202020'}
                fontFamily="Inter"
                fontSize={32}
                fontWeight="bold"
                letterSpacing="-0.02em"
                opacity={isOther ? 0.25 : 1}
              >
                <tspan x={65} y={y}>
                  {item.title}
                </tspan>
              </text>

              {/* Subtitle / Tech Stack */}
              <text
                fill="#202020"
                fontFamily="Inter"
                fontSize={9}
                fontWeight={600}
                letterSpacing="0.05em"
                opacity={isOther ? 0.1 : 0.6}
              >
                <tspan x={65} y={y + 20}>
                  {item.subtitle.toUpperCase()}
                </tspan>
              </text>

              {/* Selection Line */}
              {isSelected && (
                <line
                  x1={65}
                  y1={y + 35}
                  x2={300}
                  y2={y + 35}
                  stroke="#E8B059"
                  strokeWidth={2}
                />
              )}
            </g>
          )
        })}
      </a.svg>
    </div>
  )
}
