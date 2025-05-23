import { AnthropicProvider } from './anthropic-provider';
import { SimulationProvider } from './simulation-provider';
import type { LLMProvider, LLMProviderConfig, LLMProviderType } from './types';

/**
 * Create an LLM provider based on the configuration
 */
export function createLLMProvider(config: Partial<LLMProviderConfig> = {}): LLMProvider {
  console.log('provider-factory: createLLMProvider called with config', config);

  const providerType = config.provider || determineDefaultProvider();
  console.log('provider-factory: determined provider type', providerType);

  let provider: LLMProvider;

  switch (providerType) {
    case 'anthropic':
      console.log('provider-factory: creating AnthropicProvider');
      provider = new AnthropicProvider(config);
      break;
    case 'openai':
      // TODO: Implement OpenAI provider
      console.warn('OpenAI provider not implemented yet, falling back to simulation');
      provider = new SimulationProvider(config);
      break;
    case 'simulation':
      console.log('provider-factory: creating SimulationProvider');
      provider = new SimulationProvider(config);
      break;
    default:
      console.warn(`Unknown provider type: ${providerType}, falling back to simulation`);
      provider = new SimulationProvider(config);
      break;
  }

  console.log('provider-factory: provider created', {
    type: provider.getProviderType(),
    config: provider.getConfig(),
  });

  return provider;
}

/**
 * Determine the default provider based on available environment variables
 */
function determineDefaultProvider(): LLMProviderType {
  console.log('provider-factory: determineDefaultProvider called');

  // Check for Anthropic API key
  if (import.meta.env.ANTHROPIC_API_KEY) {
    console.log('provider-factory: ANTHROPIC_API_KEY found, using anthropic provider');
    return 'anthropic';
  }

  // Check for OpenAI API key (for future implementation)
  if (import.meta.env.OPENAI_API_KEY) {
    console.log('provider-factory: OPENAI_API_KEY found, using openai provider');
    return 'openai';
  }

  // Fall back to simulation if no API keys are available
  console.log('provider-factory: No API keys found, falling back to simulation provider');
  return 'simulation';
}

/**
 * Get available LLM models for a provider
 */
export function getAvailableModels(provider: LLMProviderType): string[] {
  switch (provider) {
    case 'anthropic':
      return [
        'claude-3-opus-20240229',
        'claude-3-sonnet-20240229',
        'claude-3-haiku-20240307',
        'claude-2.1',
        'claude-2.0',
        'claude-instant-1.2',
      ];
    case 'openai':
      return ['gpt-4-turbo', 'gpt-4', 'gpt-3.5-turbo'];
    case 'simulation':
      return ['simulation-model'];
    default:
      return [];
  }
}
