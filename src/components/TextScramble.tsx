import { useEffect, useState } from 'react';

interface TextScrambleProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
  trigger?: boolean;
}

export default function TextScramble({
  text,
  delay = 0,
  duration = 800,
  className = '',
  trigger = true,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (!trigger) {
      const chars = '01#X$/@_-%';
      let place = '';
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          place += ' ';
        } else {
          place += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      setDisplayText(place);
      return;
    }

    const chars = '01#X$/@_-%!?*[]{}+=><';
    let isRunning = true;
    let frame = 0;
    const frameRate = 25;
    const totalFrames = Math.floor(duration / frameRate);
    const textLength = text.length;

    const scrambleTimer = setTimeout(() => {
      const interval = setInterval(() => {
        if (!isRunning) return;

        frame++;
        const progress = frame / totalFrames;

        let scrambled = '';
        for (let i = 0; i < textLength; i++) {
          if (text[i] === ' ') {
            scrambled += ' ';
            continue;
          }

          const revealThreshold = progress * textLength;
          if (i < revealThreshold) {
            scrambled += text[i];
          } else {
            scrambled += chars[Math.floor(Math.random() * chars.length)];
          }
        }

        setDisplayText(scrambled);

        if (frame >= totalFrames) {
          setDisplayText(text);
          clearInterval(interval);
        }
      }, frameRate);

      return () => {
        isRunning = false;
        clearInterval(interval);
      };
    }, delay);

    return () => clearTimeout(scrambleTimer);
  }, [text, delay, duration, trigger]);

  return <span className={className}>{displayText}</span>;
}
