import React from 'react';
import { Brain, CircleNotch } from 'phosphor-react';
import { cn } from '../../lib/utils';
import type { AITriggerButtonProps } from './types';

const AITriggerButton: React.FC<AITriggerButtonProps> = ({
  position,
  onClick,
  isLoading,
  className,
}) => {
  const positionClasses = {
    'top-right': 'top-2 right-2',
    'top-left': 'top-2 left-2',
    'bottom-right': 'bottom-2 right-2',
    'bottom-left': 'bottom-2 left-2',
  };

  return (
    <button
      className={cn(
        'absolute z-10 w-10 h-10 rounded-md bg-primary/10 hover:bg-primary/20 transition-all duration-200',
        'flex items-center justify-center shadow-sm',
        'focus:outline-none focus:ring-2 focus:ring-primary/50',
        isLoading ? 'cursor-wait' : 'cursor-pointer',
        positionClasses[position],
        className
      )}
      onClick={onClick}
      disabled={isLoading}
      aria-label="AI Analysis"
      title="Analyze with AI">
      {isLoading ? (
        <CircleNotch className="w-5 h-5 text-primary animate-spin" weight="bold" />
      ) : (
        <Brain
          className="w-5 h-5 text-primary group-hover:scale-110 transition-transform"
          weight="duotone"
        />
      )}
    </button>
  );
};

export default AITriggerButton;
