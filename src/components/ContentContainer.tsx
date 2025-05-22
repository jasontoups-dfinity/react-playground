import React from 'react';

interface ContentContainerProps {
  children: React.ReactNode;
}

const ContentContainer: React.FC<ContentContainerProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-background">
      <div className="content-container flex-col justify-center align-center max-w-7xl rounded-lg text-center p-6">
        {children}
      </div>
    </div>
  );
};

export default ContentContainer;
