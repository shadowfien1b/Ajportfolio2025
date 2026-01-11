"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Settings() {
  const [appState, setAppState] = useState({
    isDarkMode: false,
    mounted: false,
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && systemPrefersDark);

    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAppState({ isDarkMode: shouldBeDark, mounted: true });
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !appState.isDarkMode;
    setAppState((prev) => ({ ...prev, isDarkMode: newDarkMode }));
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  if (!appState.mounted) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-sans transition-colors duration-500">
      <nav className="flex w-full max-w-6xl mx-auto items-center justify-between px-6 py-10 md:px-10">
        <Link href="/" className="flex items-center gap-2 group">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          <span className="text-xs font-bold uppercase tracking-widest">Back to Home</span>
        </Link>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-medium tracking-tight mb-12">Settings</h1>

        <div className="space-y-12">
          {/* Appearance Section */}
          <section className="space-y-6">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">Appearance</h2>
            <div className="flex items-center justify-between p-6 rounded-2xl border border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/50">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-zinc-500">Adjust how the portfolio looks to you.</p>
              </div>
              <button 
                onClick={toggleTheme}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${appState.isDarkMode ? 'bg-white' : 'bg-zinc-200'}`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 rounded-full transition-transform duration-300 ${appState.isDarkMode ? 'translate-x-6 bg-black' : 'bg-white'}`} />
              </button>
            </div>
          </section>

          {/* Regional Section */}
          <section className="space-y-6">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border-b border-zinc-100 dark:border-zinc-900">
                <span className="text-sm">Language</span>
                <span className="text-sm font-medium text-zinc-500">English (US)</span>
              </div>
              <div className="flex items-center justify-between p-4 border-b border-zinc-100 dark:border-zinc-900">
                <span className="text-sm">Timezone</span>
                <span className="text-sm font-medium text-zinc-500">GMT+8 (PHT)</span>
              </div>
            </div>
          </section>

          {/* Information Section */}
          <section className="p-8 rounded-3xl bg-zinc-100 dark:bg-zinc-900 mt-20">
            <p className="text-xs leading-relaxed text-zinc-500">
              These settings are stored locally in your browser. Clearing your cache will reset these preferences to default.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}