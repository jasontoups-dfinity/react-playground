import { BaseApiClient } from './base';
import { getApiConfig } from './config';
import type { AnthropicApiResponse, AnthropicRequest, AnthropicResponse } from './types';

/**
 * Default values for Anthropic API requests
 */
const DEFAULT_MODEL = 'claude-3-haiku-20240307';
const DEFAULT_TEMPERATURE = 0.7;
const DEFAULT_MAX_TOKENS = 1000;

/**
 * Anthropic API client
 */
export class AnthropicClient extends BaseApiClient {
  /**
   * Create a new Anthropic API client
   */
  constructor() {
    const config = getApiConfig('anthropic');
    console.log('AnthropicClient: Using endpoint', config.endpoint);
    super(config);
  }

  /**
   * Format the prompt for Anthropic API
   */
  private formatPrompt(
    prompt: string,
    data: Record<string, unknown> | unknown[] | string | number | boolean
  ): string {
    // Replace the {data} placeholder with the stringified data
    return prompt.replace('{data}', JSON.stringify(data, null, 2));
  }

  /**
   * Send a message to the Anthropic API
   */
  async sendMessage(request: AnthropicRequest): Promise<AnthropicResponse> {
    const formattedPrompt = this.formatPrompt(request.prompt, request.data);

    const requestBody = {
      model: request.model || DEFAULT_MODEL,
      messages: [{ role: 'user', content: formattedPrompt }],
      temperature: request.temperature || DEFAULT_TEMPERATURE,
      max_tokens: request.maxTokens || DEFAULT_MAX_TOKENS,
    };

    // The API endpoint is already set in the config, so we use an empty path
    const response = await this.post<AnthropicApiResponse>('', requestBody);

    return {
      text: response.content[0].text,
      tokens: (response.usage?.input_tokens || 0) + (response.usage?.output_tokens || 0),
      model: response.model || requestBody.model,
    };
  }
}

/**
 * Create a singleton instance of the Anthropic API client
 */
export const anthropicClient = new AnthropicClient();
