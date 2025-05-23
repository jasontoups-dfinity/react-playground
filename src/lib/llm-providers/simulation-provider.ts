import { BaseLLMProvider } from './base-provider';
import type { LLMProviderConfig, LLMRequest, LLMResponse } from './types';

/**
 * Simulation provider for testing or when no API key is available
 */
export class SimulationProvider extends BaseLLMProvider {
  constructor(config: Partial<LLMProviderConfig> = {}) {
    super({
      provider: 'simulation',
      model: config.model || 'simulation-model',
      temperature: config.temperature,
      maxTokens: config.maxTokens,
    });
  }

  /**
   * Send a simulated request
   */
  async sendRequest(request: LLMRequest): Promise<LLMResponse> {
    try {
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
        model: this.config.model,
        provider: 'simulation',
      };
    } catch (error) {
      return this.handleError(error);
    }
  }
}
