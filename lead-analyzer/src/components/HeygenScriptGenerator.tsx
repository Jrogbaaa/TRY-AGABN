import { useState, useCallback, useEffect } from 'react';
import { useData, Lead } from '../context/DataContext';
import { scriptTemplates } from '../utils/scriptTemplates';
import { generateHeygenScript } from '../utils/heygenTemplates';

type ContentFormat = 'ai-script' | 'podcast';

const HeygenScriptGenerator = () => {
  const { leads } = useData();
  const [format, setFormat] = useState<ContentFormat>('ai-script');
  const [leadName, setLeadName] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [availableLeads, setAvailableLeads] = useState<Lead[]>([]);
  const [podcastTopic, setPodcastTopic] = useState('lead generation strategies');
  const [podcastDuration, setPodcastDuration] = useState(15);

  // Update available leads for personalization
  useEffect(() => {
    setAvailableLeads(leads);
  }, [leads]);

  // Generate initial content when component mounts
  useEffect(() => {
    generateNewContent();
  }, [format]);

  // Generate new content based on current settings
  const generateNewContent = useCallback(() => {
    if (!leads || leads.length === 0) {
      setGeneratedContent('No lead data available for content generation.');
      return;
    }

    if (format === 'ai-script') {
      const content = generateHeygenScript(leads, leadName, 'ai-script');
      setGeneratedContent(content);
    } else {
      const content = generateHeygenScript(leads, leadName, 'podcast', {
        topic: podcastTopic,
        duration: podcastDuration
      });
      setGeneratedContent(content);
    }

    setIsCopied(false);
  }, [leads, format, leadName, podcastTopic, podcastDuration]);

  // Copy the generated content to clipboard
  const copyToClipboard = useCallback(async () => {
    if (!generatedContent) {
      return;
    }

    try {
      await navigator.clipboard.writeText(generatedContent);
      
      setIsCopied(true);
      
      // Reset the copied state after 3 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }, [generatedContent]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Heygen Content Generator</h2>
      
      {/* Format Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Select Content Format
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            onClick={() => setFormat('ai-script')}
            className={`px-4 py-3 rounded-md text-sm font-medium text-left ${
              format === 'ai-script'
                ? 'bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 dark:border-blue-700'
                : 'bg-gray-100 dark:bg-gray-700 border-2 border-transparent'
            }`}
            aria-label="Select AI-recommended script format"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setFormat('ai-script')}
          >
            <div className="font-semibold mb-1">AI-Recommended Script</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Generate a professionally crafted script based on lead analysis
            </div>
          </button>
          
          <button
            onClick={() => setFormat('podcast')}
            className={`px-4 py-3 rounded-md text-sm font-medium text-left ${
              format === 'podcast'
                ? 'bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 dark:border-blue-700'
                : 'bg-gray-100 dark:bg-gray-700 border-2 border-transparent'
            }`}
            aria-label="Select podcast format"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setFormat('podcast')}
          >
            <div className="font-semibold mb-1">Podcast Format</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Create a conversational podcast script with insights from lead data
            </div>
          </button>
        </div>
      </div>
      
      {/* Script Settings */}
      {format === 'ai-script' && (
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
              onClick={generateNewContent}
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-label="Generate content"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && generateNewContent()}
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
      
      {/* Podcast Settings */}
      {format === 'podcast' && (
        <div className="mb-6 space-y-4">
          <div>
            <label 
              htmlFor="podcast-topic"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Podcast Topic
            </label>
            <input
              type="text"
              id="podcast-topic"
              value={podcastTopic}
              onChange={(e) => setPodcastTopic(e.target.value)}
              className="focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2"
              placeholder="e.g., lead generation strategies"
              aria-label="Podcast topic"
            />
          </div>
          
          <div>
            <label 
              htmlFor="podcast-duration"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Podcast Duration (minutes)
            </label>
            <div className="flex items-center">
              <input
                type="range"
                id="podcast-duration"
                min="5"
                max="30"
                step="5"
                value={podcastDuration}
                onChange={(e) => setPodcastDuration(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                aria-label="Podcast duration"
              />
              <span className="ml-3 text-sm text-gray-700 dark:text-gray-300 min-w-[60px]">
                {podcastDuration} mins
              </span>
            </div>
          </div>
          
          <button
            type="button"
            onClick={generateNewContent}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            aria-label="Generate podcast content"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && generateNewContent()}
          >
            Generate Podcast Script
          </button>
        </div>
      )}
      
      {/* Generated Content Display */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {format === 'ai-script' ? 'Generated Script' : 'Podcast Script'}
          </label>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={generateNewContent}
              className="inline-flex items-center px-3 py-1 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-label="Regenerate content"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && generateNewContent()}
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
              aria-label="Copy content to clipboard"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && copyToClipboard()}
            >
              {isCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
        <div className="mt-1 relative">
          <textarea
            rows={16}
            readOnly
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md p-4"
            value={generatedContent}
            aria-label="Generated content"
          />
        </div>
      </div>
    </div>
  );
};

export default HeygenScriptGenerator; 