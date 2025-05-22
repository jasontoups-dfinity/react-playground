# AIWrapper Component

The AIWrapper component is a flexible React component that adds AI analysis capabilities to any existing component. It allows users to analyze data within components without leaving their current context.

## Features

- **Multiple Display Modes**: Choose between overlay, tray, or sidebar display modes for AI responses
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
      displayMode="overlay"
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
  displayMode="overlay"
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
| `displayMode`    | 'overlay' \| 'tray' \| 'sidebar'                             | 'overlay'                   | How the AI response should be displayed            |
| `prompt`         | string                                                       | 'Analyze this data: {data}' | The prompt template to use for the LLM             |
| `dataSelector`   | function                                                     | (data) => data              | Function to extract and transform data             |
| `apiConfig`      | object                                                       | undefined                   | Configuration for the API endpoint                 |
| `buttonPosition` | 'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left' | 'top-right'                 | Position of the AI button                          |
| `typingSpeed`    | number                                                       | 30                          | Speed of the typewriter effect in ms per character |
| `className`      | string                                                       | undefined                   | Additional class name for the wrapper              |

## API Configuration

You can configure the API endpoint, API key, and model by providing an `apiConfig` prop:

```jsx
<AIWrapper
  apiConfig={{
    endpoint: 'https://your-api-endpoint.com',
    apiKey: 'your-api-key',
    model: 'gpt-4',
  }}>
  <YourComponent />
</AIWrapper>
```

## Environment Variables

You can control the availability of the AIWrapper using environment variables:

```
# .env file
USE_DEVELOPER_TOOLS=true
```

## Examples

### Customer Profile Analysis

```jsx
<AIWrapper
  displayMode="overlay"
  prompt="Analyze this customer data and provide insights about their purchasing behavior.">
  <CustomerProfile data={customerData} />
</AIWrapper>
```

### Feedback Form Analysis

```jsx
<AIWrapper displayMode="tray" prompt="Analyze this feedback and suggest how to respond.">
  <FeedbackForm />
</AIWrapper>
```

### Text Content Analysis

```jsx
<AIWrapper displayMode="sidebar" prompt="Summarize this text and identify key points.">
  <TextContent />
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
