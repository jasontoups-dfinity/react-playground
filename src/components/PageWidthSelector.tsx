import React from 'react';
import { usePageWidth } from '../lib/PageWidthContext';
import type { PageWidthPreset } from '../lib/PageWidthContext';

const PageWidthSelector: React.FC = () => {
  const { widthPreset, setWidthPreset } = usePageWidth();

  // Display names for the dropdown
  const presetLabels: Record<PageWidthPreset, string> = {
    'full-width': 'Full Width',
    desktop: 'Desktop (1152px)',
    tablet: 'Tablet (768px)',
    mobile: 'Mobile (384px)',
  };

  return (
    <div className="flex items-center mr-4">
      <span className="mr-2 text-sm">Layout</span>
      <select
        value={widthPreset}
        onChange={(e) => setWidthPreset(e.target.value as PageWidthPreset)}
        className="bg-secondary text-secondary-foreground rounded-md px-2 py-1 text-sm border-border"
        aria-label="Select page width">
        {(Object.keys(presetLabels) as PageWidthPreset[]).map((preset) => (
          <option key={preset} value={preset}>
            {presetLabels[preset]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PageWidthSelector;
