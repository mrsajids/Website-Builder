import React, { useState, useEffect, useRef } from "react";

// Simple AnimateDiv Component
function AnimateDiv({ animationClass, children }) {
  const [inView, setInView] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      {
        // threshold: 0.5, // Trigger when 10% of the element is visible
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    if (boxRef.current) {
      observer.observe(boxRef.current);
    }

    return () => observer.disconnect(); // Cleanup observer
  }, []);

  return (
    <div ref={boxRef} className={`box ${inView ? animationClass : ""}`}>
      {children}
    </div>
  );
}
export default AnimateDiv;
