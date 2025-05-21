import React, { useEffect } from 'react';
import { usePageTitle } from '../lib/TitleContext';

const ComponentWrapper: React.FC = () => {
  const { setPageTitle } = usePageTitle();

  useEffect(() => {
    setPageTitle('Component Wrapper');
  }, [setPageTitle]);
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Component Wrapper</h1>
      <p className="mb-4">
        This page demonstrates a component wrapper pattern that allows for flexible component
        composition.
      </p>
      <div className="bg-card p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Example Component</h2>
        <p>Content will be added here as we develop this pattern.</p>
      </div>
    </div>
  );
};

export default ComponentWrapper;
