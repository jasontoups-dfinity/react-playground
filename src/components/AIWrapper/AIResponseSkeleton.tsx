import React from 'react';
import { cn } from '../../lib/utils';
import type { AIResponseSkeletonProps } from './types';

const AIResponseSkeleton: React.FC<AIResponseSkeletonProps> = ({
  lines = 3,
  animated = true,
  className,
}) => {
  return (
    <div className={cn('space-y-2', animated && 'animate-pulse', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-muted rounded"
          style={{
            width: `${Math.floor(70 + Math.random() * 30)}%`,
            opacity: 1 - i * 0.1,
          }}
        />
      ))}
    </div>
  );
};

export default AIResponseSkeleton;
