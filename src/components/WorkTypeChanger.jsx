import React, { useEffect, useRef, useState } from 'react';
import "../assets/css/layout.css";

export default function WordAnimator({ words, typingSpeed = 100, pauseTime = 1500, repeatCount = 3 }) {
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState('typing');
  const [done, setDone] = useState(false);

  const wordIndex = useRef(0);
  const charIndex = useRef(0);
  const lastTimeRef = useRef(0);
  const pauseStartRef = useRef(null);
  const animationFrameId = useRef(null);
  const cyclesCompleted = useRef(0); // Track how many times all words were cycled

  const step = (timestamp) => {
    if (done) return;

    const currentWord = words[wordIndex.current];

    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const elapsed = timestamp - lastTimeRef.current;

    if (phase === 'typing' && elapsed >= typingSpeed) {
      if (charIndex.current < currentWord.length) {
        charIndex.current++;
        setDisplayed(currentWord.slice(0, charIndex.current));
        lastTimeRef.current = timestamp;
      } else {
        setPhase('pausing');
        pauseStartRef.current = timestamp;
      }
    }

    if (phase === 'deleting' && elapsed >= typingSpeed / 2) {
      if (charIndex.current > 0) {
        charIndex.current--;
        setDisplayed(currentWord.slice(0, charIndex.current));
        lastTimeRef.current = timestamp;
      } else {
        wordIndex.current = (wordIndex.current + 1) % words.length;
        if (wordIndex.current === 0) {
          cyclesCompleted.current++;
          if (cyclesCompleted.current >= repeatCount) {
            setDone(true);
            setDisplayed("Welcome"); // <- Replace this with your final static text
            return;
          }
        }
        setPhase('typing');
      }
    }

    if (phase === 'pausing' && timestamp - pauseStartRef.current >= pauseTime) {
      setPhase('deleting');
      lastTimeRef.current = timestamp;
    }

    animationFrameId.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    if (!done) {
      animationFrameId.current = requestAnimationFrame(step);
    }

    return () => cancelAnimationFrame(animationFrameId.current);
  }, [phase, done]);

  return (
    <div className="word-box">
      <span className={`word ${phase}`}>{displayed}</span>
      {!done && <span className="cursor" />}
    </div>
  );
}
