import React from 'react'
import { projects } from './Projects'

export default function OverlayProjects({
  onProjectClick,
  selectedProject,
  onClose,
}) {
  const projectsList = Object.entries(projects)
    .map(([id, data]) => ({ id, ...data }))
    .sort((a, b) => b.year - a.year)

  console.log('Projects List:', projectsList) // Debugging: Check the structure of projectsList

  return (
    <div className="full-screen-overlay">
      <div className="overlay-header">
        <div className="branding">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <rect x="10.5" y="21" width="9" height="9" fill="#E8B059" />
            <rect x="10.5" y="10.5" width="9" height="9" fill="#E8B059" />
            <rect x="0" y="10.5" width="9" height="9" fill="#E8B059" />
          </svg>
          <span className="metadata">PROJECT INDEX / 2017 — 2026</span>
        </div>

        <button className="close-btn" onClick={onClose}>
          CLOSE ✕
        </button>
      </div>

      <div className="content-container">
        <h1 className="section-title">All Projects —</h1>

        <div className="projects-grid">
          {projectsList.map((project, index) => {
            const isSelected = selectedProject === project.id

            // Logic to handle 23 images for 27 projects
            // This will use Bild1.png through Bild23.png, then restart or stop
            // const imgNumber = (index % 23) + 1
            const imgPath = `/pics/${project.id}.png`
            console.log(`Project: ${project.name}, Image Path: ${imgPath}`) // Debugging: Check image paths

            return (
              <div
                key={project.id}
                className={`project-row ${isSelected ? 'active' : ''}`}
                onClick={() => onProjectClick(project.id)}
              >
                <div className="row-year">{project.year}</div>

                {/* Image Thumbnail */}
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
        .overlay-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 60px;
        }
        .branding {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .metadata {
          font-size: 9px;
          font-weight: bold;
          letter-spacing: 0.1em;
          opacity: 0.5;
        }

        .close-btn {
          background: none;
          border: 1px solid #202020;
          padding: 8px 16px;
          font-size: 10px;
          font-weight: bold;
          cursor: pointer;
        }
        .close-btn:hover {
          background: #202020;
          color: #f0f0f0;
        }

        .section-title {
          font-size: 52px;
          color: #e8b059;
          margin-bottom: 40px;
        }

        .project-row {
          display: grid;
          /* Updated columns to include image space */
          grid-template-columns: 80px 100px 1fr 200px;
          gap: 20px;
          padding: 15px 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          cursor: pointer;
          align-items: center;

          color: #202020;
        }

        .row-image {
          width: 80px;
          height: 50px;
          background: #e0e0e0; /* placeholder color if image fails */
          overflow: hidden;
          border-radius: 2px;
        }

        .row-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          // filter: grayscale(0%);
          transition: filter 0.3s ease;
        }

        .project-row:hover .row-image img {
          filter: grayscale(0%);
        }

        .project-row:hover {
          opacity: 0.8;
        }
        .project-row.active {
          color: #e8b059;
          border-bottom: 1px solid #e8b059;
        }

        .projects-grid {
          background: #fff;
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
      `}</style>
    </div>
  )
}
