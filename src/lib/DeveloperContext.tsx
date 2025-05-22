import React, { createContext, useContext, useState } from 'react';

// Types for our context
export type DeveloperPanelPosition = 'right' | 'bottom' | 'left';
export type DeveloperPanelType = 'state' | 'store' | 'performance' | 'network';

interface DeveloperContextState {
  isEnabled: boolean;
  activePanel: DeveloperPanelType | null;
  isPanelOpen: boolean;
  position: DeveloperPanelPosition;
  enabledTools: {
    stateInspector: boolean;
    storeInspector: boolean;
    performanceMonitor: boolean;
    networkMonitor: boolean;
  };
  stores: Record<string, unknown>;
}

interface DeveloperContextValue extends DeveloperContextState {
  setActivePanel: (panel: DeveloperPanelType | null) => void;
  togglePanel: () => void;
  setPosition: (position: DeveloperPanelPosition) => void;
  setEnabledTools: (tools: Partial<DeveloperContextState['enabledTools']>) => void;
  registerStore: (name: string, store: unknown) => void;
  unregisterStore: (name: string) => void;
}

// Create the context with a default undefined value
const DeveloperContext = createContext<DeveloperContextValue | undefined>(undefined);

export interface DeveloperProviderProps {
  children: React.ReactNode;
  initialStores?: Record<string, unknown>;
  initialPosition?: DeveloperPanelPosition;
  initialEnabledTools?: Partial<DeveloperContextState['enabledTools']>;
}

export const DeveloperProvider: React.FC<DeveloperProviderProps> = ({
  children,
  initialStores = {},
  initialPosition = 'right',
  initialEnabledTools = {
    stateInspector: true,
    storeInspector: true,
    performanceMonitor: true,
    networkMonitor: true,
  },
}) => {
  // Check if developer tools are enabled via environment variable
  const isDeveloperModeEnabled = import.meta.env.USE_DEVELOPER_TOOLS === 'true';

  // State for the developer tools
  const [state, setState] = useState<DeveloperContextState>({
    isEnabled: isDeveloperModeEnabled,
    activePanel: null,
    isPanelOpen: false,
    position: initialPosition,
    enabledTools: {
      stateInspector: initialEnabledTools.stateInspector ?? true,
      storeInspector: initialEnabledTools.storeInspector ?? true,
      performanceMonitor: initialEnabledTools.performanceMonitor ?? true,
      networkMonitor: initialEnabledTools.networkMonitor ?? true,
    },
    stores: initialStores,
  });

  // Function to set the active panel
  const setActivePanel = (panel: DeveloperPanelType | null) => {
    setState((prev) => ({
      ...prev,
      activePanel: panel,
      isPanelOpen: panel !== null,
    }));
  };

  // Function to toggle the panel open/closed
  const togglePanel = () => {
    setState((prev) => ({
      ...prev,
      isPanelOpen: !prev.isPanelOpen,
    }));
  };

  // Function to set the panel position
  const setPosition = (position: DeveloperPanelPosition) => {
    setState((prev) => ({
      ...prev,
      position,
    }));
  };

  // Function to set which tools are enabled
  const setEnabledTools = (tools: Partial<DeveloperContextState['enabledTools']>) => {
    setState((prev) => ({
      ...prev,
      enabledTools: {
        ...prev.enabledTools,
        ...tools,
      },
    }));
  };

  // Function to register a store
  const registerStore = (name: string, store: unknown) => {
    setState((prev) => ({
      ...prev,
      stores: {
        ...prev.stores,
        [name]: store,
      },
    }));
  };

  // Function to unregister a store
  const unregisterStore = (name: string) => {
    setState((prev) => {
      const newStores = { ...prev.stores };
      delete newStores[name];
      return {
        ...prev,
        stores: newStores,
      };
    });
  };

  // Create the context value
  const contextValue: DeveloperContextValue = {
    ...state,
    setActivePanel,
    togglePanel,
    setPosition,
    setEnabledTools,
    registerStore,
    unregisterStore,
  };

  return <DeveloperContext.Provider value={contextValue}>{children}</DeveloperContext.Provider>;
};

// Hook to use the developer context
export const useDeveloper = (): DeveloperContextValue => {
  const context = useContext(DeveloperContext);
  if (context === undefined) {
    throw new Error('useDeveloper must be used within a DeveloperProvider');
  }
  return context;
};
