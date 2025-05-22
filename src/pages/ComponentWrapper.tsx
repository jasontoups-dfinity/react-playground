import React, { useEffect, useState } from 'react';
import { usePageTitle } from '../lib/TitleContext';
import { AIWrapper, AIProvider } from '../components/AIWrapper';

// Example component with data that can be analyzed by AI
const CustomerProfile: React.FC<{ data: Record<string, unknown> }> = ({ data }) => {
  return (
    <div className="bg-card p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Customer Profile</h2>
      <div className="space-y-2">
        <div>
          <span className="font-medium">Name:</span>{' '}
          <span data-ai data-ai-key="name">
            {String(data.name)}
          </span>
        </div>
        <div>
          <span className="font-medium">Email:</span>{' '}
          <span data-ai data-ai-key="email">
            {String(data.email)}
          </span>
        </div>
        <div>
          <span className="font-medium">Age:</span>{' '}
          <span data-ai data-ai-key="age">
            {String(data.age)}
          </span>
        </div>
        <div>
          <span className="font-medium">Subscription:</span>{' '}
          <span data-ai data-ai-key="subscription">
            {String(data.subscription)}
          </span>
        </div>
        <div>
          <span className="font-medium">Last Purchase:</span>{' '}
          <span data-ai data-ai-key="lastPurchase">
            {String(data.lastPurchase)}
          </span>
        </div>
        <div>
          <span className="font-medium">Purchase History:</span>{' '}
          <ul className="list-disc pl-5 mt-1">
            {Array.isArray(data.purchaseHistory) &&
              data.purchaseHistory.map((item, index) => (
                <li key={index} data-ai data-ai-key={`purchase-${index}`}>
                  {item}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Example component with a form
const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: '5',
    feedback: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Feedback Form</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="rating" className="block text-sm font-medium mb-1">
            Rating
          </label>
          <select
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full p-2 border border-border rounded-md">
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </div>
        <div>
          <label htmlFor="feedback" className="block text-sm font-medium mb-1">
            Feedback
          </label>
          <textarea
            id="feedback"
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 border border-border rounded-md"
          />
        </div>
      </form>
    </div>
  );
};

// Example data for the customer profile
const customerData = {
  name: 'Jane Smith',
  email: 'jane.smith@example.com',
  age: 32,
  subscription: 'Premium',
  lastPurchase: '2025-05-15',
  purchaseHistory: [
    'Wireless Headphones - $149.99',
    'Smart Watch - $299.99',
    'Laptop Stand - $49.99',
    'External SSD - $129.99',
  ],
};

const ComponentWrapper: React.FC = () => {
  const { setPageTitle } = usePageTitle();

  useEffect(() => {
    setPageTitle('Component Wrapper');
  }, [setPageTitle]);

  return (
    <AIProvider>
      <>
        <h1 className="text-3xl font-bold mb-6">AI Wrapper Demo</h1>
        <p className="mb-4">
          This page demonstrates the AIWrapper component that can wrap around any component and
          provide AI analysis capabilities. Click the AI button in the corner of each component to
          analyze its data.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Customer Profile with AI Wrapper */}
          <AIWrapper
            displayMode="overlay"
            prompt="Analyze this customer data and provide insights about their purchasing behavior and preferences. Suggest potential products they might be interested in based on their history."
            buttonPosition="top-right">
            <CustomerProfile data={customerData} />
          </AIWrapper>

          {/* Feedback Form with AI Wrapper */}
          <AIWrapper
            displayMode="tray"
            prompt="Analyze this feedback form data and summarize the customer's sentiment. Provide suggestions for how to respond to this feedback."
            buttonPosition="top-right">
            <FeedbackForm />
          </AIWrapper>

          {/* Simple Text Component with AI Wrapper */}
          <AIWrapper
            displayMode="sidebar"
            prompt="Summarize this text and identify key points."
            buttonPosition="top-right">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Project Description</h2>
              <div className="prose">
                <p>
                  Our new AI-enhanced component library aims to bring artificial intelligence
                  capabilities to everyday React components. By wrapping standard UI components with
                  our AIWrapper, developers can provide users with instant AI analysis and insights
                  without leaving the current context.
                </p>
                <p className="mt-4">
                  This approach reduces context switching and makes AI capabilities more accessible
                  throughout the application. Users can analyze data, get recommendations, and
                  receive insights with a single click, all while maintaining their current
                  workflow.
                </p>
                <p className="mt-4">
                  The library is designed to be flexible and customizable, allowing developers to
                  specify different display modes, prompts, and data extraction methods to suit
                  their specific use cases.
                </p>
              </div>
            </div>
          </AIWrapper>

          {/* Regular Component without AI Wrapper */}
          <div className="bg-card p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Regular Component</h2>
            <p>
              This is a regular component without the AI Wrapper. Notice that it doesn't have an AI
              button in the corner.
            </p>
            <p className="mt-4">
              Compare this with the other components on this page to see the difference that the
              AIWrapper makes.
            </p>
          </div>
        </div>
      </>
    </AIProvider>
  );
};

export default ComponentWrapper;
