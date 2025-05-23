import type { ApiConfig, ApiRequestOptions } from './types';

/**
 * Base API client class
 */
export abstract class BaseApiClient {
  protected config: ApiConfig;

  constructor(config: ApiConfig) {
    this.config = config;
  }

  /**
   * Get the API endpoint
   */
  protected getEndpoint(): string {
    return this.config.endpoint;
  }

  /**
   * Get the API key
   */
  protected getApiKey(): string | undefined {
    return this.config.apiKey;
  }

  /**
   * Make a GET request to the API
   */
  protected async get<T>(path: string, options?: ApiRequestOptions): Promise<T> {
    const url = this.buildUrl(path);
    const headers = this.buildHeaders(options?.headers);

    const response = await fetch(url, {
      method: 'GET',
      headers,
      signal: options?.timeout ? AbortSignal.timeout(options.timeout) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  /**
   * Make a POST request to the API
   */
  protected async post<T>(path: string, data: unknown, options?: ApiRequestOptions): Promise<T> {
    const url = this.buildUrl(path);
    const headers = this.buildHeaders(options?.headers);

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
      signal: options?.timeout ? AbortSignal.timeout(options.timeout) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  /**
   * Build the full URL for a request
   */
  protected buildUrl(path: string): string {
    const endpoint = this.getEndpoint();
    const baseUrl = endpoint.endsWith('/') ? endpoint.slice(0, -1) : endpoint;
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    const fullUrl = `${baseUrl}${normalizedPath}`;
    console.log('BaseApiClient: Built URL', fullUrl);

    return fullUrl;
  }

  /**
   * Build the headers for a request
   */
  protected buildHeaders(additionalHeaders?: Record<string, string>): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...additionalHeaders,
    };

    const apiKey = this.getApiKey();
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }

    return headers;
  }

  /**
   * Handle the response from a request
   */
  protected async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(
        `API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }

    return response.json() as Promise<T>;
  }
}
