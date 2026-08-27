import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Background3D from './components/Background3D';
import Home from './pages/Home';

function App() {
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
    <ReactLenis root options={{ lerp: 0.08, duration: 1.5, smoothTouch: true }}>
      <Router>
        <div className="min-h-screen relative overflow-hidden flex flex-col items-center select-none">
          <Background3D />
          <Navbar />
          <main className="w-full flex-grow flex flex-col items-center justify-center p-8 z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projets" element={<div className="glass-card p-8 mt-32 text-accentPink">Page Projets en construction</div>} />
              <Route path="/photographie" element={<div className="glass-card p-8 mt-32 text-accentPink">Page Photo en construction</div>} />
              <Route path="/jeux" element={<div className="glass-card p-8 mt-32 text-accentPink">Page Jeux en construction</div>} />
            </Routes>
          </main>
        </div>
      </Router>
    </ReactLenis>
  );
}

export default App;
