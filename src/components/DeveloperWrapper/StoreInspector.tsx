import React, { useState } from 'react';
import type { StoreInspectorProps } from './types';
import { cn } from '../../lib/utils';

const StoreInspector: React.FC<StoreInspectorProps> = ({ stores, className }) => {
  const storeNames = Object.keys(stores);
  const [selectedStore, setSelectedStore] = useState<string | null>(
    storeNames.length > 0 ? storeNames[0] : null
  );

  // Get the selected store data
  const storeData = selectedStore ? stores[selectedStore] : null;

  return (
    <div className={cn('flex flex-col h-full', className)}>
      <h3 className="text-sm font-medium mb-2">Store Inspector</h3>
      <p className="text-xs text-muted-foreground mb-4">
        {storeNames.length > 0
          ? 'Select a store to view its state.'
          : 'No stores have been registered.'}
      </p>

      {storeNames.length > 0 ? (
        <div className="flex flex-1 gap-4">
          {/* Store List */}
          <div className="w-1/3 overflow-auto border border-border rounded-md">
            <div className="p-2 bg-muted/20 border-b border-border">
              <h4 className="text-xs font-medium">Stores</h4>
            </div>
            <ul className="p-2">
              {storeNames.map((name) => (
                <li key={name} className="mb-1">
                  <button
                    className={cn(
                      'text-xs py-1 px-2 w-full text-left rounded-sm',
                      selectedStore === name
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    )}
                    onClick={() => setSelectedStore(name)}>
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Store State */}
          <div className="w-2/3 overflow-auto border border-border rounded-md">
            <div className="p-2 bg-muted/20 border-b border-border">
              <h4 className="text-xs font-medium">
                {selectedStore ? `${selectedStore} State` : 'Select a store'}
              </h4>
            </div>
            {storeData ? (
              <div className="p-2">
                <pre className="text-xs bg-muted/20 p-2 rounded-sm overflow-auto">
                  {JSON.stringify(storeData, null, 2)}
                </pre>
              </div>
            ) : (
              <p className="p-2 text-xs text-muted-foreground">
                Select a store from the list to view its state
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center border border-border rounded-md p-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">No stores registered</p>
            <p className="text-xs text-muted-foreground">
              Register stores using the DeveloperProvider:
              <br />
              <code className="bg-muted/20 px-1 py-0.5 rounded-sm text-xs">
                {'<DeveloperProvider stores={{ redux: store, zustand: useStore }}>'}
              </code>
            </p>
          </div>
        </div>
      )}

      <div className="mt-4 text-xs text-muted-foreground">
        <p>
          Tip: For Redux stores, you can use the Redux DevTools Extension for more advanced
          debugging features.
        </p>
      </div>
    </div>
  );
};

export default StoreInspector;
