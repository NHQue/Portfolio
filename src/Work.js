import React from 'react'
import { a } from '@react-spring/web'

const jobs = [
  {
    name: 'Werner Sobek',
    role: 'Structural Engineering',
    years: '2019 — 2020',
  },
  {
    name: 'Bollinger+Grohmann',
    role: 'Structural Engineering',
    years: '2020 — 2021',
  },
  { name: 'Spacio', role: 'Computational Design', years: '2021 — 2022' },
  {
    name: 'Tragraum Ingenieure',
    role: 'Structural Engineering',
    years: '2022 — 2024',
  },
]

const startY = 310
const rowHeight = 88

export default function OverlayWork() {
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
          style={{ whiteSpace: 'pre' }}
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
          style={{ whiteSpace: 'pre' }}
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

        {/* Thin top rule */}
        <line
          x1={40}
          y1={80}
          x2={543}
          y2={80}
          stroke="#202020"
          strokeWidth={0.3}
          opacity={0.2}
        />

        {/* Sub-heading */}
        <text
          fill="#202020"
          style={{ whiteSpace: 'pre' }}
          fontFamily="Inter"
          fontSize={9}
          fontWeight={500}
          letterSpacing="0.15em"
        >
          <tspan x={40} y={175}>
            POSITIONS HELD IN STRUCTURAL PRACTICE
          </tspan>
        </text>

        {/* Section title */}
        <text
          fill="#E8B059"
          style={{ whiteSpace: 'pre' }}
          fontFamily="Inter"
          fontSize={52}
          fontWeight="bold"
          letterSpacing="-0.02em"
        >
          <tspan x={40} y={248}>
            Work —
          </tspan>
        </text>

        {/* Divider before list */}
        <line
          x1={40}
          y1={268}
          x2={543}
          y2={268}
          stroke="#202020"
          strokeWidth={0.3}
          opacity={0.2}
        />

        {/* Job rows */}
        {jobs.map((job, i) => {
          const y = startY + i * rowHeight
          return (
            <g key={job.name}>
              {/* Index number */}
              <text
                fill="#E8B059"
                style={{ whiteSpace: 'pre' }}
                fontFamily="Inter"
                fontSize={9}
                fontWeight="bold"
                letterSpacing="0.05em"
              >
                <tspan x={40} y={y - 10}>
                  {String(i + 1).padStart(2, '0')}
                </tspan>
              </text>

              {/* Company name */}
              <text
                fill="#202020"
                style={{ whiteSpace: 'pre' }}
                fontFamily="Inter"
                fontSize={28}
                fontWeight="bold"
                letterSpacing="-0.02em"
              >
                <tspan x={62} y={y}>
                  {job.name}
                </tspan>
              </text>

              {/* Role */}
              <text
                fill="#202020"
                style={{ whiteSpace: 'pre' }}
                fontFamily="Inter"
                fontSize={8}
                fontWeight={500}
                letterSpacing="0.08em"
                opacity={0.5}
              >
                <tspan x={62} y={y + 16}>
                  {job.role.toUpperCase()}
                </tspan>
              </text>

              {/* Years — far right */}
              <text
                fill="#202020"
                style={{ whiteSpace: 'pre' }}
                fontFamily="Inter"
                fontSize={8}
                fontWeight={500}
                letterSpacing="0.05em"
                opacity={0.5}
                textAnchor="end"
              >
                <tspan x={543} y={y}>
                  {job.years}
                </tspan>
              </text>

              {/* Divider */}
              <line
                x1={40}
                y1={y + 30}
                x2={543}
                y2={y + 30}
                stroke="#E8B059"
                strokeWidth={0.4}
                opacity={0.25}
              />
            </g>
          )
        })}

        {/* Footer */}
        <text
          fill="#202020"
          style={{ whiteSpace: 'pre' }}
          fontFamily="Inter"
          fontSize={9}
          fontWeight={500}
          letterSpacing="0.05em"
          opacity={0.4}
        >
          <tspan x={326} y={690}>
            Structural Engineering & Architecture
          </tspan>
        </text>
      </a.svg>
    </div>
  )
}

// import React, { useState } from 'react'
// import { Canvas } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei'
// import { useSpring } from '@react-spring/core'
// import { a } from '@react-spring/web'
// // import Overlay from './Overlay'
// // import Scene from './Scene'
// // import Sidebar from './Sidebar'

// export default function Work({ fill }) {
//   return (
//     <div
//       className="overlay"
//       style={{
//         border: "1px solid black", // ✅ valid border
//         display: "inline-block",
//         padding: "8px",
//         position: "relative", // ✅ required for absolute children
//       }}
//     >
//       {/* Absolutely positioned child */}
//        {/* First phrase - elegant positioning */}
//       <div
//         style={{
//           position: "absolute",
//           top: "60%", // ✅ must go inside style
//           left: "50%",
//           fontFamily: "Georgia, serif",
//           fontSize: "72px",
//           fontWeight: "400",
//           fontStyle: "italic",
//           color: "#1a1a1a",
//           letterSpacing: "0.5px",
//           marginBottom: "12px",
//           opacity: 0.85,
//           textShadow: "0 1px 2px rgba(255, 255, 255, 0.8)",
//         }}
//       >
//         I worked for
//       </div>
//     </div>
//   );
// }

// // Work component to display when "Work" is clicked
// // export default function Work() {
// //   return (
// //     <div
// //       style={{
// //         position: 'fixed',
// //         top: '50%',
// //         left: '50%',
// //         transform: 'translate(-50%, -50%)',
// //         background: 'rgba(255, 255, 255, 0.95)',
// //         padding: '40px 60px',
// //         borderRadius: '8px',
// //         boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
// //         maxWidth: '800px',
// //         width: '90%',
// //         maxHeight: '80vh',
// //         overflow: 'auto',
// //         zIndex: 20,
// //         pointerEvents: 'auto',
// //       }}
// //     >
// //       <h2 style={{
// //         fontFamily: 'Inter, sans-serif',
// //         fontSize: '32px',
// //         marginBottom: '20px',
// //         color: '#1a1a1a'
// //       }}>
// //         Work
// //       </h2>
// //       <p style={{
// //         fontFamily: 'Inter, sans-serif',
// //         fontSize: '16px',
// //         lineHeight: '1.6',
// //         color: '#333'
// //       }}>
// //         Your work content goes here. Add your portfolio items, projects, or any other content you'd like to display.
// //       </p>
// //     </div>
// //   )
// // }
