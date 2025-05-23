import React, { useRef, useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import { useAI } from '../../lib/AIContext';
import { cn } from '../../lib/utils';
import AITriggerButton from './AITriggerButton';
import AIResponseDisplay from './AIResponseDisplay';
import type { AIWrapperProps } from './types';

const AIWrapper: React.FC<AIWrapperProps> = ({
  children,
  displayMode = 'pageOverlay',
  prompt = 'Analyze this data: {data}',
  dataSelector = (data) => data,
  apiConfig,
  buttonPosition = 'top-right',
  typingSpeed = 30,
  className,
}) => {
  // Generate a unique ID for this instance
  const instanceId = useId();

  const { isOpen, status, response, toggle, processData, reset, setConfig, activeInstanceId } =
    useAI();

  const childRef = useRef<HTMLDivElement>(null);

  // Check if this instance is the active one
  const isActive = activeInstanceId === instanceId;

  // Update the AI context configuration when props change
  useEffect(() => {
    setConfig({
      displayMode,
      prompt,
      ...(apiConfig && {
        llmConfig: {
          ...apiConfig,
          // Ensure provider is set if not provided
          provider: apiConfig.provider || 'anthropic',
        },
      }),
    });
  }, [displayMode, prompt, apiConfig]); // Removed setConfig from dependencies to prevent infinite loop

  // Function to extract data from the child component
  const extractData = () => {
    if (!childRef.current) return {};

    // In a real implementation, this would use more sophisticated techniques
    // to extract data from the child component. For now, we'll use a simple approach
    // that extracts data from data attributes and form elements.

    const extractedData: Record<string, unknown> = {};

    // Extract data attributes
    const dataElements = childRef.current.querySelectorAll('[data-ai]');
    dataElements.forEach((element) => {
      const key = element.getAttribute('data-ai-key') || 'content';
      const value = element.getAttribute('data-ai-value') || element.textContent;
      extractedData[key] = value;
    });

    // Extract form elements
    const formElements = childRef.current.querySelectorAll('input, select, textarea');
    formElements.forEach((element) => {
      const input = element as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      const name = input.name || input.id;
      if (name) {
        extractedData[name] = input.value;
      }
    });

    // Add any visible text content
    const textContent = childRef.current.textContent || '';
    if (textContent.trim() && Object.keys(extractedData).length === 0) {
      extractedData.content = textContent.trim();
    }

    return extractedData;
  };

  // Handle AI button click
  const handleAIRequest = async () => {
    console.log('AIWrapper: handleAIRequest called', { instanceId });

    // Extract data from the child component
    const extractedData = extractData();
    console.log('AIWrapper: extracted data', extractedData);

    // Process the data with the dataSelector function
    const processedData = dataSelector(extractedData);
    console.log('AIWrapper: processed data', processedData);

    // Send the data to the AI with this instance's ID
    console.log('AIWrapper: calling processData with instanceId', instanceId);
    await processData(processedData, instanceId);
    console.log('AIWrapper: processData completed');
  };

  // Handle close
  const handleClose = () => {
    toggle(instanceId);
    setTimeout(() => {
      reset();
    }, 300); // Wait for animation to complete
  };

  return (
    <div className={cn('ai-wrapper relative', className)}>
      <div ref={childRef} className="ai-wrapper-content">
        {children}
      </div>

      <AITriggerButton
        position={buttonPosition}
        onClick={handleAIRequest}
        isLoading={status === 'loading'}
      />

      {/* For non-pageOverlay modes, render directly in the component tree */}
      {isOpen && isActive && displayMode !== 'pageOverlay' && (
        <AIResponseDisplay
          mode={displayMode}
          status={status}
          response={response}
          typingSpeed={typingSpeed}
          onClose={handleClose}
        />
      )}

      {/* For pageOverlay mode, use createPortal to render at the document body level */}
      {isOpen &&
        isActive &&
        displayMode === 'pageOverlay' &&
        createPortal(
          <AIResponseDisplay
            mode={displayMode}
            status={status}
            response={response}
            typingSpeed={typingSpeed}
            onClose={handleClose}
          />,
          document.body
        )}
    </div>
  );
};

export default AIWrapper;
