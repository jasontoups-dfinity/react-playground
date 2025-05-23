import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { anthropicClient } from './api';
import type { ApiProviderType, AnthropicRequest } from './api';

// Types for our context
export type AIDisplayMode = 'pageOverlay' | 'componentOverlay' | 'tray' | 'sidebar';

export interface AIConfig {
  displayMode: AIDisplayMode;
  prompt: string;
  llmConfig: {
    provider: ApiProviderType;
    model: string;
    endpoint?: string;
    apiKey?: string;
    temperature?: number;
    maxTokens?: number;
  };
}

interface AIContextState {
  isOpen: boolean;
  status: 'idle' | 'loading' | 'success' | 'error';
  response: string | null;
  error: Error | null;
  config: AIConfig;
  activeInstanceId: string | null;
}

interface AIContextValue extends AIContextState {
  toggle: (instanceId: string) => void;
  processData: (
    data: Record<string, unknown> | unknown[] | string | number | boolean,
    instanceId: string
  ) => Promise<void>;
  reset: () => void;
  setConfig: (config: Partial<AIConfig>) => void;
  setActiveInstance: (instanceId: string) => void;
}

// Create the context with a default undefined value
const AIContext = createContext<AIContextValue | undefined>(undefined);

export interface AIProviderProps {
  children: ReactNode;
  initialConfig?: Partial<AIConfig>;
}

export const AIProvider: React.FC<AIProviderProps> = ({ children, initialConfig = {} }) => {
  // Create the default configuration with proper merging of nested objects
  const createDefaultConfig = (): AIConfig => {
    const baseConfig: AIConfig = {
      displayMode: 'pageOverlay',
      prompt: 'Analyze this data: {data}',
      llmConfig: {
        provider: 'anthropic', // Use Anthropic provider with our proxy server
        model: 'claude-3-haiku-20240307',
        temperature: 0.7,
        maxTokens: 1000,
      },
    };

    // If no initialConfig, return the base config
    if (Object.keys(initialConfig).length === 0) {
      return baseConfig;
    }

    // Create a new config with the merged values
    return {
      ...baseConfig,
      ...initialConfig,
      // Properly merge the nested llmConfig object if it exists
      llmConfig: initialConfig.llmConfig
        ? { ...baseConfig.llmConfig, ...initialConfig.llmConfig }
        : baseConfig.llmConfig,
    };
  };

  // Default configuration
  const defaultConfig = createDefaultConfig();

  // State for the AI context
  const [state, setState] = useState<AIContextState>({
    isOpen: false,
    status: 'idle',
    response: null,
    error: null,
    config: defaultConfig,
    activeInstanceId: null,
  });

  // Function to set the active instance
  const setActiveInstance = (instanceId: string) => {
    setState((prev) => ({
      ...prev,
      activeInstanceId: instanceId,
    }));
  };

  // Function to toggle the AI panel
  const toggle = (instanceId: string) => {
    setState((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
      activeInstanceId: prev.isOpen ? null : instanceId, // Clear active instance when closing
    }));
  };

  // Function to process data with the LLM
  const processData = async (
    data: Record<string, unknown> | unknown[] | string | number | boolean,
    instanceId: string
  ) => {
    console.log('AIContext: processData called', { instanceId, data });

    setState((prev) => ({
      ...prev,
      status: 'loading',
      isOpen: true,
      activeInstanceId: instanceId,
    }));
    console.log('AIContext: state updated to loading');

    try {
      // Create the request
      const request: AnthropicRequest = {
        prompt: state.config.prompt,
        data,
        model: state.config.llmConfig.model,
        temperature: state.config.llmConfig.temperature,
        maxTokens: state.config.llmConfig.maxTokens,
      };
      console.log('AIContext: request created', request);

      // Send the request to the provider
      console.log('AIContext: sending request to Anthropic provider');
      const response = await anthropicClient.sendMessage(request);
      console.log('AIContext: received response', response);

      setState((prev) => ({
        ...prev,
        status: 'success',
        response: response.text,
      }));
      console.log('AIContext: state updated to success');
    } catch (error) {
      console.error('AIContext: error processing data', error);
      setState((prev) => ({
        ...prev,
        status: 'error',
        error: error instanceof Error ? error : new Error('Unknown error'),
      }));
      console.log('AIContext: state updated to error');
    }
  };

  // Function to reset the AI state
  const reset = () => {
    setState((prev) => ({
      ...prev,
      status: 'idle',
      response: null,
      error: null,
    }));
  };

  // Function to update the configuration
  const setConfig = (config: Partial<AIConfig>) => {
    setState((prev) => ({
      ...prev,
      config: {
        ...prev.config,
        ...config,
      },
    }));
  };

  // Create the context value
  const contextValue: AIContextValue = {
    ...state,
    toggle,
    processData,
    reset,
    setConfig,
    setActiveInstance,
  };

  return <AIContext.Provider value={contextValue}>{children}</AIContext.Provider>;
};

// Hook to use the AI context
export const useAI = (): AIContextValue => {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};
