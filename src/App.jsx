import Navbar from './components/Navbar';
import Background3D from './components/Background3D';

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Le fond 3D en arrière-plan */}
      <Background3D />

      <Navbar />

      <main className="pt-24 p-8 flex flex-col items-center justify-center min-h-screen">
        <div className="glass-card p-8 w-full max-w-lg">
          <h1 className="text-3xl font-bold text-accentPink mb-2">
            Matis Chedru
          </h1>
          <p className="text-accentGreen font-mono text-sm">
            &lt;status: moteur 3D opérationnel /&gt;
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
