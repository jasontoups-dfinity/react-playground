import React from 'react';
import { Link } from 'react-router-dom';
import type { DeveloperHeaderProps } from './types';
import { cn } from '../../lib/utils';
import { useDeveloper } from '../../lib/DeveloperContext';
import ThemeToggle from '../ThemeToggle';
import PageWidthSelector from '../PageWidthSelector';
import type { DeveloperPanelType } from '../../lib/DeveloperContext';

const DeveloperHeader: React.FC<DeveloperHeaderProps> = ({
  appName,
  logo,
  showLayoutControls,
  showThemeToggle,
  className,
}) => {
  const { isEnabled, activePanel, setActivePanel } = useDeveloper();

  // If developer tools are disabled, render a simplified header
  if (!isEnabled) {
    return (
      <header className={cn('w-full flex flex-row justify-between items-center p-5', className)}>
        <Link
          to="/"
          className="no-underline text-inherit cursor-pointer transition-opacity duration-200 ease-in-out hover:opacity-80 flex flex-row items-center">
          {typeof logo === 'string' ? (
            <img src={logo} alt={`${appName} Logo`} className="mr-1" />
          ) : (
            logo
          )}
          <span className="font-bold text-base leading-tight flex flex-col justify-center">
            {appName.toUpperCase()}
          </span>
        </Link>
        <div className="flex items-center">
          {showLayoutControls && <PageWidthSelector />}
          {showThemeToggle && <ThemeToggle />}
        </div>
      </header>
    );
  }

  // Tool buttons for the developer header
  const toolButtons: { type: DeveloperPanelType; label: string; icon: React.ReactNode }[] = [
    {
      type: 'state',
      label: 'State',
      icon: (
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
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.29 7 12 12 20.71 7" />
          <line x1="12" y1="22" x2="12" y2="12" />
        </svg>
      ),
    },
    {
      type: 'store',
      label: 'Store',
      icon: (
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
          <path d="M2 22V12c0-5.5 4.5-10 10-10s10 4.5 10 10v10" />
          <path d="M2 15h20" />
        </svg>
      ),
    },
    {
      type: 'performance',
      label: 'Performance',
      icon: (
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
          <path d="M12 2v4" />
          <path d="m16.24 6.76 2.83-2.83" />
          <path d="M22 12h-4" />
          <path d="m17.24 17.24 2.83 2.83" />
          <path d="M12 18v4" />
          <path d="M6.77 17.24 3.93 20.07" />
          <path d="M2 12h4" />
          <path d="M6.77 6.77 3.93 3.93" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
    {
      type: 'network',
      label: 'Network',
      icon: (
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
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      ),
    },
  ];

  return (
    <header className={cn('w-full flex flex-row justify-between items-center p-5', className)}>
      <Link
        to="/"
        className="no-underline text-inherit cursor-pointer transition-opacity duration-200 ease-in-out hover:opacity-80 flex flex-row items-center">
        {typeof logo === 'string' ? (
          <img src={logo} alt={`${appName} Logo`} className="mr-1" />
        ) : (
          logo
        )}
        <span className="font-bold text-base leading-tight flex flex-col justify-center">
          {appName.toUpperCase()}
        </span>
      </Link>
      <div className="flex items-center">
        <div className="flex items-center mr-4 space-x-1 bg-muted/20 rounded-md p-1">
          {toolButtons.map((tool) => (
            <button
              key={tool.type}
              onClick={() => setActivePanel(activePanel === tool.type ? null : tool.type)}
              className={cn(
                'flex items-center px-2 py-1 text-xs rounded-sm transition-colors',
                activePanel === tool.type ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
              )}
              aria-label={`Toggle ${tool.label} panel`}
              aria-pressed={activePanel === tool.type}>
              <span className="mr-1">{tool.icon}</span>
              <span>{tool.label}</span>
            </button>
          ))}
        </div>
        {showLayoutControls && <PageWidthSelector />}
        {showThemeToggle && <ThemeToggle />}
      </div>
    </header>
  );
};

export default DeveloperHeader;
