import React from 'react'
import { projects } from '../Projects'

export default function ProjectOverlay({
  onProjectClick,
  selectedProject,
  onClose,
}) {
  const projectsList = Object.entries(projects)
    .map(([id, data]) => ({ id, ...data }))
    .sort((a, b) => b.year - a.year)

  return (
    <div className="full-screen-overlay">
      {/* Close button — pinned top right */}
      <button className="close-btn" onClick={onClose}>
        CLOSE ✕
      </button>

      <div className="content-container">
        <h1 className="section-title">All Projects —</h1>

        <div className="projects-grid">
          {projectsList.map((project) => {
            const isSelected = selectedProject === project.id
            const imgPath = `/pics/${project.id}.png`

            return (
              <div
                key={project.id}
                className={`project-row ${isSelected ? 'active' : ''}`}
                onClick={() => onProjectClick(project.id)}
              >
                <div className="row-year">{project.year}</div>

                <div className="row-image">
                  <img
                    src={imgPath}
                    alt={project.name}
                    onError={(e) => (e.target.style.display = 'none')}
                  />
                </div>

                <div className="row-main">
                  <div className="row-name">{project.name}</div>
                  <div className="row-sub">
                    {project.location && <span>{project.location}</span>}
                    {project.architect && <span> • {project.architect}</span>}
                  </div>
                </div>

                <div className="row-role">{project.role}</div>
              </div>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        .full-screen-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #f0f0f0;
          z-index: 1000;
          overflow-y: auto;
          padding: 60px 40px;
          font-family: 'Inter', sans-serif;
          color: #202020;
        }

        /* ── Close button pinned top-right ── */
        .close-btn {
          position: fixed;
          top: 24px;
          right: 32px;
          background: none;
          border: 1px solid #202020;
          padding: 8px 16px;
          font-size: 10px;
          font-weight: bold;
          letter-spacing: 0.08em;
          cursor: pointer;
          z-index: 1001;
        }
        .close-btn:hover {
          background: #202020;
          color: #f0f0f0;
        }

        .content-container {
          margin-top: 20px;
        }

        .section-title {
          font-size: 52px;
          color: #e8b059;
          margin-bottom: 32px;
        }

        /* ── Grid wrapper — rounded + padded ── */
        .projects-grid {
          background: #fff;
          border-radius: 12px;
          padding: 8px 24px;
        }

        .project-row {
          display: grid;
          grid-template-columns: 80px 120px 1fr 200px;
          gap: 20px;
          padding: 16px 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          cursor: pointer;
          align-items: center;
          color: #202020;
        }

        .project-row:last-child {
          border-bottom: none;
        }

        .project-row:hover {
          opacity: 0.7;
        }

        .project-row.active {
          color: #e8b059;
          border-bottom: 1px solid #e8b059;
        }

        .row-image {
          width: 100px;
          height: 70px;
          background: #ffffff;
          overflow: hidden;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .row-image img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.3s ease;
        }

        .project-row:hover .row-image img {
          transform: scale(1.05);
        }

        .row-year {
          font-weight: bold;
          font-size: 14px;
          opacity: 0.4;
        }

        .row-name {
          font-size: 18px;
          font-weight: bold;
        }

        .row-sub {
          font-size: 11px;
          opacity: 0.6;
          margin-top: 4px;
        }

        .row-role {
          font-size: 10px;
          text-align: right;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          opacity: 0.5;
        }

        /* ── Mobile ── */
        @media (max-width: 640px) {
          .full-screen-overlay {
            padding: 40px 20px;
          }
          .close-btn {
            top: 16px;
            right: 20px;
          }
          .projects-grid {
            padding: 8px 16px;
            border-radius: 8px;
          }
          .project-row {
            grid-template-columns: 48px 72px 1fr;
          }
          .row-role {
            display: none;
          }
          .row-name {
            font-size: 15px;
          }
        }
      `}</style>
    </div>
  )
}
