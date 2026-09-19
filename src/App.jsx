import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import { useEffect } from 'react';

import Navbar from './components/Navbar';
import Background3D from './components/Background3D';

import Home from './pages/Home';
import Projects from './pages/Projects';
import Photos from './pages/Photos';
import Sandbox from './pages/Sandbox';

function App() {
  // Script existant pour permettre le défilement à la souris
  useEffect(() => {
    let isDragging = false;
    let startY;
    let scrollTop;
    const onMouseDown = (e) => {
      isDragging = true;
      startY = e.pageY - window.scrollY;
      scrollTop = window.scrollY;
      document.body.style.cursor = 'grabbing';
    };
    const onMouseUp = () => {
      isDragging = false;
      document.body.style.cursor = 'default';
    };
    const onMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const y = e.pageY - window.scrollY;
      const walk = (y - startY) * 1.5;
      window.scrollTo(0, scrollTop - walk);
    };
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
      // ReactLenis ajoute le défilement ultra-fluide
      <ReactLenis root options={{ lerp: 0.08, duration: 1.5, smoothTouch: true }}>
        <Router>
          <div className="min-h-screen relative overflow-hidden flex flex-col items-center select-none">

            {/* L'arrière-plan 3D et la Navbar restent fixes sur toutes les pages */}
            <Background3D />
            <Navbar />

            <main className="w-full flex-grow flex flex-col items-center justify-center p-8 z-10">
              {/* Le Routes agit comme un aiguillage : il affiche un seul composant selon l'URL */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projets" element={<Projects />} />
                <Route path="/photographie" element={<Photos />} />
                <Route path="/jeux" element={<Sandbox />} />
              </Routes>
            </main>

          </div>
        </Router>
      </ReactLenis>
  );
}

export default App;