import { useState, useRef, ChangeEvent } from 'react';
import { useData, Lead } from '../context/DataContext';
import { processCSVData, processJSONData, generateMockData } from '../utils/dataProcessors';

const DataUploader = () => {
  const { uploadLeads, isLoading } = useData();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [uploadType, setUploadType] = useState<'csv' | 'json' | 'demo'>('csv');
  const [demoCount, setDemoCount] = useState<number>(25);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setSuccess(null);

    try {
      let leadsData: Lead[] = [];

      if (uploadType === 'csv') {
        const text = await file.text();
        leadsData = processCSVData(text);
      } else if (uploadType === 'json') {
        const text = await file.text();
        const jsonData = JSON.parse(text);
        leadsData = processJSONData(jsonData);
      }

      if (leadsData.length === 0) {
        setError('No valid lead data found in the file.');
        return;
      }

      uploadLeads(leadsData);
      setSuccess(`Successfully loaded ${leadsData.length} leads.`);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError(`Error processing file: ${(err as Error).message}`);
      console.error('Upload error:', err);
    }
  };

  // Load demo data
  const handleDemoData = () => {
    setError(null);
    setSuccess(null);

    try {
      const mockData = generateMockData(demoCount);
      uploadLeads(mockData);
      setSuccess(`Successfully generated ${mockData.length} mock leads.`);
    } catch (err) {
      setError(`Error generating demo data: ${(err as Error).message}`);
      console.error('Demo data error:', err);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Data Input</h2>
      
      {/* Upload Type Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Select Input Method
        </label>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setUploadType('csv')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              uploadType === 'csv'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
            }`}
            aria-label="Select CSV upload"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setUploadType('csv')}
          >
            CSV File
          </button>
          <button
            type="button"
            onClick={() => setUploadType('json')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              uploadType === 'json'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
            }`}
            aria-label="Select JSON upload"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setUploadType('json')}
          >
            JSON File
          </button>
          <button
            type="button"
            onClick={() => setUploadType('demo')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              uploadType === 'demo'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
            }`}
            aria-label="Select demo data generation"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setUploadType('demo')}
          >
            Generate Demo Data
          </button>
        </div>
      </div>

      {/* File Upload Section */}
      {(uploadType === 'csv' || uploadType === 'json') && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Upload {uploadType.toUpperCase()} File
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600 dark:text-gray-400">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 dark:text-blue-500 hover:text-blue-500 focus-within:outline-none"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept={uploadType === 'csv' ? '.csv' : '.json'}
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    disabled={isLoading}
                    aria-label={`Upload ${uploadType.toUpperCase()} file`}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {uploadType === 'csv' ? 'CSV' : 'JSON'} file up to 10MB
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Demo Data Generation Section */}
      {uploadType === 'demo' && (
        <div className="mb-6">
          <label
            htmlFor="demo-count"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Number of Demo Leads
          </label>
          <div className="mt-1 flex items-center">
            <input
              type="number"
              id="demo-count"
              name="demo-count"
              min="5"
              max="100"
              value={demoCount}
              onChange={(e) => setDemoCount(parseInt(e.target.value) || 25)}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md p-2"
              aria-label="Number of demo leads to generate"
            />
            <button
              type="button"
              onClick={handleDemoData}
              disabled={isLoading}
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Generate demo data"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleDemoData()}
            >
              Generate
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Creates random leads for demonstration purposes.
          </p>
        </div>
      )}

      {/* Status Messages */}
      {error && (
        <div className="mb-4 p-3 rounded-md bg-red-50 dark:bg-red-900 dark:bg-opacity-20">
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 rounded-md bg-green-50 dark:bg-green-900 dark:bg-opacity-20">
          <p className="text-sm text-green-700 dark:text-green-300">{success}</p>
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center items-center py-4">
          <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="ml-2 text-gray-700 dark:text-gray-300">Loading data...</span>
        </div>
      )}
    </div>
  );
};

export default DataUploader; 