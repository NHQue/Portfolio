import React from 'react'
import { a } from '@react-spring/web'

export default function HomeOverlay() {
  // Just a Figma export, the fill is animated
  return (
    <div className="overlay">
      <a.svg viewBox="0 0 583 720" xmlns="http://www.w3.org/2000/svg">
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
        <text
          style={{ whiteSpace: 'pre' }}
          fontFamily="Inter"
          fontSize={6}
          fontWeight="bold"
          letterSpacing="-.02em"
        >
          <tspan x={328} y={46.182} children="08/03/26" />
        </text>
        <text
          style={{ whiteSpace: 'pre' }}
          fontFamily="Inter"
          fontSize={6}
          fontWeight="bold"
          letterSpacing="-.02em"
        >
          <tspan x={392} y={46.182} children="AUF DER SUCHE " />
          <tspan x={392} y={54.182} children="NACH ARCHITEKT-" />
          <tspan x={392} y={62.182} children="ONISCHER RELEVANZ" />
        </text>
        <text
          style={{ whiteSpace: 'pre' }}
          fontFamily="Inter"
          fontSize={10.5}
          fontWeight={500}
          letterSpacing="0em"
        >
          {/* <tspan x={40} y={175.318} children="PORTFOLIO " /> */}
          <tspan x={40} y={188.318} children="PORTFOLIO - NIKLAS HASCHKE" />
        </text>
        <text
          fill="#E8B059"
          style={{ whiteSpace: 'pre' }}
          fontFamily="Inter"
          fontSize={52}
          fontWeight="bold"
          letterSpacing="0em"
        >
          <tspan x={40} y={257.909} children={'The Invocation \u2014'} />
        </text>
        <text
          style={{ whiteSpace: 'pre' }}
          fontFamily="Inter"
          fontSize={12}
          fontWeight="bold"
          letterSpacing="0em"
        >
          <tspan x={40} y={270.909} />
        </text>
        <text
          style={{ whiteSpace: 'pre' }}
          fontFamily="Inter"
          fontSize={48}
          fontWeight="bold"
          letterSpacing="0em"
        >
          <tspan x={40} y={321.909} children="Behold the sign and " />
          <tspan x={40} y={372.909} children="the very Hallowed " />
          <tspan x={40} y={423.909} children="Names of God full of " />
          <tspan x={40} y={474.909} children="power. Obey the " />
          <tspan x={40} y={525.909} children="power of this our " />
          <tspan x={40} y={576.909} children="pentacle;" />
        </text>
        <text
          style={{ whiteSpace: 'pre' }}
          fontFamily="Inter"
          fontSize={10.5}
          fontWeight={500}
          letterSpacing="0em"
        >
          <tspan x={326} y={640.318} children="An Engineer Imagines" />
        </text>
      </a.svg>
    </div>
  )
}

// export default function Overlay({ fill }) {
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
//         À la recherche de
//       </div>

//       {/* Second phrase - offset and styled */}
//       <div
//         style={{
//           position: "absolute",
//           top: "70%", // ✅ must go inside style
//           left: "70%",
//           fontFamily: "Inter",
//           fontSize: "20px",
//           fontWeight: "400",
//           fontStyle: "italic",
//           color: "#2a2a2a",
//           letterSpacing: "0.3px",
//           marginLeft: "60px",
//           opacity: 0.95,
//           textShadow: "0 1px 2px rgba(255, 255, 255, 0.8)",
//         }}
//       >
//         architektonischer Relevanz
//       </div>
//     </div>
//   );
// }
