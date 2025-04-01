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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Script Generator</h2>
      
      {/* Template Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Select Script Template
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {availableTemplates.map(template => (
            <button
              key={template.id}
              onClick={() => selectTemplate(template.id)}
              className={`px-4 py-3 rounded-md text-sm font-medium text-left ${
                selectedTemplateId === template.id
                  ? 'bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 dark:border-blue-700'
                  : 'bg-gray-100 dark:bg-gray-700 border-2 border-transparent'
              }`}
              aria-label={`Select ${template.name} template`}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && selectTemplate(template.id)}
            >
              <div className="font-semibold mb-1">{template.name}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {template.description}
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Lead Selection for Personalized Template */}
      {selectedTemplateId === 'personalized' && (
        <div className="mb-6">
          <label 
            htmlFor="lead-name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Lead Name for Personalization
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              id="lead-name"
              name="lead-name"
              value={leadName}
              onChange={(e) => setLeadName(e.target.value)}
              className="focus:ring-blue-500 focus:border-blue-500 flex-grow block w-full min-w-0 rounded-md sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2"
              placeholder="Enter lead name..."
              aria-label="Enter lead name for personalized script"
            />
            <button
              type="button"
              onClick={generateNewScript}
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-label="Generate personalized script"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && generateNewScript()}
            >
              Update
            </button>
          </div>
          {availableLeads.length > 0 && (
            <div className="mt-2">
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                Available Leads:
              </label>
              <div className="flex flex-wrap gap-2">
                {availableLeads.slice(0, 5).map((lead) => (
                  <button
                    key={lead.id}
                    type="button"
                    onClick={() => setLeadName(lead.name)}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800"
                    aria-label={`Select ${lead.name}`}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setLeadName(lead.name)}
                  >
                    {lead.name}
                  </button>
                ))}
                {availableLeads.length > 5 && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
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
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Generated Script
          </label>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={generateNewScript}
              className="inline-flex items-center px-3 py-1 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-label="Regenerate script"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && generateNewScript()}
            >
              Regenerate
            </button>
            <button
              type="button"
              onClick={copyToClipboard}
              className={`inline-flex items-center px-3 py-1 border border-transparent rounded-md shadow-sm text-xs font-medium ${
                isCopied 
                  ? 'text-white bg-green-600 hover:bg-green-700 focus:ring-green-500' 
                  : 'text-white bg-gray-600 hover:bg-gray-700 focus:ring-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-offset-2`}
              aria-label="Copy script to clipboard"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && copyToClipboard()}
            >
              {isCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
        <div className="mt-1 relative">
          <textarea
            rows={12}
            readOnly
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md p-4"
            value={generatedScript}
            aria-label="Generated script content"
          />
        </div>
      </div>
      
      {/* Heygen Integration Instructions */}
      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-900 rounded-md">
        <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-3">Heygen Integration</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <li>Copy the generated script using the button above.</li>
          <li>Login to your <a href="https://www.heygen.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Heygen account</a>.</li>
          <li>Create a new video project and select your preferred avatar.</li>
          <li>Paste the script into Heygen's script input field.</li>
          <li>Customize voice, tone, and visual elements as needed.</li>
          <li>Generate and download your personalized lead outreach video.</li>
        </ol>
        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 rounded-md">
          <p className="text-xs text-yellow-700 dark:text-yellow-300">
            <strong>Note:</strong> Always review the generated script before creating your video to ensure accuracy and appropriate tone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScriptGenerator; 