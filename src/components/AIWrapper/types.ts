import type { ReactNode } from 'react';
import type { AIDisplayMode } from '../../lib/AIContext';

export interface AIWrapperProps {
  /**
   * The child component to wrap with AI capabilities
   */
  children: ReactNode;

  /**
   * The display mode for the AI response
   * @default 'overlay'
   */
  displayMode?: AIDisplayMode;

  /**
   * The prompt template to use for the LLM
   * Use {data} as a placeholder for the extracted data
   * @default 'Analyze this data: {data}'
   */
  prompt?: string;

  /**
   * Function to extract and transform data from the child component
   * This function will be called with the data extracted from the child component
   * and should return the data to be sent to the LLM
   */
  dataSelector?: (
    data: Record<string, unknown>
  ) => Record<string, unknown> | unknown[] | string | number | boolean;

  /**
   * Configuration for the LLM API
   */
  apiConfig?: {
    endpoint?: string;
    apiKey?: string;
    model: string;
    provider?: 'anthropic' | 'openai' | 'simulation';
    temperature?: number;
    maxTokens?: number;
  };

  /**
   * Position of the AI button
   * @default 'top-right'
   */
  buttonPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

  /**
   * Speed of the typewriter effect in milliseconds per character
   * @default 30
   */
  typingSpeed?: number;

  /**
   * Additional class name for the wrapper
   */
  className?: string;
}

export interface AITriggerButtonProps {
  /**
   * Position of the button
   */
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

  /**
   * Function to call when the button is clicked
   */
  onClick: () => void;

  /**
   * Whether the button is in loading state
   */
  isLoading: boolean;

  /**
   * Additional class name for the button
   */
  className?: string;
}

export interface AIResponseSkeletonProps {
  /**
   * Number of lines to show in the skeleton
   * @default 3
   */
  lines?: number;

  /**
   * Whether to animate the skeleton
   * @default true
   */
  animated?: boolean;

  /**
   * Additional class name for the skeleton
   */
  className?: string;
}

export interface TypewriterTextProps {
  /**
   * Text to display with typewriter effect
   */
  text: string;

  /**
   * Speed of the typewriter effect in milliseconds per character
   * @default 30
   */
  speed?: number;

  /**
   * Whether to show a blinking cursor
   * @default true
   */
  cursor?: boolean;

  /**
   * Additional class name for the text
   */
  className?: string;
}

export interface AIResponseDisplayProps {
  /**
   * Display mode for the response
   */
  mode: AIDisplayMode;

  /**
   * Status of the AI request
   */
  status: 'idle' | 'loading' | 'success' | 'error';

  /**
   * Response text from the LLM
   */
  response: string | null;

  /**
   * Speed of the typewriter effect in milliseconds per character
   * @default 30
   */
  typingSpeed?: number;

  /**
   * Function to call when the close button is clicked
   */
  onClose: () => void;

  /**
   * Additional class name for the display
   */
  className?: string;
}
