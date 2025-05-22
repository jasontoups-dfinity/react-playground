import AIWrapper from './AIWrapper';
import AITriggerButton from './AITriggerButton';
import AIResponseDisplay from './AIResponseDisplay';
import AIResponseSkeleton from './AIResponseSkeleton';
import TypewriterText from './TypewriterText';
import { AIProvider, useAI } from '../../lib/AIContext';

export {
  AIWrapper,
  AITriggerButton,
  AIResponseDisplay,
  AIResponseSkeleton,
  TypewriterText,
  AIProvider,
  useAI,
};

export type {
  AIWrapperProps,
  AITriggerButtonProps,
  AIResponseDisplayProps,
  AIResponseSkeletonProps,
  TypewriterTextProps,
} from './types';

export type { AIDisplayMode, AIConfig, AIProviderProps } from '../../lib/AIContext';

export default AIWrapper;
