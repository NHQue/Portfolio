import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/web'

import HomeOverlay from './Overlays/HomeOverlay'
import WorkOverlay from './Overlays/WorkOverlay'
import ExpertiseOverlay from './Overlays/ExpertiseOverlay'
import ProjectOverlay from './Overlays/ProjectOverlay'

import HomeScene from './Scenes/HomeScene'
import WorkScene from './Scenes/WorkScene'
import ExpertiseScene from './Scenes/ExpertiseScene'

import Sidebar from './Sidebar'
import ModelCard from './ModelCard'

export default function App() {
  const [activeSection, setActiveSection] = React.useState(null)
  const [selectedJob, setSelectedJob] = React.useState(null)
  const [selectedProject, setSelectedProject] = React.useState(null)
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

  // Determine which 3D scene to render
  const renderScene = () => {
    if (activeSection === 'Work' || activeSection === 'Projects') {
      return (
        <WorkScene
          setBg={set}
          selectedJob={selectedJob}
          onModelHover={setHoveredModel}
        />
      )
    }
    if (activeSection === 'Expertise') {
      return (
        <ExpertiseScene
          setBg={set}
          selectedJob={selectedJob}
          onModelHover={setHoveredModel}
          // laptopUrl="https://your-portfolio-site.com"
        />
      )
    }
    return <HomeScene setBg={set} />
  }

  const showOrbitControls =
    activeSection !== 'Work' &&
    activeSection !== 'Projects' &&
    activeSection !== 'Expertise'

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
        />
      )}

      {activeSection === 'Projects' && (
        <ProjectOverlay
          onProjectClick={handleProjectClick}
          selectedProject={selectedProject}
          onClose={() => setActiveSection('Work')}
        />
      )}

      {activeSection === 'Expertise' && <ExpertiseOverlay />}

      <ModelCard model={hoveredModel} onClose={() => setHoveredModel(null)} />

      <Sidebar onNavigate={setActiveSection} activeSection={activeSection} />
    </a.main>
  )
}
