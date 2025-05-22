import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { DeveloperPanelProps } from './types';
import { cn } from '../../lib/utils';

// Default sizes for different positions
const defaultSizes = {
  right: 320, // 20rem (w-80)
  left: 320,
  bottom: 256, // 16rem (h-64)
};

const DeveloperPanel: React.FC<DeveloperPanelProps> = ({
  isOpen,
  onClose,
  position,
  className,
  children,
}) => {
  // State for panel size
  const [size, setSize] = useState(defaultSizes[position]);
  const [isResizing, setIsResizing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const startPosRef = useRef(0);
  const startSizeRef = useRef(0);

  // Handle mouse move during resize
  const handleResize = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) return;

      let newSize;
      if (position === 'bottom') {
        // For bottom panel, resize vertically (invert direction)
        newSize = startSizeRef.current + (startPosRef.current - e.clientY);
      } else if (position === 'right') {
        // For right panel, resize horizontally (invert direction)
        newSize = startSizeRef.current + (startPosRef.current - e.clientX);
      } else {
        // For left panel, resize horizontally
        newSize = startSizeRef.current + (e.clientX - startPosRef.current);
      }

      // Set minimum and maximum sizes
      newSize = Math.max(newSize, 200); // Minimum size
      newSize = Math.min(newSize, position === 'bottom' ? 600 : 800); // Maximum size

      setSize(newSize);
    },
    [isResizing, position]
  );

  // Handle mouse up to end resize
  const handleResizeEnd = useCallback(() => {
    setIsResizing(false);
    document.removeEventListener('mousemove', handleResize);
    document.removeEventListener('mouseup', handleResizeEnd);
  }, [handleResize]);

  // Handle mouse down on resize handle
  const handleResizeStart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsResizing(true);

      // Store starting position and size
      if (position === 'bottom') {
        startPosRef.current = e.clientY;
      } else {
        startPosRef.current = e.clientX;
      }
      startSizeRef.current = size;

      // Add event listeners for resize
      document.addEventListener('mousemove', handleResize);
      document.addEventListener('mouseup', handleResizeEnd);
    },
    [position, size, handleResize, handleResizeEnd]
  );

  // Clean up event listeners on unmount or when dependencies change
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', handleResizeEnd);
    };
  }, [handleResize, handleResizeEnd]);

  // Early return if panel is not open
  if (!isOpen) return null;

  // Calculate styles based on position and size
  const getPositionStyles = () => {
    if (position === 'right') {
      return {
        right: 0,
        top: 0,
        height: '100%',
        width: `${size}px`,
      };
    } else if (position === 'left') {
      return {
        left: 0,
        top: 0,
        height: '100%',
        width: `${size}px`,
      };
    } else {
      // bottom
      return {
        bottom: 0,
        left: 0,
        right: 0,
        height: `${size}px`,
      };
    }
  };

  // Get resize handle position and styles
  const getResizeHandleStyles = () => {
    if (position === 'right') {
      return 'left-0 top-1/2 -translate-y-1/2 w-3 h-32 cursor-ew-resize';
    } else if (position === 'left') {
      return 'right-0 top-1/2 -translate-y-1/2 w-3 h-32 cursor-ew-resize';
    } else {
      // bottom
      return 'top-0 left-1/2 -translate-x-1/2 h-3 w-32 cursor-ns-resize';
    }
  };

  return (
    <div
      ref={panelRef}
      style={getPositionStyles()}
      className={cn(
        'fixed z-50 bg-background border-border shadow-lg transition-colors duration-300 ease-in-out',
        position === 'right' && 'border-l',
        position === 'left' && 'border-r',
        position === 'bottom' && 'border-t',
        isResizing && 'transition-none',
        className
      )}>
      {/* Resize handle */}
      <div
        className={cn(
          'absolute bg-muted/10 hover:bg-primary/10 z-10 rounded-full transition-colors duration-150',
          isResizing && 'bg-primary/20',
          getResizeHandleStyles()
        )}
        onMouseDown={handleResizeStart}>
        {/* Visual indicator for the resize handle */}
        <div className="absolute inset-0 flex items-center justify-center">
          {position === 'bottom' ? (
            <div className="flex flex-col items-center space-y-1">
              <div
                className={cn(
                  'w-6 h-1.5 rounded-full transition-colors duration-150',
                  isResizing ? 'bg-primary/60' : 'bg-muted-foreground/40'
                )}
              />
              <div
                className={cn(
                  'w-4 h-1 rounded-full transition-colors duration-150',
                  isResizing ? 'bg-primary/50' : 'bg-muted-foreground/30'
                )}
              />
            </div>
          ) : (
            <div className="flex flex-row items-center space-x-1">
              <div
                className={cn(
                  'h-16 w-1 rounded-full transition-colors duration-150',
                  isResizing ? 'bg-primary/60' : 'bg-muted-foreground/40'
                )}
              />
              <div
                className={cn(
                  'h-10 w-1 rounded-full transition-colors duration-150',
                  isResizing ? 'bg-primary/50' : 'bg-muted-foreground/30'
                )}
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-2 border-b border-border bg-muted/20">
          <h3 className="text-sm font-medium">Developer Tools</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-sm"
            aria-label="Close panel">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-auto p-4">{children}</div>
      </div>
    </div>
  );
};

export default DeveloperPanel;
