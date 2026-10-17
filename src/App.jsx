import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import Navbar from './components/Navbar';
import Background3D from './components/Background3D';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Photos from './pages/Photos';
import Sandbox from './pages/Sandbox';
import IutGuessr from './features/iut-guessr/IutGuessr';

function App() {
  return (
      <ReactLenis root options={{ lerp: 0.08, duration: 1.5, smoothTouch: true }}>
        <Router>
          <div className="min-h-screen relative overflow-hidden flex flex-col items-center select-none">
            <Background3D />
            <Navbar />
            <main className="w-full flex-grow flex flex-col items-center justify-center p-8 z-10">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projets" element={<Projects />} />
                <Route path="/photographie" element={<Photos />} />
                <Route path="/jeux" element={<Sandbox />} />
                <Route path="/jeux/iut-guessr" element={<IutGuessr />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ReactLenis>
  );
}

export default App;