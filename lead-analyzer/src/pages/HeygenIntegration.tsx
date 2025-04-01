import { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import HeygenScriptGenerator from '../components/HeygenScriptGenerator';

const HeygenIntegration = () => {
  const { leads } = useData();
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const apiKey = "MTAwYzgyZGNlMmE5NGZjNjk2MTIzZmRiMzhmYWUxODItMTczMzE0MDU4Nw==";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Heygen Integration</h1>
        {leads.length > 0 && (
          <div className="bg-blue-100 dark:bg-blue-900 dark:bg-opacity-30 px-4 py-2 rounded-full">
            <span className="text-blue-800 dark:text-blue-200 font-medium">
              Using data from {leads.length} leads
            </span>
          </div>
        )}
      </div>

      {/* API Key Section */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Heygen API Configuration</h2>
        
        <div className="flex items-center space-x-3 mb-6">
          <div className="flex-grow">
            <label htmlFor="api-key" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              API Key
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type={apiKeyVisible ? "text" : "password"}
                id="api-key"
                value={apiKey}
                readOnly
                className="focus:ring-blue-500 focus:border-blue-500 flex-grow block w-full min-w-0 rounded-l-md sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2"
                aria-label="Heygen API Key"
              />
              <button
                type="button"
                onClick={() => setApiKeyVisible(!apiKeyVisible)}
                className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-md bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-300 sm:text-sm"
                aria-label={apiKeyVisible ? "Hide API key" : "Show API key"}
                tabIndex={0}
              >
                {apiKeyVisible ? (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                )}
              </button>
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              This API key is used to connect with the Heygen platform.
            </p>
          </div>
          <div>
            <a
              href="https://www.heygen.com/settings/api"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-label="Manage API keys on Heygen"
              tabIndex={0}
            >
              Manage Keys
            </a>
          </div>
        </div>
      </div>

      {/* No data state */}
      {!leads || leads.length === 0 ? (
        <div className="card p-8 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Lead Data Available</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            To generate Heygen content, you need to first upload lead data or generate demo data from the Data Input page.
          </p>
          <a 
            href="/data-input" 
            className="btn-primary"
            aria-label="Go to data input page"
            tabIndex={0}
          >
            Go to Data Input
          </a>
        </div>
      ) : (
        <>
          {/* Heygen Script Generator Component */}
          <HeygenScriptGenerator />

          {/* Heygen Quick Guide */}
          <div className="card p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Heygen Integration Guide</h2>
            
            <div className="prose dark:prose-invert max-w-none">
              <p>
                <a href="https://www.heygen.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Heygen</a> is an AI-powered video generation platform that allows you to create professional-looking videos with virtual avatars.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">Integration Steps</h3>
              
              <ol className="list-decimal pl-6 space-y-2">
                <li>Select a format above (AI-recommended script or Podcast format)</li>
                <li>Customize your script and content as needed</li>
                <li>Copy the generated content using the copy button</li>
                <li>Visit <a href="https://www.heygen.com/studio" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Heygen Studio</a> and create a new project</li>
                <li>Paste your script into Heygen's script editor</li>
                <li>Select your preferred avatar and customize settings</li>
                <li>Generate and download your lead engagement video</li>
              </ol>
              
              <div className="mt-6 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 p-4 rounded-md">
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  <strong>Pro Tip:</strong> For best results, review and edit the AI-generated script to ensure it matches your brand voice and tone before creating your video.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HeygenIntegration; 