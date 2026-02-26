import React from 'react'

const companyNames = {
  WS: 'Werner Sobek',
  BG: 'Bollinger+Grohmann',
  TR: 'Tragraum Ingenieure',
  SP: 'Spacio',
}

export default function ModelCard({ model, onClose }) {
  if (!model) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '48px',
        right: '80px',
        zIndex: 20,
        fontFamily: 'Inter, sans-serif',
        pointerEvents: 'auto', // ← changed from 'none' so X is clickable
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Amber top rule + X button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '12px',
          gap: '12px',
        }}
      >
        <div style={{ flex: 1, height: '2px', background: '#E8B059' }} />
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0',
            color: '#202020',
            opacity: 0.4,
            fontSize: '14px',
            lineHeight: 1,
            fontWeight: 300,
          }}
        >
          ✕
        </button>
      </div>

      {/* Project name */}
      <div
        style={{
          fontSize: '22px',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: '#202020',
          marginBottom: '16px',
          lineHeight: 1.1,
        }}
      >
        {model.name}
      </div>

      {/* Metadata rows */}
      {[
        {
          label: 'COMPANY',
          value: companyNames[model.company] || model.company,
        },
        { label: 'YEAR', value: model.year },
        { label: 'MATERIAL', value: model.material },
        { label: 'TYPOLOGY', value: model.typology },
      ].map(({ label, value }) => (
        <div
          key={label}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: '32px',
            marginBottom: '6px',
          }}
        >
          <span
            style={{
              fontSize: '7px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: '#202020',
              opacity: 0.4,
            }}
          >
            {label}
          </span>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.01em',
              color: '#202020',
            }}
          >
            {value}
          </span>
        </div>
      ))}

      {/* Bottom rule */}
      <div
        style={{
          width: '100%',
          height: '0.5px',
          background: '#E8B059',
          marginTop: '12px',
          opacity: 0.4,
        }}
      />
    </div>
  )
}
