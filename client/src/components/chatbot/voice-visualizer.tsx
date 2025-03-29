import { useEffect, useRef } from 'react';

interface VoiceVisualizerProps {
  isActive: boolean;
}

export default function VoiceVisualizer({ isActive }: VoiceVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const bars = containerRef.current.querySelectorAll('.visualizer-bar');
    
    if (isActive) {
      bars.forEach(bar => {
        const randomDelay = Math.random() * 0.8;
        const randomDuration = 0.4 + Math.random() * 0.4;
        (bar as HTMLElement).style.animationDelay = `${randomDelay}s`;
        (bar as HTMLElement).style.animationDuration = `${randomDuration}s`;
      });
    }
  }, [isActive]);
  
  // Create array of 20 bars
  const bars = Array.from({ length: 20 }, (_, i) => i);
  
  return (
    <div 
      ref={containerRef}
      className={`visualizer px-4 border-t border-neutral-200 h-[60px] flex items-center justify-center ${isActive ? 'voice-active' : ''}`}
    >
      {bars.map((i) => (
        <div key={i} className="visualizer-bar h-3 bg-primary-400 w-1 mx-0.5 rounded-sm"></div>
      ))}
      
      <style jsx>{`
        .visualizer-bar {
          background-color: #5B8AD0;
          width: 4px;
          margin: 0 2px;
          border-radius: 2px;
          animation: none;
        }
        .voice-active .visualizer-bar {
          animation: soundwave 0.8s infinite alternate;
        }
        @keyframes soundwave {
          0% { height: 10px; }
          100% { height: 40px; }
        }
      `}</style>
    </div>
  );
}
