// src/components/AutoScrollCarousel.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AutoScrollCarousel = () => {
  const carouselRef = useRef();
  const trackRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const scrollWidth = track.scrollWidth;
      const viewportWidth = carouselRef.current.offsetWidth;
      const totalScroll = scrollWidth - viewportWidth;

      // ScrollTrigger animation timeline
      gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: carouselRef.current,
          start: "top center",
          end: () => `+=${scrollWidth}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, carouselRef);

    return () => ctx.revert();
  }, []);

  const images = [
    "https://imgs.search.brave.com/fzQzp9cFHJqoGESzPQ6p8-eRAJGtydbJvUhb4WNuEuU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucHJpc21pYy5p/by9lZGFwcC13ZWJz/aXRlL1p4ZVFvNEYz/TmJrQlgxUGVfQmFj/a2dyb3VuZC5wbmc_/YXV0bz1mb3JtYXQs/Y29tcHJlc3MmcmVj/dD0wLDIsMTIwMCw2/Mjcmdz0xMjAwJmg9/NjI3",

    "https://imgs.search.brave.com/tcOUxjRai0txnnMoKD04b_d_MhFTyIwqaRzyHuBpFJc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cmVhZHllZHVjYXRp/b24uY29tL2ltZy9j/b250YWluZXJzL2lt/YWdlcy9zb2x1dGlv/bi1wYWdlcy9uYS1m/b3N0ZXItY29tbXVu/aXR5LWFuZC1iZWxv/bmdpbmcvbmEtZm9z/dGVyLWNvbW11bml0/eS1hbmQtYmVsb25n/aW5nLTAucG5nLzMw/MzgwMGY2NGEwYmE1/MzUxNGY4M2NmNmM0/MTg1OGVmL25hLWZv/c3Rlci1jb21tdW5p/dHktYW5kLWJlbG9u/Z2luZy0wLnBuZw",

    "https://imgs.search.brave.com/UVRmGdsn8FmD02Trh8R7ufKmuDmdtM0n6xx4nJyR-JM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC53ZWJzaXRl/LWZpbGVzLmNvbS81/ZDExMDdhZjhiYmZj/NzI1ODA2ZTNhODMv/NjNmY2EzZDZiM2U0/YTA1MDNjMWNkNzE2/X0VucmljaGluZyUy/MExlYXJuaW5nJTIw/RXhwZXJpZW5jZSUy/MCgyKS5wbmc",

    "https://imgs.search.brave.com/TL25_NNlzJaYPRyWbI2fBHLY_5UwtIrj30LY7jHJ5ZM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sZWFy/bi5taWNyb3NvZnQu/Y29tL2VuLXVzL3Ry/YWluaW5nL21lZGlh/L2VkdWNhdG9yLWNl/bnRlci90b3BpY3Mv/dGVhY2hlci1zdHVk/ZW50cy1jbGFzc3Jv/b20tdGFibGUucG5n",

    "https://imgs.search.brave.com/LvvDqqFEuuWNbxLndm7QkeRsxUcv3XVTM0VK5aHj4qg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aW50ZWRhc2hib2Fy/ZC5jb20vaHMtZnMv/aHViZnMvbWVuLnBu/Zz93aWR0aD02MTcm/aGVpZ2h0PTU5NSZu/YW1lPW1lbi5wbmc",
  ];

  return (
    <div
      ref={carouselRef}
      className="relative w-full h-screen overflow-hidden bg-gray-800/90"
    >
      <div ref={trackRef} className="flex space-x-8 h-full items-center max-w-screen-xl mx-auto px-4">
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`carousel-${idx}`}
            className="w-[600px] h-[400px] object-cover rounded-2xl shadow-lg"
          />
        ))}
      </div>
    </div>
  );
};

export default AutoScrollCarousel;
