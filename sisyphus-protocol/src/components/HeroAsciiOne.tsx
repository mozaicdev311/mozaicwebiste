import React, { useEffect, useRef } from 'react';

interface HeroAsciiOneProps {
  videoSrc?: string;
}

export const HeroAsciiOne: React.FC<HeroAsciiOneProps> = ({ 
  videoSrc = "/atlas-globe.mp4" 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Recreate offscreen canvas on resize
      const offscreen = document.createElement('canvas');
      offscreen.width = canvas.width;
      offscreen.height = canvas.height;
      offscreenCanvasRef.current = offscreen;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Prevent loop stutter by seeking slightly before the very end of the video
    const handleTimeUpdate = () => {
      if (video.duration && video.currentTime >= video.duration - 0.05) {
        video.currentTime = 0;
        video.play().catch(e => console.log("Video play error:", e));
      }
    };
    video.addEventListener('timeupdate', handleTimeUpdate);

    // Force video play
    video.play().catch(e => console.log("Video play error:", e));

    const animate = (time: number) => {
      const width = canvas.width;
      const height = canvas.height;
      const offscreen = offscreenCanvasRef.current;
      if (!offscreen) return;

      const offCtx = offscreen.getContext('2d', { willReadFrequently: true });
      if (!offCtx) return;

      // 1. Fill canvas black
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, width, height);

      // 5. Draw scattered background dot grid (Drawn BEHIND halftone figure)
      const hSpacing = width * 0.026;
      const vSpacing = height * 0.037;
      const cols = Math.ceil(width / hSpacing);
      const rows = Math.ceil(height / vSpacing);

      ctx.save();
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const timeSec = time / 1000;
          const jx = Math.sin(c * 7.3 + r * 3.1) * hSpacing * 0.3;
          const jy = Math.cos(c * 2.1 + r * 5.4) * vSpacing * 0.3; // Added vertical jitter for balance
          
          const x = c * hSpacing + jx;
          const y = r * vSpacing + jy;
          
          let opacity = 0.22;
          opacity *= (0.5 + Math.sin(timeSec * 1.1 + c * 0.38 + r * 0.71) * 0.5);
          
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.fillRect(x, y, 1, 1); // 1px fixed
        }
      }
      ctx.restore();

      // 2. Draw video frame to offscreen canvas
      const isMobile = width < 768;
      
      // Calculate dimensions to maintain video aspect ratio
      let figH = isMobile ? height * 0.6 : height * 0.82;
      const videoAspect = video.videoWidth ? (video.videoWidth / video.videoHeight) : (16 / 9);
      let figW = figH * videoAspect;

      // Cap width
      const maxW = isMobile ? width * 0.9 : width * 0.55;
      if (figW > maxW) {
        figW = maxW;
        figH = figW / videoAspect;
      }

      const drawX = isMobile ? (width - figW) / 2 : width * 0.05;
      const drawY = isMobile ? (height - figH) * 0.3 : (height - figH) / 2;

      // Draw video if ready. Only clear the canvas if we have a new frame to draw,
      // preventing a black flash when the video loops and briefly drops readyState.
      if (video.readyState >= 2) {
        offCtx.clearRect(0, 0, width, height);
        offCtx.drawImage(video, drawX, drawY, figW, figH);
      }

      // 3. Read offscreen pixel data
      const imageData = offCtx.getImageData(0, 0, width, height);
      const data = imageData.data;

      // 4. Halftone Loop
      // Decrease step size for much finer, tinier dots resembling the reference image
      const step = Math.max(2, Math.floor(width / 280));
      
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4;
          const r = data[index];
          const g = data[index + 1];
          const b = data[index + 2];
          
          const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
          
          if (brightness < 0.08) continue;

          // Make the dots slightly smaller relative to the step for a crisper "pixel" look
          const size = brightness * step * 0.4;
          const alpha = Math.min(0.95, brightness * 1.8);

          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          // Draw as squares to match the crisp, pixelated dithered look of the reference
          ctx.fillRect(x - size/2, y - size/2, size, size);
        }
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black font-mono text-white">
      {/* Hidden Video Source */}
      <video
        ref={videoRef}
        src={videoSrc}
        className="hidden"
        muted
        autoPlay
        loop
        playsInline
        crossOrigin="anonymous"
      />

      {/* Main Canvas Engine */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* UI Overlay Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6">
        
        {/* Top Header Bar */}
        <header className="flex justify-between items-center border-b border-white/20 pb-2 text-[10px] tracking-widest uppercase mt-20 md:mt-0">
          <div className="hidden md:block">MOZAIC | EST. 2026</div>
          <div className="flex gap-4 w-full md:w-auto justify-between md:justify-end">
            <span>LAT: 48.8566° N</span>
            <span>LNG: 2.3522° E</span>
          </div>
        </header>

        {/* Corner Brackets */}
        <div className="hidden md:block absolute top-12 left-6 w-8 h-8 border-t border-l border-white/40" />
        <div className="hidden md:block absolute top-12 right-6 w-8 h-8 border-t border-r border-white/40" />
        <div className="hidden md:block absolute bottom-16 left-6 w-8 h-8 border-b border-l border-white/40" />
        <div className="hidden md:block absolute bottom-16 right-6 w-8 h-8 border-b border-r border-white/40" />

        {/* CTA Block - Right Half */}
        <div className="relative mt-auto mb-8 md:absolute md:right-[10%] md:bottom-auto md:top-1/2 md:-translate-y-1/2 w-full max-w-md pointer-events-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] flex-1 bg-white/30" />
            <span className="text-xs tracking-[0.2em] uppercase text-white/50">Founder-led studio</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6 leading-[1.1]">
            Brand, product, and intelligent systems.<br />
            <span className="text-white/50">Composed as one.</span>
          </h1>

          {/* 40-dot row */}
          <div className="flex gap-1 mb-8 overflow-hidden">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="w-1 h-1 bg-white/40 rounded-full flex-shrink-0" />
            ))}
          </div>

          <p className="text-sm md:text-base text-white/70 leading-relaxed mb-10 max-w-sm">
            For companies where brand, product, and growth need to hold together from the start. One operating team. Led by founders. Backed by specialists.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 border border-white hover:bg-white hover:text-black transition-colors duration-300 text-xs tracking-[0.2em] uppercase bg-black/50 backdrop-blur-sm">
              Start a Project
            </button>
            <button className="px-8 py-4 border border-white/30 hover:border-white transition-colors duration-300 text-xs tracking-[0.2em] uppercase bg-black/50 backdrop-blur-sm">
              View Work
            </button>
          </div>

          <div className="mt-12 text-[9px] tracking-[0.3em] text-white/30 uppercase">
            MOZAIC.SYS // INIT_SEQ
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <footer className="flex justify-between items-end text-[9px] tracking-widest uppercase hidden md:flex">
          <div className="bg-black/40 backdrop-blur-sm p-2 flex gap-6 border-l border-white/20">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 animate-pulse rounded-full" />
              SYSTEM.ACTIVE
            </div>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-1 h-3 bg-white/20" />
              ))}
            </div>
            <div>V1.0.0</div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm p-2 flex gap-6 border-r border-white/20 text-right">
            <div>◐ RENDERING | DOTS</div>
            <div>FRAME: ∞</div>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default HeroAsciiOne;
