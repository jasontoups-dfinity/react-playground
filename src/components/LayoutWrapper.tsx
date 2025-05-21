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

  return (
    <main className="outer-container flex flex-col items-center justify-center w-full h-full bg-background/50">
      <div
        className={`resizable-container flex flex-col items-center justify-center h-full ${widthClasses[widthPreset]} mx-auto transition-all duration-300 bg-background`}
        style={{
          boxShadow: widthPreset !== 'full-width' ? '0 0 0 1px rgba(0,0,0,0.05)' : undefined,
        }}>
        {children}
      </div>
    </main>
  );
};

export default LayoutWrapper;
