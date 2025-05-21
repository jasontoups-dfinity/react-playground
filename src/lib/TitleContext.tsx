import React, { createContext, useContext, useState, useEffect } from 'react';

type TitleContextType = {
  setPageTitle: (title: string) => void;
  pageTitle: string;
};

const TitleContext = createContext<TitleContextType>({
  setPageTitle: () => {},
  pageTitle: '',
});

export const TitleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pageTitle, setPageTitle] = useState('');
  const baseTitle = 'React Playground | DFINITY';

  useEffect(() => {
    // Special case for homepage
    if (pageTitle === 'Home') {
      document.title = baseTitle;
    }
    // For other pages, use the route name as prefix
    else if (pageTitle) {
      document.title = `${pageTitle} | ${baseTitle}`;
    }
    // Default fallback
    else {
      document.title = baseTitle;
    }
  }, [pageTitle, baseTitle]);

  return (
    <TitleContext.Provider value={{ pageTitle, setPageTitle }}>{children}</TitleContext.Provider>
  );
};

export const usePageTitle = () => useContext(TitleContext);
