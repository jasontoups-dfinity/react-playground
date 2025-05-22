import React, { useState } from 'react';
import type { StateInspectorProps, ComponentStateInfo } from './types';
import { cn } from '../../lib/utils';

// This is a placeholder implementation
// In a real implementation, we would need to use React DevTools-like techniques
// to track component state, which is beyond the scope of this example
const StateInspector: React.FC<StateInspectorProps> = ({ className }) => {
  // Mock data for demonstration
  const [components] = useState<ComponentStateInfo[]>([
    {
      id: '1',
      name: 'App',
      state: {},
      props: {},
      parent: null,
      children: ['2', '3', '4'],
    },
    {
      id: '2',
      name: 'Header',
      state: { isMenuOpen: false },
      props: { title: 'React Playground' },
      parent: '1',
      children: [],
    },
    {
      id: '3',
      name: 'Main',
      state: { count: 0 },
      props: {},
      parent: '1',
      children: [],
    },
    {
      id: '4',
      name: 'Footer',
      state: {},
      props: { copyright: '2025' },
      parent: '1',
      children: [],
    },
  ]);

  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  // Find the selected component
  const selected = selectedComponent ? components.find((c) => c.id === selectedComponent) : null;

  return (
    <div className={cn('flex flex-col h-full', className)}>
      <h3 className="text-sm font-medium mb-2">Component State</h3>
      <p className="text-xs text-muted-foreground mb-4">
        Select a component to view its state and props.
      </p>

      <div className="flex flex-1 gap-4">
        {/* Component Tree */}
        <div className="w-1/2 overflow-auto border border-border rounded-md">
          <div className="p-2 bg-muted/20 border-b border-border">
            <h4 className="text-xs font-medium">Component Tree</h4>
          </div>
          <ul className="p-2">
            {components.map((component) => (
              <li key={component.id} className="mb-1">
                <button
                  className={cn(
                    'text-xs py-1 px-2 w-full text-left rounded-sm',
                    selectedComponent === component.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  )}
                  onClick={() => setSelectedComponent(component.id)}>
                  {component.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* State and Props */}
        <div className="w-1/2 overflow-auto border border-border rounded-md">
          <div className="p-2 bg-muted/20 border-b border-border">
            <h4 className="text-xs font-medium">
              {selected ? `${selected.name} Details` : 'Select a component'}
            </h4>
          </div>
          {selected ? (
            <div className="p-2">
              {/* State */}
              <div className="mb-4">
                <h5 className="text-xs font-medium mb-1">State</h5>
                {Object.keys(selected.state).length > 0 ? (
                  <pre className="text-xs bg-muted/20 p-2 rounded-sm overflow-auto">
                    {JSON.stringify(selected.state, null, 2)}
                  </pre>
                ) : (
                  <p className="text-xs text-muted-foreground">No state</p>
                )}
              </div>

              {/* Props */}
              <div>
                <h5 className="text-xs font-medium mb-1">Props</h5>
                {Object.keys(selected.props).length > 0 ? (
                  <pre className="text-xs bg-muted/20 p-2 rounded-sm overflow-auto">
                    {JSON.stringify(selected.props, null, 2)}
                  </pre>
                ) : (
                  <p className="text-xs text-muted-foreground">No props</p>
                )}
              </div>
            </div>
          ) : (
            <p className="p-2 text-xs text-muted-foreground">
              Select a component from the tree to view its details
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 text-xs text-muted-foreground">
        <p>
          Note: This is a placeholder implementation. In a real implementation, we would need to
          track component state in real-time.
        </p>
      </div>
    </div>
  );
};

export default StateInspector;
