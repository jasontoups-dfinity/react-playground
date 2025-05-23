import { BaseLLMProvider } from './base-provider';
import type { LLMProviderConfig, LLMProviderType, LLMRequest, LLMResponse } from './types';

/**
 * Anthropic API provider
 */
export class AnthropicProvider extends BaseLLMProvider {
  // Default endpoint for Anthropic API (using our proxy server)
  private static readonly DEFAULT_ENDPOINT = 'http://localhost:3001/api/anthropic';

  // Default model for Anthropic API
  private static readonly DEFAULT_MODEL = 'claude-3-opus-20240229';

  constructor(config: Partial<LLMProviderConfig> = {}) {
    super({
      provider: 'anthropic',
      model: config.model || AnthropicProvider.DEFAULT_MODEL,
      endpoint: config.endpoint || AnthropicProvider.DEFAULT_ENDPOINT,
      apiKey: config.apiKey,
      temperature: config.temperature,
      maxTokens: config.maxTokens,
    });
  }

  /**
   * Get the API key from environment variables if not provided in config
   */
  protected override getApiKey(): string {
    console.log('AnthropicProvider: getApiKey called');

    if (this.config.apiKey) {
      console.log('AnthropicProvider: using API key from config');
      return this.config.apiKey;
    }

    console.log('AnthropicProvider: checking environment variables for API key');
    console.log(
      'AnthropicProvider: ANTHROPIC_API_KEY exists:',
      !!import.meta.env.ANTHROPIC_API_KEY
    );

    const apiKey = import.meta.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      console.error('AnthropicProvider: API key not found in config or environment variables');
      throw new Error(
        'Anthropic API key not found. Please provide it in the config or set the ANTHROPIC_API_KEY environment variable.'
      );
    }

    console.log('AnthropicProvider: API key found in environment variables');
    return apiKey;
  }

  /**
   * Format the prompt for Anthropic API
   */
  protected override formatPrompt(
    prompt: string,
    data: Record<string, unknown> | unknown[] | string | number | boolean
  ): string {
    // Replace the {data} placeholder with the stringified data
    const formattedPrompt = prompt.replace('{data}', JSON.stringify(data, null, 2));

    return formattedPrompt;
  }

  /**
   * Send a request to the Anthropic API
   */
  async sendRequest(request: LLMRequest): Promise<LLMResponse> {
    console.log('AnthropicProvider: sendRequest called', request);

    try {
      const formattedPrompt = this.formatPrompt(request.prompt, request.data);
      console.log('AnthropicProvider: formatted prompt', formattedPrompt);

      const apiKey = this.getApiKey();
      console.log('AnthropicProvider: got API key (length)', apiKey?.length);

      const endpoint = this.config.endpoint || AnthropicProvider.DEFAULT_ENDPOINT;
      console.log('AnthropicProvider: using endpoint', endpoint);

      const requestBody = {
        model: this.config.model,
        messages: [{ role: 'user', content: formattedPrompt }],
        temperature: this.config.temperature,
        max_tokens: this.config.maxTokens,
      };
      console.log('AnthropicProvider: request body', requestBody);

      console.log('AnthropicProvider: sending fetch request');
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify(requestBody),
      });
      console.log('AnthropicProvider: received response', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('AnthropicProvider: API error', errorData);
        throw new Error(
          `Anthropic API error: ${response.status} ${response.statusText} - ${JSON.stringify(
            errorData
          )}`
        );
      }

      console.log('AnthropicProvider: parsing response JSON');
      const data = await response.json();
      console.log('AnthropicProvider: response data', data);

      const result: LLMResponse = {
        text: data.content[0].text,
        tokens: data.usage?.input_tokens + data.usage?.output_tokens || 0,
        model: data.model || this.config.model,
        provider: 'anthropic' as LLMProviderType,
      };
      console.log('AnthropicProvider: returning result', result);

      return result;
    } catch (error) {
      console.error('AnthropicProvider: error in sendRequest', error);
      return this.handleError(error);
    }
  }
}
