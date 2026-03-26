"use client";

import React from "react";
import { NoiseOverlay, ScanlineOverlay, StorytellingBridge } from "./ui/Shared";
import Section02Problem from "./sections/Section02Problem";
import Section03Archive from "./sections/Section03Archive";
import Section04Proof from "./sections/Section04Proof";
import Section05FrontDoors from "./sections/Section05FrontDoors";
import Section06Output from "./sections/Section06Output";
import Section07Engagement from "./sections/Section07Engagement";
import Section08Team from "./sections/Section08Team";
import Section09CTA from "./sections/Section09CTA";
import Footer from "./sections/Footer";

export default function MainContent() {
  return (
    <div className="bg-black text-white font-sans antialiased selection:bg-white selection:text-black relative">
      <style dangerouslySetInnerHTML={{__html: `
        .glitch-hover:hover {
          animation: glitch-skew 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
          color: #fff;
          text-shadow: 2px 0px #ff0000, -2px 0px #00ffff;
        }
        @keyframes glitch-skew {
          0% { transform: skew(0deg); }
          20% { transform: skew(-10deg); }
          40% { transform: skew(10deg); }
          60% { transform: skew(-5deg); }
          80% { transform: skew(5deg); }
          100% { transform: skew(0deg); }
        }
        .laser-scan {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: rgba(255,255,255,0.8);
          box-shadow: 0 0 10px rgba(255,255,255,0.5);
          opacity: 0;
          transform: translateY(-100%);
        }
        .group:hover .laser-scan,
        .group[data-active="true"] .laser-scan {
          animation: scan 2s linear infinite;
          opacity: 1;
        }
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(400px); }
        }
      `}} />
      
      <NoiseOverlay />
      <ScanlineOverlay />
      
      <StorytellingBridge label="SYSTEM.INIT" />
      <Section02Problem />
      
      <StorytellingBridge label="LOAD.ARCHIVE" />
      <Section03Archive />

      <StorytellingBridge label="VERIFY.EVIDENCE" />
      <Section04Proof />

      <StorytellingBridge label="SELECT.PATH" />
      <Section05FrontDoors />

      <StorytellingBridge label="DEFINE.OUTPUT" />
      <Section06Output />

      <StorytellingBridge label="EXECUTION.MODELS" />
      <Section07Engagement />

      <StorytellingBridge label="ACCESS.ROSTER" />
      <Section08Team />

      <StorytellingBridge label="INITIATE.CONTACT" />
      <Section09CTA />

      <Footer />
    </div>
  );
}
