import { useData } from '../context/DataContext';
import ScriptGenerator from '../components/ScriptGenerator';

const ScriptOutput = () => {
  const { leads } = useData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Script Generator</h1>
        {leads.length > 0 && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Using data from {leads.length} leads
          </div>
        )}
      </div>

      {/* No data state */}
      {!leads || leads.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Lead Data Available</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            To generate scripts for Heygen, you need to first upload lead data or generate demo data from the Data Input page.
          </p>
          <a 
            href="/data-input" 
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            aria-label="Go to data input page"
            tabIndex={0}
          >
            Go to Data Input
          </a>
        </div>
      ) : (
        <>
          {/* Script Generator Component */}
          <ScriptGenerator />

          {/* Heygen Info */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About Heygen</h2>
            
            <div className="prose dark:prose-invert max-w-none">
              <p>
                <a href="https://www.heygen.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Heygen</a> is an AI-powered video generation platform that allows you to create professional-looking videos with virtual avatars.
              </p>
              
              <p>
                By combining our lead analysis with Heygen's video generation capabilities, you can create personalized outreach videos that address your leads' specific needs and pain points, significantly improving engagement rates.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">Key Benefits</h3>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>Create personalized videos for high-value leads at scale</li>
                <li>Generate videos based on lead source, status, and other attributes</li>
                <li>Save time on video script writing with our AI-generated templates</li>
                <li>Improve conversion rates with personalized video communication</li>
                <li>Maintain consistent messaging across your team</li>
              </ul>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">Getting Started with Heygen</h3>
              
              <ol className="list-decimal pl-6 space-y-2">
                <li>Sign up for a <a href="https://www.heygen.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Heygen account</a> if you don't already have one</li>
                <li>Generate scripts using our templates based on your lead data</li>
                <li>Copy the generated script and paste it into Heygen's script editor</li>
                <li>Select an avatar and customize voice settings in Heygen</li>
                <li>Generate the video and download or share it with your leads</li>
              </ol>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ScriptOutput; 