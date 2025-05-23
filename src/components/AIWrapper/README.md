# AIWrapper Component

The AIWrapper component is a flexible React component that adds AI analysis capabilities to any existing component. It allows users to analyze data within components without leaving their current context.

## Features

- **Multiple Display Modes**: Choose between pageOverlay, componentOverlay, tray, or sidebar display modes for AI responses
- **Customizable Prompts**: Define specific prompts for different types of data analysis
- **Automatic Data Extraction**: Extracts data from child components using data attributes and form elements
- **Typewriter Effect**: Displays AI responses with a typewriter effect for better readability
- **Responsive Design**: Works well on all screen sizes
- **Themeable**: Uses your application's theme variables for consistent styling

## Installation

```bash
# If you're using npm
npm install phosphor-react

# If you're using yarn
yarn add phosphor-react
```

## Usage

### Basic Usage

Wrap any component with the `AIWrapper` to add AI analysis capabilities:

```jsx
import { AIWrapper, AIProvider } from './components/AIWrapper';

// Wrap your app with AIProvider
function App() {
  return (
    <AIProvider>
      <YourApp />
    </AIProvider>
  );
}

// Use AIWrapper around any component
function YourComponent() {
  return (
    <AIWrapper
      displayMode="pageOverlay"
      prompt="Analyze this data and provide insights."
      buttonPosition="top-right">
      <YourExistingComponent />
    </AIWrapper>
  );
}
```

### Data Extraction

The AIWrapper automatically extracts data from:

1. Elements with `data-ai` attributes:

   ```jsx
   <div data-ai data-ai-key="username">
     John Doe
   </div>
   ```

2. Form elements (inputs, selects, textareas) with name or id attributes:

   ```jsx
   <input name="email" value="john@example.com" />
   ```

3. Text content if no other data is found

### Custom Data Selection

You can customize how data is extracted and transformed using the `dataSelector` prop:

```jsx
<AIWrapper
  displayMode="componentOverlay"
  prompt="Analyze this customer data."
  dataSelector={(data) => {
    // Transform or filter the extracted data
    return {
      name: data.name,
      purchaseHistory: data.purchases,
      // Add computed values
      totalSpent: calculateTotal(data.purchases),
    };
  }}>
  <CustomerProfile />
</AIWrapper>
```

## Props

| Prop             | Type                                                         | Default                     | Description                                        |
| ---------------- | ------------------------------------------------------------ | --------------------------- | -------------------------------------------------- |
| `children`       | ReactNode                                                    | (required)                  | The component to wrap with AI capabilities         |
| `displayMode`    | 'pageOverlay' \| 'componentOverlay' \| 'tray' \| 'sidebar'   | 'pageOverlay'               | How the AI response should be displayed            |
| `prompt`         | string                                                       | 'Analyze this data: {data}' | The prompt template to use for the LLM             |
| `dataSelector`   | function                                                     | (data) => data              | Function to extract and transform data             |
| `apiConfig`      | object                                                       | undefined                   | Configuration for the API endpoint                 |
| `buttonPosition` | 'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left' | 'top-right'                 | Position of the AI button                          |
| `typingSpeed`    | number                                                       | 30                          | Speed of the typewriter effect in ms per character |
| `className`      | string                                                       | undefined                   | Additional class name for the wrapper              |

## LLM Provider Configuration

You can configure the LLM provider, model, and other parameters by providing an `apiConfig` prop:

```jsx
<AIWrapper
  apiConfig={{
    provider: 'anthropic', // 'anthropic', 'openai', or 'simulation'
    model: 'claude-3-haiku-20240307',
    endpoint: 'https://api.anthropic.com/v1/messages', // Optional, defaults to provider's standard endpoint
    apiKey: 'your-api-key', // Optional, will use environment variables if not provided
    temperature: 0.7, // Optional, controls randomness (0.0 to 1.0)
    maxTokens: 1000, // Optional, maximum tokens to generate
  }}>
  <YourComponent />
</AIWrapper>
```

> **Important Note on CORS**: When using the Anthropic or OpenAI providers directly from the browser, you may encounter CORS issues. This is because these APIs don't have the necessary CORS headers to allow direct requests from a browser. In a production environment, you should:
>
> 1. Use the simulation provider for development and testing
> 2. Create a backend proxy server to make the actual API calls to Anthropic/OpenAI
> 3. Update the endpoint in the apiConfig to point to your proxy server
>
> For example:
>
> ```jsx
> <AIWrapper
>   apiConfig={{
>     provider: 'anthropic',
>     model: 'claude-3-haiku-20240307',
>     endpoint: 'https://your-backend-proxy.com/api/anthropic', // Your proxy endpoint
>     apiKey: 'your-api-key',
>   }}>
>   <YourComponent />
> </AIWrapper>
> ```

### Supported Providers

The AIWrapper supports the following LLM providers:

#### Anthropic (Claude)

```jsx
<AIWrapper
  apiConfig={{
    provider: 'anthropic',
    model: 'claude-3-haiku-20240307', // or other Claude models
  }}>
  <YourComponent />
</AIWrapper>
```

Available models:

- `claude-3-opus-20240229` - Most powerful model, best for complex tasks
- `claude-3-sonnet-20240229` - Balanced performance and cost
- `claude-3-haiku-20240307` - Fastest and most cost-effective
- `claude-2.1` - Previous generation
- `claude-2.0` - Previous generation
- `claude-instant-1.2` - Previous generation

#### OpenAI (GPT)

```jsx
<AIWrapper
  apiConfig={{
    provider: 'openai',
    model: 'gpt-4',
  }}>
  <YourComponent />
</AIWrapper>
```

Available models:

- `gpt-4-turbo` - Latest GPT-4 model
- `gpt-4` - Standard GPT-4 model
- `gpt-3.5-turbo` - Faster and more cost-effective

#### Simulation (for testing)

```jsx
<AIWrapper
  apiConfig={{
    provider: 'simulation',
    model: 'simulation-model',
  }}>
  <YourComponent />
</AIWrapper>
```

This provider doesn't make actual API calls and is useful for testing or when no API keys are available.

## Environment Variables

You can control the availability of the AIWrapper using environment variables:

```
# .env file
USE_DEVELOPER_TOOLS=true
```

## Examples

### Customer Profile Analysis (Page Overlay)

```jsx
<AIWrapper
  displayMode="pageOverlay"
  prompt="Analyze this customer data and provide insights about their purchasing behavior.">
  <CustomerProfile data={customerData} />
</AIWrapper>
```

### Feedback Form Analysis (Component Overlay)

```jsx
<AIWrapper
  displayMode="componentOverlay"
  prompt="Analyze this feedback and suggest how to respond.">
  <FeedbackForm />
</AIWrapper>
```

### Text Content Analysis (Tray)

```jsx
<AIWrapper displayMode="tray" prompt="Summarize this text and identify key points.">
  <TextContent />
</AIWrapper>
```

### Sidebar Example

```jsx
<AIWrapper displayMode="sidebar" prompt="Provide detailed analysis of this content.">
  <DetailedContent />
</AIWrapper>
```

## Customization

The AIWrapper uses CSS variables for styling, so you can customize its appearance by overriding these variables in your CSS:

```css
:root {
  --ai-button-bg: rgba(0, 0, 0, 0.1);
  --ai-button-hover-bg: rgba(0, 0, 0, 0.2);
  --ai-button-text: currentColor;
  --ai-overlay-bg: rgba(0, 0, 0, 0.6);
  --ai-card-bg: var(--card);
  --ai-card-text: var(--card-foreground);
}
```

## License

MIT
