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
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-xl shadow-md overflow-hidden transition-all duration-300">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 to-purple-50/30 dark:from-indigo-950/20 dark:to-purple-950/20 opacity-70"></div>
        <div className="relative p-6">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-6">
            Data Input
          </h2>
          
          {/* Upload Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Select Input Method
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setUploadType('csv')}
                className={`relative px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  uploadType === 'csv'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : 'bg-gray-100 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                aria-label="Select CSV upload"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setUploadType('csv')}
              >
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  CSV File
                </span>
                {uploadType === 'csv' && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white dark:bg-indigo-400 rounded-full"></span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setUploadType('json')}
                className={`relative px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  uploadType === 'json'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : 'bg-gray-100 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                aria-label="Select JSON upload"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setUploadType('json')}
              >
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  JSON File
                </span>
                {uploadType === 'json' && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white dark:bg-indigo-400 rounded-full"></span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setUploadType('demo')}
                className={`relative px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  uploadType === 'demo'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : 'bg-gray-100 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                aria-label="Select demo data generation"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setUploadType('demo')}
              >
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1"></path>
                  </svg>
                  Generate Demo Data
                </span>
                {uploadType === 'demo' && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white dark:bg-indigo-400 rounded-full"></span>
                )}
              </button>
            </div>
          </div>

          {/* File Upload Section */}
          {(uploadType === 'csv' || uploadType === 'json') && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Upload {uploadType.toUpperCase()} File
              </label>
              <div className="mt-2 flex justify-center px-6 pt-8 pb-9 border-2 border-dashed border-indigo-200 dark:border-indigo-800/40 rounded-xl bg-indigo-50/50 dark:bg-indigo-900/10 transition-all duration-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 group">
                <div className="space-y-2 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-indigo-400 dark:text-indigo-500 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors duration-200"
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
                  <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 focus-within:outline-none transition-colors duration-200"
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
              <div className="mt-2 flex items-center">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                  <input
                    type="number"
                    id="demo-count"
                    name="demo-count"
                    min="5"
                    max="100"
                    value={demoCount}
                    onChange={(e) => setDemoCount(parseInt(e.target.value) || 25)}
                    className="pl-10 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700/60 dark:text-white rounded-lg p-3 transition-colors duration-200"
                    aria-label="Number of demo leads to generate"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleDemoData}
                  disabled={isLoading}
                  className="ml-3 inline-flex items-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  aria-label="Generate demo data"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleDemoData()}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  Generate
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 flex items-center">
                <svg className="w-4 h-4 mr-1 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Creates random leads for demonstration purposes.
              </p>
            </div>
          )}

          {/* Status Messages */}
          {error && (
            <div className="mb-4 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/30 flex items-start">
              <svg className="h-5 w-5 text-red-500 dark:text-red-400 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/30 flex items-start">
              <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p className="text-sm text-green-700 dark:text-green-300">{success}</p>
            </div>
          )}

          {isLoading && (
            <div className="flex justify-center items-center py-6">
              <div className="relative">
                <div className="w-12 h-12 rounded-full absolute border-4 border-solid border-gray-200 dark:border-gray-700"></div>
                <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-indigo-500 dark:border-indigo-400 border-t-transparent"></div>
              </div>
              <span className="ml-4 text-gray-700 dark:text-gray-300 font-medium">Processing data...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataUploader; 