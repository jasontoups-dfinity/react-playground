/**
 * Common types for LLM providers
 */

/**
 * Supported LLM providers
 */
export type LLMProviderType = 'anthropic' | 'openai' | 'simulation';

/**
 * Configuration for an LLM provider
 */
export interface LLMProviderConfig {
  /**
   * The provider type
   */
  provider: LLMProviderType;

  /**
   * The model to use
   */
  model: string;

  /**
   * API endpoint (optional, defaults to the provider's standard endpoint)
   */
  endpoint?: string;

  /**
   * API key (optional, will use environment variables if not provided)
   */
  apiKey?: string;

  /**
   * Temperature for response generation (0.0 to 1.0)
   */
  temperature?: number;

  /**
   * Maximum tokens to generate
   */
  maxTokens?: number;
}

/**
 * Request to an LLM provider
 */
export interface LLMRequest {
  /**
   * The prompt to send to the LLM
   */
  prompt: string;

  /**
   * The data to include in the prompt
   */
  data: Record<string, unknown> | unknown[] | string | number | boolean;
}

/**
 * Response from an LLM provider
 */
export interface LLMResponse {
  /**
   * The generated text
   */
  text: string;

  /**
   * The number of tokens used
   */
  tokens: number;

  /**
   * The model used
   */
  model: string;

  /**
   * The provider that generated the response
   */
  provider: LLMProviderType;
}

/**
 * Interface for an LLM provider
 */
export interface LLMProvider {
  /**
   * Send a request to the LLM provider
   */
  sendRequest: (request: LLMRequest) => Promise<LLMResponse>;

  /**
   * Get the provider type
   */
  getProviderType: () => LLMProviderType;

  /**
   * Get the provider configuration
   */
  getConfig: () => LLMProviderConfig;
}
