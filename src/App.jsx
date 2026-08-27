import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />

      {/* pt-24 ajoute de l'espace en haut pour ne pas que la carte passe sous la Navbar fixe */}
      <main className="pt-24 p-8 flex flex-col items-center justify-center min-h-screen">
        <div className="glass-card p-8 w-full max-w-lg">
          <h1 className="text-3xl font-bold text-accentPink mb-2">
            Matis Chedru
          </h1>
          <p className="text-accentGreen font-mono text-sm">
            &lt;status: structure responsive initialisée /&gt;
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
