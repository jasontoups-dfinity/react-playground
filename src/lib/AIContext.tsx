import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Types for our context
export type AIDisplayMode = 'pageOverlay' | 'componentOverlay' | 'tray' | 'sidebar';

export interface LLMRequest {
  prompt: string;
  data: Record<string, unknown> | unknown[] | string | number | boolean;
  model: string;
}

export interface LLMResponse {
  text: string;
  tokens: number;
  model: string;
}

export interface AIConfig {
  displayMode: AIDisplayMode;
  prompt: string;
  apiConfig: {
    endpoint: string;
    apiKey: string;
    model: string;
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
  // Default configuration
  const defaultConfig: AIConfig = {
    displayMode: 'pageOverlay',
    prompt: 'Analyze this data: {data}',
    apiConfig: {
      endpoint: 'https://api.openai.com/v1/chat/completions',
      apiKey: '',
      model: 'gpt-4',
    },
    ...initialConfig,
  };

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
    setState((prev) => ({
      ...prev,
      status: 'loading',
      isOpen: true,
      activeInstanceId: instanceId,
    }));

    try {
      // Replace placeholders in the prompt
      const filledPrompt = state.config.prompt.replace('{data}', JSON.stringify(data));

      // Create the request
      const request: LLMRequest = {
        prompt: filledPrompt,
        data,
        model: state.config.apiConfig.model,
      };

      // This would be replaced with an actual API call
      // For now, we'll simulate a response
      const response = await simulateLLMResponse(request);

      setState((prev) => ({
        ...prev,
        status: 'success',
        response: response.text,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        status: 'error',
        error: error instanceof Error ? error : new Error('Unknown error'),
      }));
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

// Temporary function to simulate an LLM response
// This would be replaced with an actual API call in production
const simulateLLMResponse = async (request: LLMRequest): Promise<LLMResponse> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Generate a response based on the data
  const data = request.data;
  let responseText = '';

  if (typeof data === 'object') {
    responseText = `Here's an analysis of the provided data:\n\n`;

    // If it's an array, summarize the items
    if (Array.isArray(data)) {
      responseText += `The data contains ${data.length} items.\n\n`;

      // Sample a few items
      const sampleSize = Math.min(3, data.length);
      responseText += `Sample items:\n`;
      for (let i = 0; i < sampleSize; i++) {
        responseText += `- ${JSON.stringify(data[i])}\n`;
      }
    }
    // If it's an object, summarize the keys and values
    else {
      const keys = Object.keys(data);
      responseText += `The data contains ${keys.length} properties.\n\n`;

      responseText += `Properties:\n`;
      keys.forEach((key) => {
        responseText += `- ${key}: ${JSON.stringify(data[key])}\n`;
      });
    }

    responseText += `\nBased on this data, I can provide further insights if needed.`;
  } else {
    responseText = `I've analyzed the data: "${data}". This appears to be a simple value. Please provide more context if you'd like a more detailed analysis.`;
  }

  return {
    text: responseText,
    tokens: responseText.length / 4, // Rough estimate of tokens
    model: request.model,
  };
};
