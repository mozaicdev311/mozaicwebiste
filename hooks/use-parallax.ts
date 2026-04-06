"use client"

import { useState, useEffect } from "react"

export function useParallax(intensity = 15) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Desktop fallback: Mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const x = ((e.clientX / window.innerWidth) - 0.5) * intensity
      const y = ((e.clientY / window.innerHeight) - 0.5) * intensity
      setOffset({ x: -x, y: -y }) // Invert for natural parallax
    }

    // Mobile: Gyroscope / Accelerometer
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma === null || e.beta === null) return
      
      // gamma is the left-to-right tilt in degrees (-90 to 90)
      // beta is the front-to-back tilt in degrees (-180 to 180)
      // We normalize these values and apply the intensity multiplier
      
      // Constrain gamma to reasonable viewing angles (-45 to 45)
      const constrainedGamma = Math.max(-45, Math.min(45, e.gamma))
      
      // Beta (holding phone vertically usually sits around 45-70 degrees)
      // We assume ~60 is neutral holding position
      const neutralBeta = 60
      const constrainedBeta = Math.max(neutralBeta - 45, Math.min(neutralBeta + 45, e.beta)) - neutralBeta
      
      const x = (constrainedGamma / 45) * intensity
      const y = (constrainedBeta / 45) * intensity
      
      setOffset({ x: -x, y: -y }) // Invert for natural parallax
    }

    // Check if we're on a device that supports orientation
    if (typeof window !== "undefined" && window.DeviceOrientationEvent) {
      // Need to request permission on iOS 13+
      // For testing, we'll attach both, but orientation overrides mouse if active
      window.addEventListener("deviceorientation", handleOrientation)
    }
    
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("deviceorientation", handleOrientation)
    }
  }, [intensity])

  return offset
}
