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
    console.log('AnthropicClient: formatPrompt called with prompt:', prompt);
    console.log('AnthropicClient: formatPrompt called with data:', data);

    // Check if the prompt contains the {data} placeholder
    if (!prompt.includes('{data}')) {
      console.warn(
        'AnthropicClient: Warning - prompt does not contain {data} placeholder:',
        prompt
      );
      // If no placeholder, append the data to the prompt
      return `${prompt}\n\nData: ${JSON.stringify(data, null, 2)}`;
    }

    // Replace the {data} placeholder with the stringified data
    const formattedPrompt = prompt.replace('{data}', JSON.stringify(data, null, 2));
    console.log('AnthropicClient: formatted prompt:', formattedPrompt);
    return formattedPrompt;
  }

  /**
   * Send a message to the Anthropic API
   */
  async sendMessage(request: AnthropicRequest): Promise<AnthropicResponse> {
    console.log('AnthropicClient: sendMessage called with request:', request);

    // Check if data is present in the request
    if (!request.data) {
      console.warn('AnthropicClient: Warning - no data provided in request');
    }

    const formattedPrompt = this.formatPrompt(request.prompt, request.data);

    const requestBody = {
      model: request.model || DEFAULT_MODEL,
      messages: [{ role: 'user', content: formattedPrompt }],
      temperature: request.temperature || DEFAULT_TEMPERATURE,
      max_tokens: request.maxTokens || DEFAULT_MAX_TOKENS,
    };

    console.log(
      'AnthropicClient: final request body being sent to API:',
      JSON.stringify(requestBody, null, 2)
    );

    // The API endpoint is already set in the config, so we use an empty path
    const response = await this.post<AnthropicApiResponse>('', requestBody);
    console.log('AnthropicClient: raw API response:', response);

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
