import React from 'react';
import { X } from 'phosphor-react';
import { cn } from '../../lib/utils';
import TypewriterText from './TypewriterText';
import AIResponseSkeleton from './AIResponseSkeleton';
import type { AIResponseDisplayProps } from './types';

const AIResponseDisplay: React.FC<AIResponseDisplayProps> = ({
  mode,
  status,
  response,
  typingSpeed = 30,
  onClose,
  className,
}) => {
  // Determine the container classes based on the display mode
  const containerClasses = {
    pageOverlay: 'fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50',
    componentOverlay:
      'absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10',
    tray: 'absolute bottom-0 left-0 right-0 bg-card shadow-lg rounded-t-lg z-40',
    sidebar: 'absolute top-0 bottom-0 right-0 w-80 bg-card shadow-lg z-40',
  };

  // Determine the content classes based on the display mode
  const contentClasses = {
    pageOverlay: 'bg-card p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-auto',
    componentOverlay: 'bg-card p-6 rounded-lg shadow-lg w-[90%] max-h-[90%] overflow-auto',
    tray: 'p-4 max-h-[50vh] overflow-auto',
    sidebar: 'p-4 h-full overflow-auto',
  };

  // Animation classes for each mode
  const animationClasses = {
    pageOverlay: 'animate-fade-in',
    componentOverlay: 'animate-fade-in',
    tray: 'animate-slide-up',
    sidebar: 'animate-slide-in-right',
  };

  return (
    <div className={cn(containerClasses[mode], animationClasses[mode], className)}>
      <div className={cn(contentClasses[mode], 'relative')}>
        {/* Close button */}
        <button
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted transition-colors"
          onClick={onClose}
          aria-label="Close">
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-4">
          <h3 className="text-lg font-medium">AI Analysis</h3>
          <div className="h-px bg-border my-2" />
        </div>

        {/* Content */}
        <div className="mt-4">
          {status === 'loading' && <AIResponseSkeleton lines={5} />}

          {status === 'success' && response && (
            <TypewriterText text={response} speed={typingSpeed} />
          )}

          {status === 'error' && (
            <div className="text-destructive">
              An error occurred while processing your request. Please try again.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIResponseDisplay;
