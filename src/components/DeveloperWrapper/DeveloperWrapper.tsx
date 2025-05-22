import React from 'react';
import type { DeveloperWrapperProps } from './types';
import { useDeveloper } from '../../lib/DeveloperContext';
import DeveloperHeader from './DeveloperHeader';
import DeveloperPanel from './DeveloperPanel';
import StateInspector from './StateInspector';
import StoreInspector from './StoreInspector';
import PerformanceMonitor from './PerformanceMonitor';
import NetworkMonitor from './NetworkMonitor';
import dfinityLogo from '../../assets/dfinity-logo.svg';

const DeveloperWrapper: React.FC<DeveloperWrapperProps> = ({
  children,
  appName = 'React App',
  logo = dfinityLogo,
  showLayoutControls = true,
  showThemeToggle = true,
  enabledTools = {
    stateInspector: true,
    storeInspector: true,
    performanceMonitor: true,
    networkMonitor: true,
  },
  stores = {},
  defaultPosition = 'right',
  headerClassName,
  panelClassName,
}) => {
  const {
    isEnabled,
    activePanel,
    isPanelOpen,
    position,
    setActivePanel,
    setPosition,
    setEnabledTools,
  } = useDeveloper();

  // Set initial values
  React.useEffect(() => {
    if (defaultPosition) {
      setPosition(defaultPosition);
    }
    if (enabledTools) {
      setEnabledTools(enabledTools);
    }
  }, [defaultPosition, enabledTools, setPosition, setEnabledTools]);

  // Render the appropriate panel content based on the active panel
  const renderPanelContent = () => {
    switch (activePanel) {
      case 'state':
        return <StateInspector />;
      case 'store':
        return <StoreInspector stores={stores} />;
      case 'performance':
        return <PerformanceMonitor />;
      case 'network':
        return <NetworkMonitor />;
      default:
        return null;
    }
  };

  return (
    <div className="developer-wrapper flex flex-col min-h-screen">
      <DeveloperHeader
        appName={appName}
        logo={logo}
        showLayoutControls={showLayoutControls}
        showThemeToggle={showThemeToggle}
        className={headerClassName}
      />
      <div className="flex-1 relative">
        {children}
        {isEnabled && isPanelOpen && activePanel && (
          <DeveloperPanel
            isOpen={isPanelOpen}
            onClose={() => setActivePanel(null)}
            position={position}
            className={panelClassName}>
            {renderPanelContent()}
          </DeveloperPanel>
        )}
      </div>
    </div>
  );
};

export default DeveloperWrapper;
