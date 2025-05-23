import type { ApiEnvironment, ApiEnvironmentConfig } from './types';

/**
 * Get the current environment
 */
export function getEnvironment(): ApiEnvironment {
  const env = import.meta.env.NODE_ENV;

  if (env === 'production') {
    return 'production';
  } else if (env === 'test') {
    return 'test';
  } else {
    return 'development';
  }
}

/**
 * API configuration for different environments
 */
export const API_CONFIG: ApiEnvironmentConfig = {
  anthropic: {
    // In development, use the Express server
    development: {
      endpoint: 'http://localhost:3001/api/anthropic',
      // No API key needed here as it's added by the server
    },
    // In production, use the serverless function or deployed Express server
    production: {
      endpoint: '/api/anthropic',
      // No API key needed here as it's added by the server
    },
    // For testing, use the simulation provider
    test: {
      endpoint: '/api/simulation',
    },
  },
  // Add other API configurations as needed
};

/**
 * Get the API configuration for a specific provider and environment
 */
export function getApiConfig(provider: string, environment?: ApiEnvironment) {
  const env = environment || getEnvironment();
  const providerConfig = API_CONFIG[provider];

  if (!providerConfig) {
    throw new Error(`API configuration not found for provider: ${provider}`);
  }

  const envConfig = providerConfig[env];

  if (!envConfig) {
    throw new Error(`API configuration not found for environment: ${env}`);
  }

  return envConfig;
}
