import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Background3D from './components/Background3D';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen relative overflow-hidden flex flex-col items-center">
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
  );
}

export default App;
