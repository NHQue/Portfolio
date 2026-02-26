import React from 'react'

export default function Sidebar({ onNavigate, activeSection, fill }) {
  const [hovered, setHovered] = React.useState(null)

  const handleMenuClick = (item) => {
    if (activeSection === item) {
      onNavigate(null)
    } else {
      onNavigate(item)
    }
  }

  // Derive text color from the animated fill prop (dark or light mode)
  // fall through to a sensible default if fill isn't passed
  const baseColor = fill?.get ? fill.get() : fill || '#202020'

  return (
    <aside
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        height: '100vh',
        width: '52px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 10,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%',
          padding: '40px 0',
          pointerEvents: 'auto',
        }}
      >
        {/* Nav items */}
        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0px',
            alignItems: 'center',
          }}
        >
          {['Work', 'Expertise', 'About'].map((item) => (
            <div
              key={item}
              onClick={() => handleMenuClick(item)}
              onMouseEnter={() => setHovered(item)}
              onMouseLeave={() => setHovered(null)}
              style={{
                cursor: 'pointer',
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                transform: 'rotate(180deg)',
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color:
                  hovered === item || activeSection === item
                    ? '#E8B059'
                    : baseColor,
                padding: '18px 0',
                transition: 'color 0.25s ease',
                userSelect: 'none',
                // Subtle active indicator
                borderRight:
                  activeSection === item
                    ? '2px solid #E8B059'
                    : '2px solid transparent',
              }}
            >
              {item}
            </div>
          ))}
        </nav>

        {/* Thin divider line */}
        <div
          style={{
            width: '1px',
            height: '40px',
            background: '#E8B059',
            opacity: 0.4,
          }}
        />

        {/* Social links */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {[
            {
              label: 'LI',
              href: 'https://www.linkedin.com/in/niklas-haschke-245062185/',
            },
            { label: 'IG', href: 'https://www.instagram.com/hque_/' },
            { label: 'GH', href: 'https://github.com/NHQue' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setHovered(label)}
              onMouseLeave={() => setHovered(null)}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: hovered === label ? '#E8B059' : baseColor,
                opacity: hovered === label ? 1 : 0.45,
                padding: '14px 0',
                transition: 'color 0.25s ease, opacity 0.25s ease',
                textDecoration: 'none',
                userSelect: 'none',
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </aside>
  )
}
