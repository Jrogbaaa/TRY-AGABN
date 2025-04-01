import { useState, useCallback, useEffect } from 'react';
import { useData, Lead } from '../context/DataContext';
import { generateHeygenScript } from '../utils/heygenTemplates';

type PodcastFormat = 'interview' | 'discussion' | 'debate';

const HeygenScriptGenerator = () => {
  const { leads } = useData();
  const [format, setFormat] = useState<PodcastFormat>('discussion');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [podcastTopic, setPodcastTopic] = useState('lead generation strategies');
  const [podcastDuration, setPodcastDuration] = useState(15);
  const [hostCount, setHostCount] = useState(2);

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

    const content = generateHeygenScript(leads, '', 'podcast', {
      topic: podcastTopic,
      duration: podcastDuration,
      format: format,
      hostCount: hostCount
    });
    
    setGeneratedContent(content);
    setIsCopied(false);
  }, [leads, format, podcastTopic, podcastDuration, hostCount]);

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
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Podcast Script Generator</h2>
      
      {/* Format Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Select Podcast Format
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => setFormat('interview')}
            className={`px-4 py-3 rounded-md text-sm font-medium text-left ${
              format === 'interview'
                ? 'bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 dark:border-blue-700'
                : 'bg-gray-100 dark:bg-gray-700 border-2 border-transparent'
            }`}
            aria-label="Select interview podcast format"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setFormat('interview')}
          >
            <div className="font-semibold mb-1">Interview Style</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              One host interviews an expert about lead data insights
            </div>
          </button>
          
          <button
            onClick={() => setFormat('discussion')}
            className={`px-4 py-3 rounded-md text-sm font-medium text-left ${
              format === 'discussion'
                ? 'bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 dark:border-blue-700'
                : 'bg-gray-100 dark:bg-gray-700 border-2 border-transparent'
            }`}
            aria-label="Select discussion podcast format"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setFormat('discussion')}
          >
            <div className="font-semibold mb-1">Discussion Format</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Multiple hosts discuss lead insights and strategies
            </div>
          </button>
          
          <button
            onClick={() => setFormat('debate')}
            className={`px-4 py-3 rounded-md text-sm font-medium text-left ${
              format === 'debate'
                ? 'bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 dark:border-blue-700'
                : 'bg-gray-100 dark:bg-gray-700 border-2 border-transparent'
            }`}
            aria-label="Select debate podcast format"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setFormat('debate')}
          >
            <div className="font-semibold mb-1">Debate Format</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Hosts present contrasting views on lead generation approaches
            </div>
          </button>
        </div>
      </div>
      
      {/* Podcast Settings */}
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          
          <div>
            <label 
              htmlFor="host-count"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Number of Hosts
            </label>
            <select
              id="host-count"
              value={hostCount}
              onChange={(e) => setHostCount(parseInt(e.target.value))}
              className="focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2"
              aria-label="Number of hosts"
            >
              <option value={2}>2 Hosts</option>
              <option value={3}>3 Hosts</option>
            </select>
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
      
      {/* Generated Content Display */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Generated Podcast Script
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
              className="inline-flex items-center px-3 py-1 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              aria-label="Copy to clipboard"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && copyToClipboard()}
            >
              {isCopied ? (
                <>
                  <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-8a2 2 0 00-2-2h-2.5"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2.5"></path>
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md border border-gray-200 dark:border-gray-700 overflow-y-auto h-[400px]">
          <pre className="whitespace-pre-wrap text-sm text-gray-600 dark:text-gray-300 font-mono">
            {generatedContent}
          </pre>
        </div>
      </div>
      
      {/* Tips for Heygen Podcast Creation */}
      <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 p-4 rounded-md">
        <h3 className="font-medium text-blue-800 dark:text-blue-300 text-sm mb-2">Tips for HeyGen Podcast Creation</h3>
        <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1 pl-4 list-disc">
          <li>Maintain a conversational tone between hosts for natural dialogue</li>
          <li>Include clear speaker labels for each line (HOST1, HOST2, etc.)</li>
          <li>Structure your podcast with intro, main segments, and conclusion</li>
          <li>Reference specific lead data insights to add credibility</li>
          <li>Create transitions between topics for a smooth listening experience</li>
          <li>Consider using different voices/avatars for each host in HeyGen</li>
        </ul>
      </div>
    </div>
  );
};

export default HeygenScriptGenerator; 