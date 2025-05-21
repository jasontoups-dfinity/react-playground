import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-secondary py-4">
      <div className="max-w-7xl mx-auto text-center text-muted-foreground text-sm">
        <p>© {new Date().getFullYear()} DFINITY. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
