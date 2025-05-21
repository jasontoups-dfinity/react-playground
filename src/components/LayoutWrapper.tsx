import React from 'react';
import { usePageWidth } from '../lib/PageWidthContext';
import type { PageWidthPreset } from '../lib/PageWidthContext';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const { widthPreset } = usePageWidth();

  // Map width presets to actual CSS width values and classes
  const widthClasses: Record<PageWidthPreset, string> = {
    'full-width': 'w-full',
    desktop: 'max-w-6xl', // ~1152px
    tablet: 'max-w-md', // ~768px
    mobile: 'max-w-sm', // ~384px
  };

  // Display names for the width presets
  const presetLabels: Record<PageWidthPreset, string> = {
    'full-width': 'Full Width',
    desktop: 'Desktop (1152px)',
    tablet: 'Tablet (768px)',
    mobile: 'Mobile (384px)',
  };

  return (
    <main className="outer-container flex flex-col items-center justify-center w-full h-full bg-muted/20">
      <div
        className={`resizable-container flex flex-col items-center justify-center h-full ${widthClasses[widthPreset]} mx-auto transition-all duration-300 relative bg-background`}
        style={{
          boxShadow: widthPreset !== 'full-width' ? '0 0 0 2px var(--border)' : undefined,
        }}>
        {widthPreset !== 'full-width' && (
          <div className="absolute top-0 right-0 bg-muted text-muted-foreground text-xs px-2 py-1 rounded-bl">
            {presetLabels[widthPreset]}
          </div>
        )}
        {children}
      </div>
    </main>
  );
};

export default LayoutWrapper;
