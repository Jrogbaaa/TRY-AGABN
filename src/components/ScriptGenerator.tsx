import { useState, useEffect } from 'react';
import { useData, Lead } from '../context/DataContext';
import { useScriptGeneration } from '../hooks/useScriptGeneration';

const ScriptGenerator = () => {
  const { leads } = useData();
  const {
    selectedTemplateId,
    leadName,
    generatedScript,
    isCopied,
    availableTemplates,
    selectTemplate,
    setLeadName,
    generateNewScript,
    copyToClipboard
  } = useScriptGeneration(leads);

  const [availableLeads, setAvailableLeads] = useState<Lead[]>([]);

  // Update available leads for personalization
  useEffect(() => {
    if (selectedTemplateId === 'personalized') {
      setAvailableLeads(leads);
    }
  }, [leads, selectedTemplateId]);

  // Generate initial script when component mounts or template changes
  useEffect(() => {
    generateNewScript();
  }, [selectedTemplateId, generateNewScript]);

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-xl shadow-md overflow-hidden transition-all duration-300">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 to-purple-50/30 dark:from-indigo-950/20 dark:to-purple-950/20 opacity-70"></div>
        <div className="relative p-6">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-6">
            Script Generator
          </h2>
          
          {/* Template Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Select Script Template
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableTemplates.map(template => (
                <div
                  key={template.id}
                  onClick={() => selectTemplate(template.id)}
                  className={`relative px-5 py-4 rounded-lg text-sm transition-all duration-200 cursor-pointer ${
                    selectedTemplateId === template.id
                      ? 'bg-indigo-50 dark:bg-indigo-900/30 border-2 border-indigo-500 dark:border-indigo-700 shadow-md transform -translate-y-0.5'
                      : 'bg-white/50 dark:bg-gray-800/50 border-2 border-transparent hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 hover:shadow-sm hover:-translate-y-0.5'
                  }`}
                  aria-label={`Select ${template.name} template`}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && selectTemplate(template.id)}
                >
                  {selectedTemplateId === template.id && (
                    <div className="absolute top-3 right-3">
                      <svg className="w-5 h-5 text-indigo-500 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  <div className="font-bold text-gray-900 dark:text-white mb-1.5">{template.name}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {template.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Lead Selection for Personalized Template */}
          {selectedTemplateId === 'personalized' && (
            <div className="mb-6 bg-indigo-50/50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800/30">
              <label 
                htmlFor="lead-name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Lead Name for Personalization
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="lead-name"
                    name="lead-name"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    className="pl-10 focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700/60 dark:text-white p-2.5 transition-colors duration-200"
                    placeholder="Enter lead name..."
                    aria-label="Enter lead name for personalized script"
                  />
                </div>
                <button
                  type="button"
                  onClick={generateNewScript}
                  className="ml-3 inline-flex items-center px-4 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                  aria-label="Generate personalized script"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && generateNewScript()}
                >
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  Update
                </button>
              </div>
              {availableLeads.length > 0 && (
                <div className="mt-3 bg-white/60 dark:bg-gray-800/60 p-3 rounded-lg shadow-sm">
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Available Leads:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableLeads.slice(0, 5).map((lead) => (
                      <button
                        key={lead.id}
                        type="button"
                        onClick={() => setLeadName(lead.name)}
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-200 hover:bg-indigo-200 dark:hover:bg-indigo-800/60 transition-colors duration-200"
                        aria-label={`Select ${lead.name}`}
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && setLeadName(lead.name)}
                      >
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        {lead.name}
                      </button>
                    ))}
                    {availableLeads.length > 5 && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                        +{availableLeads.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Generated Script Display */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Generated Script
              </label>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={generateNewScript}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-lg shadow-sm text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                  aria-label="Regenerate script"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && generateNewScript()}
                >
                  <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  Regenerate
                </button>
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className={`inline-flex items-center px-3 py-1.5 border border-transparent rounded-lg shadow-sm text-xs font-medium transition-colors duration-200 ${
                    isCopied 
                      ? 'text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500' 
                      : 'text-white bg-gray-600 hover:bg-gray-700 focus:ring-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2`}
                  aria-label="Copy script to clipboard"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && copyToClipboard()}
                >
                  <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                  </svg>
                  {isCopied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
            <div className="mt-1 relative">
              <textarea
                rows={12}
                readOnly
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700/60 dark:text-white rounded-lg p-4 transition-colors duration-200"
                value={generatedScript}
                aria-label="Generated script content"
              />
              {isCopied && (
                <div className="absolute top-2 right-2 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 text-xs font-medium px-2 py-1 rounded-md shadow-sm animate-fade-out">
                  Copied to clipboard!
                </div>
              )}
            </div>
          </div>
          
          {/* Heygen Integration Instructions */}
          <div className="p-5 bg-indigo-50/70 dark:bg-indigo-900/10 rounded-xl shadow-sm border border-indigo-100 dark:border-indigo-800/20 transition-all duration-200">
            <div className="flex items-center mb-3">
              <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <h3 className="text-md font-bold text-gray-800 dark:text-white">Heygen Integration</h3>
            </div>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-300 ml-1">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-5 h-5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 rounded-full text-xs font-bold mr-2 flex-shrink-0 mt-0.5">1</span>
                <span>Copy the generated script using the button above.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-5 h-5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 rounded-full text-xs font-bold mr-2 flex-shrink-0 mt-0.5">2</span>
                <span>Login to your <a href="https://www.heygen.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors duration-200">Heygen account</a>.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-5 h-5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 rounded-full text-xs font-bold mr-2 flex-shrink-0 mt-0.5">3</span>
                <span>Create a new video project and select your preferred avatar.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-5 h-5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 rounded-full text-xs font-bold mr-2 flex-shrink-0 mt-0.5">4</span>
                <span>Paste the script into Heygen's script input field.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-5 h-5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 rounded-full text-xs font-bold mr-2 flex-shrink-0 mt-0.5">5</span>
                <span>Customize voice, tone, and visual elements as needed.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-5 h-5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 rounded-full text-xs font-bold mr-2 flex-shrink-0 mt-0.5">6</span>
                <span>Generate and download your personalized lead outreach video.</span>
              </li>
            </ol>
            <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-800/30 flex items-start">
              <svg className="w-5 h-5 text-amber-500 dark:text-amber-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p className="text-xs text-amber-700 dark:text-amber-300">
                <span className="font-bold">Note:</span> Always review the generated script before creating your video to ensure accuracy and appropriate tone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptGenerator; 