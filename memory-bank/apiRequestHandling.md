# API Request Handling Architecture

## Overview

This document outlines our architecture for handling API requests in our React application, specifically addressing CORS issues and providing a secure, scalable solution for both development and production environments.

## Current Issues

We encountered CORS issues when trying to make direct API requests to external services like Anthropic from our browser-based React application. The error was:

```
Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at http://localhost:3001/api/anthropic. (Reason: CORS request did not succeed).
```

This is a common issue when making cross-origin requests from a browser to an API that doesn't have the appropriate CORS headers.

## Solution Architecture

We've designed a comprehensive solution that addresses both immediate CORS issues and provides a scalable architecture for handling all API requests in our application.

### 1. Development Environment

For the development environment, we'll use Vite's built-in proxy configuration to handle API requests:

```javascript
// vite.config.ts
export default defineConfig({
  // ...other config
  server: {
    proxy: {
      '/api/anthropic': {
        target: 'https://api.anthropic.com/v1/messages',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/anthropic/, ''),
        configure: (proxy, _options) => {
          proxy.on('proxyReq', function (proxyReq, req, res, options) {
            // Add the API key from environment variables
            proxyReq.setHeader('x-api-key', process.env.ANTHROPIC_API_KEY);
            proxyReq.setHeader('anthropic-version', '2023-06-01');
          });
        },
      },
      // Add other API proxies as needed
    },
  },
});
```

This approach:

- Solves CORS issues by proxying requests through the Vite development server
- Keeps API keys secure by adding them on the server side
- Provides a clean API endpoint structure (/api/service-name)

### 2. API Client Library

We'll create a client-side library to abstract away the details of making API requests:

```
src/lib/api/
├── index.ts           # Main export file
├── config.ts          # Environment-specific configuration
├── types.ts           # TypeScript types for API requests/responses
├── anthropic.ts       # Anthropic API client
└── base.ts            # Base API client with common functionality
```

The API client will:

- Handle authentication
- Provide error handling
- Format requests and responses
- Be environment-aware (use different endpoints for dev/prod)

Example usage:

```typescript
import { anthropicClient } from '@/lib/api';

// Simple API call
const response = await anthropicClient.sendMessage({
  prompt: 'Analyze this data',
  data: someData,
});

// With options
const response = await anthropicClient.sendMessage({
  prompt: 'Analyze this data',
  data: someData,
  model: 'claude-3-haiku-20240307',
  temperature: 0.7,
});
```

### 3. Production Environment

For production, we'll use a serverless function or a small backend service to handle API requests:

```
/api/
├── anthropic.js       # Anthropic API handler
└── other-services.js  # Other API handlers
```

This approach:

- Keeps API keys secure by storing them on the server
- Provides a consistent API endpoint structure
- Can be deployed alongside the frontend application
- Scales automatically based on demand

### 4. Environment Configuration

We'll create environment-specific configurations that determine the API endpoints:

```typescript
// src/lib/api/config.ts
export const API_CONFIG = {
  anthropic: {
    // In development, use the Vite proxy
    development: {
      endpoint: '/api/anthropic',
      // No API key needed here as it's added by the proxy
    },
    // In production, use the serverless function
    production: {
      endpoint: '/api/anthropic',
      // No API key needed here as it's added by the serverless function
    },
    // For testing, use the simulation provider
    test: {
      endpoint: '/api/simulation',
    },
  },
  // Add other API configurations as needed
};
```

## Implementation Plan

1. **Express Server**: Use the Express server to handle API requests in both development and production environments.
2. **API Client Library**: Create the client-side library in src/lib/api/ to abstract away the details of making API requests.
3. **Environment-specific Configuration**: Configure the API client to use different endpoints based on the environment.
4. **Update Components**: Update the AIWrapper component to use the new API client.
5. **Production Deployment**: Deploy the Express server alongside the frontend application for production.

## Current Implementation Status

We've implemented:

1. ✅ Express server for handling API requests
2. ✅ API client library with environment-specific configuration
3. ✅ Updated AIWrapper component to use the new API client
4. ⏳ Production deployment (pending)

The Express server is running on port 3001 and proxies requests to the Anthropic API, adding the necessary headers and handling CORS issues.

## Benefits

This architecture provides several benefits:

- **Solves CORS Issues**: By proxying requests through the same origin, we avoid CORS issues.
- **Secures API Keys**: API keys are never exposed in client-side code.
- **Scalable**: The architecture can handle multiple API integrations with a consistent approach.
- **Environment-Aware**: The system behaves appropriately in different environments.
- **Clean API**: Provides a clean, consistent API for making requests.
- **Maintainable**: Centralizes API request logic, making it easier to maintain and update.

## Prompt Formatting for Different Data Types

When working with LLM APIs, it's important to format prompts appropriately based on the type of data being sent. We've identified and addressed an issue with our default prompt:

### Issue

Our initial prompt was: `"Analyze this data: {data}"` which was too generic when sending structured data like JSON objects. This resulted in the LLM responding that it didn't have any text to summarize, as it was expecting text content rather than structured data.

### Solution

We've updated the default prompt to be more specific about the type of data being sent and what we want the LLM to do with it:

```typescript
prompt: 'Here is some user data: {data}. Please analyze this data and provide a summary of the key information.';
```

### Best Practices for Prompt Formatting

1. **Be Specific About Data Type**: Clearly indicate what type of data you're sending (e.g., "user data", "product information", "log entries")
2. **Provide Clear Instructions**: Tell the LLM exactly what you want it to do with the data
3. **Consider Data Structure**: Format prompts differently based on whether you're sending structured data (JSON), text, or other formats
4. **Test Different Prompts**: Experiment with different prompt formats to find what works best for your use case

### Example Prompts for Different Data Types

- **JSON Data**: "Here is some user data in JSON format: {data}. Please analyze this data and provide a summary of the key user information."
- **Text Content**: "Here is an article: {data}. Please summarize the main points and key takeaways."
- **Code**: "Here is some JavaScript code: {data}. Please explain what this code does and suggest any improvements."
- **Logs**: "Here are some application logs: {data}. Please identify any errors or unusual patterns."

By tailoring prompts to the specific data type and desired outcome, we can get more accurate and useful responses from LLMs.

## Future Considerations

- **Caching**: Add caching for API responses to improve performance and reduce costs.
- **Rate Limiting**: Implement rate limiting to prevent abuse and manage costs.
- **Monitoring**: Add monitoring and logging to track API usage and errors.
- **Authentication**: Add user authentication for APIs that require it.
- **Prompt Templates**: Create a library of prompt templates for different data types and use cases.
- **Response Formatting**: Add options for formatting LLM responses (e.g., JSON, markdown, HTML).
