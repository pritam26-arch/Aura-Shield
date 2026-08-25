function App() {
  return (
    <div className="h-screen w-full bg-slate-900 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600 mb-8">
        Aura-Shield Frontend Ready! 🛡️
      </h1>
      <button className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-[0_0_20px_rgba(220,38,38,0.7)] transition-all transform hover:scale-110 active:scale-95">
        TEST TAILWIND BUTTON
      </button>
    </div>
  );
}

export default App;