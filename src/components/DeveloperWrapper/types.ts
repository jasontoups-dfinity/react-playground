import type { ReactNode } from 'react';
import type { DeveloperPanelPosition } from '../../lib/DeveloperContext';

export interface DeveloperWrapperProps {
  children: ReactNode;
  appName?: string;
  logo?: string | ReactNode;
  showLayoutControls?: boolean;
  showThemeToggle?: boolean;
  enabledTools?: {
    stateInspector?: boolean;
    storeInspector?: boolean;
    performanceMonitor?: boolean;
    networkMonitor?: boolean;
  };
  stores?: Record<string, unknown>;
  defaultPosition?: DeveloperPanelPosition;
  headerClassName?: string;
  panelClassName?: string;
}

export interface DeveloperHeaderProps {
  appName: string;
  logo?: string | ReactNode;
  showLayoutControls: boolean;
  showThemeToggle: boolean;
  className?: string;
}

export interface DeveloperPanelProps {
  isOpen: boolean;
  onClose: () => void;
  position: DeveloperPanelPosition;
  className?: string;
  children: ReactNode;
}

export interface StateInspectorProps {
  className?: string;
}

export interface StoreInspectorProps {
  stores: Record<string, unknown>;
  className?: string;
}

export interface PerformanceMonitorProps {
  className?: string;
}

export interface NetworkMonitorProps {
  className?: string;
}

export interface ComponentStateInfo {
  id: string;
  name: string;
  state: Record<string, unknown>;
  props: Record<string, unknown>;
  parent: string | null;
  children: string[];
}
