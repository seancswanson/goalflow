"use client";

import { useState, useRef, useEffect } from "react";
import DOTS from "vanta/dist/vanta.dots.min";
import BIRDS from "vanta/dist/vanta.birds.min";
import CELLS from "vanta/dist/vanta.cells.min";
import NET from "vanta/dist/vanta.net.min";
import * as THREE from "three";

export default function VantaBackground() {
  if (typeof window !== "undefined") {
    window.THREE = THREE;
  }

  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const myRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        // BIRDS({
        //   el: myRef.current,
        //   THREE: THREE, // use a custom THREE when initializing
        //   mouseControls: true,
        //   touchControls: true,
        //   gyroControls: false,
        //   minHeight: 200.0,
        //   minWidth: 200.0,
        //   scale: 1.0,
        //   scaleMobile: 1.0,
        // })
        NET({
          el: myRef.current,
          THREE: THREE, // use a custom THREE when initializing
          gyroControls: false,
          mouseControls: false,
          touchControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x646061,
          backgroundColor: "#fff",
          points: 13.0,
          maxDistance: 18.0,
          spacing: 18.0,
          lineColors: 0x646061,
        })
        // DOTS({
        //   el: myRef.current,
        //   THREE: THREE, // use a custom THREE when initializing
        //   mouseControls: true,
        //   touchControls: true,
        //   gyroControls: false,
        //   minHeight: 200.0,
        //   minWidth: 200.0,
        //   scale: 1.0,
        //   scaleMobile: 1.0,
        // })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  return <div ref={myRef} className="absolute top-0 w-full h-full -z-10" />;
}
