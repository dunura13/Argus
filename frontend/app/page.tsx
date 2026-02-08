export default function HomePage() {
  return (
    <main className="min-h-screen bg-cyber-blue text-white flex items-center justify-center">
      <div className="max-w-2xl px-6 text-center">
        <div className="text-sm uppercase tracking-widest text-cyber-cyan">DealFlow-AI</div>
        <h1 className="mt-4 text-4xl font-semibold">Know what governments need before they post the RFP</h1>
        <p className="mt-4 text-white/70">
          Describe your startup, and instantly surface relevant government signals.
        </p>
        <div className="mt-6 flex items-center gap-3 justify-center">
          <a className="rounded bg-cyber-cyan text-black px-4 py-2" href="/demo">Open Demo</a>
        </div>
      </div>
    </main>
  );
}
