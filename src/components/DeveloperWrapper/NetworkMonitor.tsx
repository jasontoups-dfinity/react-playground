import React, { useState } from 'react';
import type { NetworkMonitorProps } from './types';
import { cn } from '../../lib/utils';

const NetworkMonitor: React.FC<NetworkMonitorProps> = ({ className }) => {
  // Mock network requests data
  const [requests] = useState([
    {
      id: '1',
      url: 'https://api.example.com/users',
      method: 'GET',
      status: 200,
      time: '120ms',
      size: '1.2KB',
      timestamp: new Date().toISOString(),
    },
    {
      id: '2',
      url: 'https://api.example.com/posts',
      method: 'POST',
      status: 201,
      time: '150ms',
      size: '0.8KB',
      timestamp: new Date(Date.now() - 5000).toISOString(),
    },
    {
      id: '3',
      url: 'https://api.example.com/comments',
      method: 'GET',
      status: 200,
      time: '80ms',
      size: '3.4KB',
      timestamp: new Date(Date.now() - 10000).toISOString(),
    },
    {
      id: '4',
      url: 'https://api.example.com/auth',
      method: 'POST',
      status: 401,
      time: '95ms',
      size: '0.3KB',
      timestamp: new Date(Date.now() - 15000).toISOString(),
    },
  ]);

  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);

  // Find the selected request
  const selected = selectedRequest
    ? requests.find((request) => request.id === selectedRequest)
    : null;

  return (
    <div className={cn('flex flex-col h-full', className)}>
      <h3 className="text-sm font-medium mb-2">Network Monitor</h3>
      <p className="text-xs text-muted-foreground mb-4">Monitor network requests and responses.</p>

      <div className="flex flex-1 gap-4">
        {/* Request List */}
        <div className="w-full overflow-auto border border-border rounded-md">
          <div className="p-2 bg-muted/20 border-b border-border sticky top-0">
            <h4 className="text-xs font-medium">Requests</h4>
          </div>
          <table className="w-full text-xs">
            <thead className="bg-muted/10">
              <tr className="border-b border-border">
                <th className="text-left p-2">URL</th>
                <th className="text-center p-2">Method</th>
                <th className="text-center p-2">Status</th>
                <th className="text-right p-2">Time</th>
                <th className="text-right p-2">Size</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr
                  key={request.id}
                  className={cn(
                    'border-b border-border/50 cursor-pointer hover:bg-muted/10',
                    selectedRequest === request.id && 'bg-primary/10'
                  )}
                  onClick={() => setSelectedRequest(request.id)}>
                  <td className="p-2 truncate max-w-[200px]">{request.url}</td>
                  <td className="text-center p-2">
                    <span
                      className={cn(
                        'px-2 py-0.5 rounded-full text-xs',
                        request.method === 'GET' &&
                          'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
                        request.method === 'POST' &&
                          'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
                        request.method === 'PUT' &&
                          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
                        request.method === 'DELETE' &&
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      )}>
                      {request.method}
                    </span>
                  </td>
                  <td className="text-center p-2">
                    <span
                      className={cn(
                        'px-2 py-0.5 rounded-full text-xs',
                        request.status >= 200 &&
                          request.status < 300 &&
                          'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
                        request.status >= 300 &&
                          request.status < 400 &&
                          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
                        request.status >= 400 &&
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      )}>
                      {request.status}
                    </span>
                  </td>
                  <td className="text-right p-2">{request.time}</td>
                  <td className="text-right p-2">{request.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Request Details */}
      {selected && (
        <div className="mt-4 border border-border rounded-md">
          <div className="p-2 bg-muted/20 border-b border-border">
            <h4 className="text-xs font-medium">Request Details</h4>
          </div>
          <div className="p-4 grid grid-cols-2 gap-4 text-xs">
            <div>
              <h5 className="font-medium mb-1">URL</h5>
              <p className="break-all bg-muted/10 p-2 rounded-sm">{selected.url}</p>
            </div>
            <div>
              <h5 className="font-medium mb-1">Method</h5>
              <p>{selected.method}</p>
            </div>
            <div>
              <h5 className="font-medium mb-1">Status</h5>
              <p>{selected.status}</p>
            </div>
            <div>
              <h5 className="font-medium mb-1">Time</h5>
              <p>{selected.time}</p>
            </div>
            <div>
              <h5 className="font-medium mb-1">Size</h5>
              <p>{selected.size}</p>
            </div>
            <div>
              <h5 className="font-medium mb-1">Timestamp</h5>
              <p>{new Date(selected.timestamp).toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 text-xs text-muted-foreground">
        <p>
          Note: This is a placeholder implementation. In a real implementation, we would need to
          intercept and track actual network requests.
        </p>
      </div>
    </div>
  );
};

export default NetworkMonitor;
