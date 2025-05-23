/**
 * Common types for API requests and responses
 */

// Provider types
export type ApiProviderType = 'anthropic' | 'openai' | 'simulation';

// Environment types
export type ApiEnvironment = 'development' | 'production' | 'test';

// Base request options
export interface ApiRequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
}

// Base API configuration
export interface ApiConfig {
  endpoint: string;
  apiKey?: string;
}

// Environment-specific API configuration
export interface ApiEnvironmentConfig {
  [key: string]: {
    [env in ApiEnvironment]?: ApiConfig;
  };
}

// Anthropic specific types
export interface AnthropicMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AnthropicApiResponse {
  content: Array<{ text: string }>;
  model: string;
  usage?: {
    input_tokens: number;
    output_tokens: number;
  };
}

export interface AnthropicRequestOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AnthropicRequest extends AnthropicRequestOptions {
  prompt: string;
  data: Record<string, unknown> | unknown[] | string | number | boolean;
}

export interface AnthropicResponse {
  text: string;
  tokens: number;
  model: string;
}
