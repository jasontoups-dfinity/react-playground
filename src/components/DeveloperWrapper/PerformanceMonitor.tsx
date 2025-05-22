import React from 'react';
import type { PerformanceMonitorProps } from './types';
import { cn } from '../../lib/utils';

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ className }) => {
  // Mock performance data
  const performanceData = {
    renderTime: '15ms',
    componentRenders: [
      { name: 'App', renders: 1, time: '5ms' },
      { name: 'Header', renders: 2, time: '3ms' },
      { name: 'Main', renders: 3, time: '4ms' },
      { name: 'Footer', renders: 1, time: '2ms' },
    ],
    memoryUsage: '24MB',
  };

  return (
    <div className={cn('flex flex-col h-full', className)}>
      <h3 className="text-sm font-medium mb-2">Performance Monitor</h3>
      <p className="text-xs text-muted-foreground mb-4">
        Monitor component render times and memory usage.
      </p>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-muted/20 p-3 rounded-md">
          <h4 className="text-xs font-medium mb-1">Total Render Time</h4>
          <p className="text-lg font-bold">{performanceData.renderTime}</p>
        </div>
        <div className="bg-muted/20 p-3 rounded-md">
          <h4 className="text-xs font-medium mb-1">Component Renders</h4>
          <p className="text-lg font-bold">{performanceData.componentRenders.length}</p>
        </div>
        <div className="bg-muted/20 p-3 rounded-md">
          <h4 className="text-xs font-medium mb-1">Memory Usage</h4>
          <p className="text-lg font-bold">{performanceData.memoryUsage}</p>
        </div>
      </div>

      <div className="flex-1 overflow-auto border border-border rounded-md">
        <div className="p-2 bg-muted/20 border-b border-border sticky top-0">
          <h4 className="text-xs font-medium">Component Render Times</h4>
        </div>
        <table className="w-full text-xs">
          <thead className="bg-muted/10">
            <tr className="border-b border-border">
              <th className="text-left p-2">Component</th>
              <th className="text-right p-2">Renders</th>
              <th className="text-right p-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {performanceData.componentRenders.map((component, index) => (
              <tr
                key={index}
                className={cn('border-b border-border/50', index % 2 === 0 && 'bg-muted/5')}>
                <td className="p-2">{component.name}</td>
                <td className="text-right p-2">{component.renders}</td>
                <td className="text-right p-2">{component.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-xs text-muted-foreground">
        <p>
          Note: This is a placeholder implementation. In a real implementation, we would need to
          track component render times using the React Profiler API.
        </p>
      </div>
    </div>
  );
};

export default PerformanceMonitor;
