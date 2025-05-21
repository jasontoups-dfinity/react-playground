import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the available width presets
export type PageWidthPreset = 'full-width' | 'desktop' | 'tablet' | 'mobile';

interface PageWidthContextType {
  widthPreset: PageWidthPreset;
  setWidthPreset: (preset: PageWidthPreset) => void;
}

const PageWidthContext = createContext<PageWidthContextType>({
  widthPreset: 'full-width',
  setWidthPreset: () => {},
});

export const PageWidthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize from localStorage or default to 'full-width'
  const [widthPreset, setWidthPreset] = useState<PageWidthPreset>(() => {
    const saved = localStorage.getItem('pageWidthPreset');
    return (saved as PageWidthPreset) || 'full-width';
  });

  // Save to localStorage when changed
  useEffect(() => {
    localStorage.setItem('pageWidthPreset', widthPreset);
  }, [widthPreset]);

  return (
    <PageWidthContext.Provider value={{ widthPreset, setWidthPreset }}>
      {children}
    </PageWidthContext.Provider>
  );
};

export const usePageWidth = () => useContext(PageWidthContext);
