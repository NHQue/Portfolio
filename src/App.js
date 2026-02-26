import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/web'
import Overlay from './Overlay'
import Scene from './Scene'
import WorkScene from './WorkScene'
import ExpertiseScene from './ExpertiseScene'
import Sidebar from './Sidebar'
import OverlayWork from './OverlayWork'
import OverlayExpertise from './OverlayExpertise'
import OverlayProjects from './OverlayProjects' // Import the new overlay
import ModelCard from './ModelCard'

export default function App() {
  const [activeSection, setActiveSection] = React.useState(null)
  const [selectedJob, setSelectedJob] = React.useState(null)
  const [selectedProject, setSelectedProject] = React.useState(null) // New state for project selection
  const [hoveredModel, setHoveredModel] = React.useState(null)

  const [{ background, fill }, set] = useSpring(
    { background: '#f0f0f0', fill: '#202020' },
    [],
  )

  const handleJobClick = (jobCode) => {
    setSelectedJob((prev) => (prev === jobCode ? null : jobCode))
  }

  const handleProjectClick = (projectId) => {
    setSelectedProject((prev) => (prev === projectId ? null : projectId))
  }

  return (
    <a.main style={{ background }}>
      <Canvas shadows={false} className="canvas" dpr={[1, 2]}>
        {/* You might want a specific scene for Projects, or reuse WorkScene */}
        {activeSection === 'Work' || activeSection === 'Projects' ? (
          <WorkScene
            setBg={set}
            selectedJob={selectedJob}
            onModelHover={setHoveredModel}
          />
        ) : (
          <Scene setBg={set} />
        )}
        {activeSection !== 'Work' && activeSection !== 'Projects' && (
          <OrbitControls />
        )}
      </Canvas>

      {!activeSection && <Overlay />}

      {activeSection === 'Work' && (
        <OverlayWork
          onJobClick={handleJobClick}
          selectedJob={selectedJob}
          onShowProjects={() => setActiveSection('Projects')} // Triggered by your new button
        />
      )}

      {activeSection === 'Projects' && (
        <OverlayProjects
          onProjectClick={handleProjectClick}
          selectedProject={selectedProject}
          // Clicking "Close" takes you back to the Work view
          onClose={() => setActiveSection('Work')}
        />
      )}

      {activeSection === 'Expertise' && <OverlayExpertise />}

      <ModelCard model={hoveredModel} onClose={() => setHoveredModel(null)} />

      <Sidebar onNavigate={setActiveSection} activeSection={activeSection} />
    </a.main>
  )
}
