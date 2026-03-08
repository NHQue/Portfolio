import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/web'

import HomeOverlay from './Overlays/HomeOverlay'
import WorkOverlay from './Overlays/WorkOverlay'
import ExpertiseOverlay from './Overlays/ExpertiseOverlay'
import ProjectOverlay from './Overlays/ProjectOverlay'
import AboutOverlay from './Overlays/AboutOverlay'

import HomeScene from './Scenes/HomeScene'
import WorkScene from './Scenes/WorkScene'
import ExpertiseScene from './Scenes/ExpertiseScene'

import Sidebar from './Sidebar'
import ModelCard from './ModelCard'

export default function App() {
  const [activeSection, setActiveSection] = React.useState(null)
  const [selectedJob, setSelectedJob] = React.useState(null)
  const [selectedProject, setSelectedProject] = React.useState(null)
  const [selectedExpertise, setSelectedExpertise] = React.useState(null)
  const [hoveredModel, setHoveredModel] = React.useState(null)

  const [{ background, fill }, set] = useSpring(
    { background: '#f0f0f0', fill: '#202020' },
    [],
  )

  const handleJobClick = (jobCode) => {
    setSelectedJob((prev) => (prev === jobCode ? null : jobCode))
  }

  const handleProjectClick = (projectId) => {
    console.log('Project clicked:', projectId)
    setSelectedProject((prev) => (prev === projectId ? null : projectId))
  }

  const handleExpertiseClick = (expertiseId) => {
    setSelectedExpertise((prev) => (prev === expertiseId ? null : expertiseId))
  }

  const resetWorkScene = React.useRef(null)

  // Determine which 3D scene to render
  const renderScene = () => {
    if (activeSection === 'Work' || activeSection === 'Projects') {
      return (
        <WorkScene
          setBg={set}
          selectedJob={selectedJob}
          onModelHover={setHoveredModel}
          onResetRef={resetWorkScene}
        />
      )
    } else if (activeSection === 'Expertise') {
      return (
        <ExpertiseScene
          setBg={set}
          selectedExpertise={selectedExpertise}
          // key={selectedExpertise} // 👈 forces Laptop to remount when expertise changes
        />
      )
    } else if (activeSection === 'About') {
      // Could have a dedicated AboutScene, but for now let's just reuse HomeScene with a different bg color
      set({ background: '#e0e0e0' })
    } else {
      return <HomeScene setBg={set} />
    }
  }

  const showOrbitControls =
    activeSection !== 'Work' &&
    activeSection !== 'Projects' &&
    activeSection !== 'Expertise' &&
    activeSection !== 'About'

  return (
    <a.main style={{ background }}>
      <Canvas shadows={false} className="canvas" dpr={[1, 2]}>
        {renderScene()}
        {showOrbitControls && (
          <OrbitControls enableZoom={false} enablePan={false} />
        )}
      </Canvas>

      {!activeSection && <HomeOverlay />}

      {activeSection === 'Work' && (
        <WorkOverlay
          onJobClick={handleJobClick}
          selectedJob={selectedJob}
          onShowProjects={() => setActiveSection('Projects')}
          onLogoClick={() => setActiveSection(null)}
        />
      )}

      {activeSection === 'Projects' && (
        <ProjectOverlay
          onProjectClick={handleProjectClick}
          selectedProject={selectedProject}
          onClose={() => setActiveSection('Work')}
        />
      )}

      {activeSection === 'Expertise' && (
        <ExpertiseOverlay
          onExpertiseClick={handleExpertiseClick}
          selectedExpertise={selectedExpertise}
          onLogoClick={() => setActiveSection(null)}
        />
      )}

      {activeSection === 'About' && (
        <AboutOverlay
          // onExpertiseClick={handleExpertiseClick}
          // selectedExpertise={selectedExpertise}
          onLogoClick={() => setActiveSection(null)}
        />
      )}

      <ModelCard
        model={hoveredModel}
        onClose={() => {
          setHoveredModel(null)
          if (resetWorkScene.current) resetWorkScene.current()
        }}
      />
      <Sidebar onNavigate={setActiveSection} activeSection={activeSection} />
    </a.main>
  )
}
