import React, { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import type { TypewriterTextProps } from './types';

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 30,
  cursor = true,
  className,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Reset state when text changes
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (!text || currentIndex >= text.length) return;

    const timer = setTimeout(() => {
      setDisplayedText((prev) => prev + text[currentIndex]);
      setCurrentIndex((prev) => prev + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [text, currentIndex, speed]);

  // Process text to handle newlines and special formatting
  const processedText = displayedText.split('\n').map((line, i, arr) => (
    <React.Fragment key={i}>
      {line}
      {i < arr.length - 1 && <br />}
    </React.Fragment>
  ));

  return (
    <div className={cn('typewriter-text font-mono', className)}>
      {processedText}
      {cursor && currentIndex < (text?.length || 0) && (
        <span className="cursor inline-block w-2 h-4 bg-primary ml-0.5 animate-blink" />
      )}
    </div>
  );
};

export default TypewriterText;
