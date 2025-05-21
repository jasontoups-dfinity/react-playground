import React from 'react';

interface ContentContainerProps {
  children: React.ReactNode;
}

const ContentContainer: React.FC<ContentContainerProps> = ({ children }) => {
  return <div className="content-container max-w-7xl rounded-lg text-center p-6">{children}</div>;
};

export default ContentContainer;
