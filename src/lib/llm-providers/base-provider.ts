import type {
  LLMProvider,
  LLMProviderConfig,
  LLMProviderType,
  LLMRequest,
  LLMResponse,
} from './types';

/**
 * Base class for LLM providers
 */
export abstract class BaseLLMProvider implements LLMProvider {
  protected config: LLMProviderConfig;

  constructor(config: LLMProviderConfig) {
    this.config = {
      ...config,
      temperature: config.temperature ?? 0.7,
      maxTokens: config.maxTokens ?? 1000,
    };
  }

  /**
   * Send a request to the LLM provider
   * This method must be implemented by subclasses
   */
  abstract sendRequest(request: LLMRequest): Promise<LLMResponse>;

  /**
   * Get the provider type
   */
  getProviderType(): LLMProviderType {
    return this.config.provider;
  }

  /**
   * Get the provider configuration
   */
  getConfig(): LLMProviderConfig {
    return this.config;
  }

  /**
   * Get the API key for the provider
   * Subclasses should override this method if they need to get the API key from environment variables
   */
  protected getApiKey(): string | undefined {
    return this.config.apiKey;
  }

  /**
   * Format a prompt for the provider
   * Subclasses should override this method if they need to format the prompt differently
   */
  protected formatPrompt(
    prompt: string,
    data: Record<string, unknown> | unknown[] | string | number | boolean
  ): string {
    return prompt.replace('{data}', JSON.stringify(data, null, 2));
  }

  /**
   * Handle an error from the provider
   * Subclasses should override this method if they need to handle errors differently
   */
  protected handleError(error: unknown): never {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Unknown error: ${String(error)}`);
  }
}
