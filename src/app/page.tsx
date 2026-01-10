"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  // 1. Single state object to manage both theme and mounting status
  const [appState, setAppState] = useState({
    isDarkMode: false,
    mounted: false,
  });

  useEffect(() => {
    // Perform side-effect calculations
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && systemPrefersDark);

    // Apply the class to the document immediately (DOM manipulation)
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    /**
     * FIX: Wrap setState in requestAnimationFrame.
     * This moves the state update out of the synchronous execution flow of the effect,
     * preventing the "cascading renders" error while ensuring the UI updates 
     * as soon as the browser is ready.
     */
    window.requestAnimationFrame(() => {
      setAppState({
        isDarkMode: shouldBeDark,
        mounted: true,
      });
    });
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !appState.isDarkMode;
    
    // Update state
    setAppState((prev) => ({ ...prev, isDarkMode: newDarkMode }));
    
    // Update DOM and LocalStorage
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Prevent hydration mismatch (don't render content until we know the theme)
  if (!appState.mounted) {
    return <div className="min-h-screen bg-white dark:bg-black" />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-white font-sans text-black selection:bg-black selection:text-white dark:bg-black dark:text-white transition-colors duration-500">
      
      {/* Navigation */}
      <nav className="flex w-full max-w-6xl items-center justify-between px-6 py-10 md:px-10">
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-bold tracking-[0.2em] uppercase">
            Arnel James G. Delfin
          </span>
          <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-zinc-400 dark:text-zinc-600">
            Professional Portfolio
          </span>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-8 text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            <a href="#work" className="hover:text-black dark:hover:text-white transition-colors">Projects</a>
            <a href="mailto:arneljamesgdelfin5@gmail.com" className="hover:text-black dark:hover:text-white transition-colors">Contact</a>
          </div>

          <button 
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all"
          >
            {appState.isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            )}
          </button>
        </div>
      </nav>

      <main className="flex w-full max-w-6xl flex-col px-6 md:px-10">
        
        {/* Hero Section */}
        <section className="flex flex-col-reverse lg:flex-row items-center gap-12 py-16 md:py-28">
          <div className="flex flex-col gap-8 flex-1">
            <div className="space-y-2 text-center lg:text-left">
              <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-500 uppercase tracking-[0.3em]">
                Computer Science Student @ STI COLLEGE - General Santos 
              </h2>
              <h1 className="text-6xl font-medium tracking-tighter sm:text-8xl xl:text-9xl">
                Arnel James <br /> G. Delfin
              </h1>
            </div>
            <p className="max-w-xl text-xl leading-relaxed text-zinc-600 dark:text-zinc-400 text-center lg:text-left">
              Based in General Santos City. I specialize in building web applications with <strong>Laravel</strong> and offer sideline services for <strong>PC maintenance and troubleshooting</strong>.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <a href="/aj_files/Delfin_ArnelJames_Resume.pdf" target="_blank" className="flex h-14 items-center justify-center rounded-full bg-black px-10 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 shadow-lg">View Resume</a>
              <a href="/aj_files/Delfin_ArnelJames_AppLetter.pdf" target="_blank" className="flex h-14 items-center justify-center rounded-full border border-black px-10 text-xs font-bold uppercase tracking-widest transition-all hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black">App Letter</a>
            </div>
          </div>

          <div className="relative w-64 h-80 md:w-80 md:h-[480px] lg:w-[400px] lg:h-[550px] shrink-0">
            <div className="absolute inset-0 border border-black dark:border-white translate-x-4 translate-y-4 rounded-2xl -z-10"></div>
            <div className="w-full h-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl bg-zinc-100 dark:bg-zinc-900">
              <Image src="/delfin_image.JPG" alt="Arnel James" width={500} height={700} priority className="object-cover object-top w-full h-full lg:grayscale lg:hover:grayscale-0 transition-all duration-700 lg:scale-100 lg:hover:scale-105" />
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="work" className="flex flex-col gap-32 py-24 border-t border-zinc-100 dark:border-zinc-900">
          
          {/* 1. Thesis Project: Blaan Language */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">Featured Thesis Project</span>
              <h3 className="text-4xl font-medium tracking-tight">blaanlanguage.com</h3>
            </div>
            
            <div className="group relative overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl">
              
              {/* PC Overlay */}
              <a href="https://blaanlanguage.com" target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20 hidden lg:flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="rounded-full bg-white px-8 py-3 text-xs font-bold uppercase tracking-widest text-black">Visit Live Site</span>
              </a>

              {/* MOBILE Overlay - Centered with Transparent Border */}
              <a href="https://blaanlanguage.com" target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20 lg:hidden flex items-center justify-center bg-black/20">
                <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em] border border-white/50 px-6 py-3 rounded-full backdrop-blur-[2px]">
                  Open Live Website →
                </span>
              </a>

              <div className="aspect-video w-full relative">
                <Image
                  src="/blaanlanguange.com.jpg"
                  alt="Blaan Language Website"
                  fill
                  className="object-cover object-top transition-all duration-1000 lg:grayscale lg:group-hover:grayscale-0 lg:group-hover:scale-105"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                A gamified learning platform dedicated to B&apos;laan language preservation, utilizing <strong>AI and NLP</strong> to provide interactive vocabulary challenges and reward-based milestones.
              </p>
              <div className="flex flex-wrap gap-2 content-start">
                {['Laravel', 'AI/NLP', 'Gamification', 'MySQL'].map((t) => (
                  <span key={t} className="px-3 py-1 text-[10px] font-bold border border-zinc-200 dark:border-zinc-800 rounded-full uppercase tracking-widest">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Laravel System: Escape to LaagGensan */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">Booking Management System</span>
              <h3 className="text-4xl font-medium tracking-tight">Escape to LaagGensan</h3>
            </div>
            <div className="group relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl">
              <div className="aspect-video w-full relative">
                <Image src="/escapelaaggensan.png" alt="LaagGensan" fill className="object-cover object-top transition-all duration-1000 lg:grayscale lg:group-hover:grayscale-0 lg:group-hover:scale-105" />
              </div>
            </div>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              A comprehensive booking management system developed using <strong>Laravel MVC</strong>. It streamlines local tourism reservations with a clean dashboard.
            </p>
          </div>

          {/* 3. Game Dev: GhostTownExploration */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">Game Development (Unity)</span>
              <h3 className="text-4xl font-medium tracking-tight">GhostTownExploration</h3>
            </div>
            <div className="group relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl">
              <div className="aspect-video w-full relative">
                <Image src="/GhostTownExploration.jpg" alt="GhostTown" fill className="object-cover object-center transition-all duration-1000 lg:grayscale lg:group-hover:grayscale-0 lg:group-hover:scale-105" />
              </div>
            </div>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              An atmospheric exploration game developed using <strong>Unity</strong>. Focused on 3D environment design and immersive UI navigation.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex flex-col gap-16 py-20 border-t border-zinc-100 dark:border-zinc-900 text-center lg:text-left">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
            <div className="space-y-6">
              <h2 className="text-5xl font-medium tracking-tighter italic text-black dark:text-white">Let&apos;s build <br /> something great.</h2>
              <div className="space-y-1">
                <p className="text-zinc-500 text-sm uppercase tracking-widest">General Santos City, PH</p>
                <p className="text-zinc-500 text-sm uppercase tracking-widest">09635668689</p>
              </div>
            </div>
            <div className="flex flex-col text-left md:text-right gap-4">
              <a href="mailto:arneljamesgdelfin5@gmail.com" className="text-2xl md:text-3xl font-medium hover:underline decoration-1 underline-offset-8">arneljamesgdelfin5@gmail.com</a>
            </div>
          </div>
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 pt-8 border-t border-zinc-100 dark:border-zinc-900">
            © {new Date().getFullYear()} Arnel James G. Delfin — Built with Next.js
          </div>
        </footer>
      </main>
    </div>
  );
}