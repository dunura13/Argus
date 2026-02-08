"use client";

import { useState } from "react";

export default function DemoPage() {
  const [startup, setStartup] = useState("");

  return (
    <main className="min-h-screen bg-cyber-blue text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-sm uppercase tracking-widest text-cyber-cyan">Demo</div>
        <h1 className="mt-4 text-3xl font-semibold">Describe your startup</h1>
        <textarea
          className="mt-4 w-full min-h-32 rounded bg-white/5 border border-white/10 p-4"
          placeholder="We build..."
          value={startup}
          onChange={(e) => setStartup(e.target.value)}
        />
        <button className="mt-4 rounded bg-cyber-cyan text-black px-4 py-2">Find Opportunities</button>
        <div className="mt-8 text-white/60">Backend integration pending.</div>
      </div>
    </main>
  );
}
