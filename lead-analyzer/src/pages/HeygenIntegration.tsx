import { useState } from 'react';
import { useData } from '../context/DataContext';
import HeygenScriptGenerator from '../components/HeygenScriptGenerator';

const HeygenIntegration = () => {
  const { leads } = useData();

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

      {/* Heygen Tools Links Section */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Heygen Tools</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a 
            href="https://labs.heygen.com/video-podcast" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:from-opacity-30 dark:to-indigo-900 dark:to-opacity-20 rounded-lg border border-blue-100 dark:border-blue-800 hover:shadow-md transition-shadow"
            aria-label="Open HeyGen's AI podcast creation tool"
            tabIndex={0}
          >
            <svg className="h-16 w-16 text-blue-600 dark:text-blue-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI Podcast Creation</h3>
            <p className="text-center text-gray-600 dark:text-gray-300 text-sm mb-4">
              Create professional AI-powered podcasts with natural-sounding conversations between multiple hosts
            </p>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              labs.heygen.com/video-podcast
            </span>
          </a>
          
          <a 
            href="https://www.heygen.com/studio" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:from-opacity-30 dark:to-pink-900 dark:to-opacity-20 rounded-lg border border-purple-100 dark:border-purple-800 hover:shadow-md transition-shadow"
            aria-label="Open HeyGen Studio"
            tabIndex={0}
          >
            <svg className="h-16 w-16 text-purple-600 dark:text-purple-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Heygen Studio</h3>
            <p className="text-center text-gray-600 dark:text-gray-300 text-sm mb-4">
              Create personalized videos with AI avatars using scripts generated from your lead data
            </p>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              heygen.com/studio
            </span>
          </a>
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
                <li>Select a podcast format for your content</li>
                <li>Customize your script content as needed</li>
                <li>Copy the generated content using the copy button</li>
                <li>Visit <a href="https://labs.heygen.com/video-podcast" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">HeyGen Video Podcast</a> or <a href="https://www.heygen.com/studio" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Heygen Studio</a></li>
                <li>Paste your script into Heygen's script editor</li>
                <li>Select your preferred avatars and customize settings</li>
                <li>Generate and download your lead engagement video or podcast</li>
              </ol>
              
              <div className="mt-6 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 p-4 rounded-md">
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  <strong>Pro Tip:</strong> For the most engaging podcast-style content, create a dynamic conversation between two hosts discussing insights from your lead data and presenting solutions to common pain points.
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