import { useData } from '../context/DataContext';
import DataUploader from '../components/DataUploader';

const DataInput = () => {
  const { leads } = useData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Data Input</h1>
        {leads.length > 0 && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Current dataset: {leads.length} leads
          </div>
        )}
      </div>

      {/* Data Uploader Component */}
      <DataUploader />

      {/* Format Instructions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Data Format Guidelines</h2>
        
        <div className="space-y-6">
          {/* CSV Format */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">CSV Format</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              Your CSV file should have the following headers:
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md overflow-x-auto">
              <code className="text-sm text-gray-800 dark:text-gray-200 whitespace-nowrap">
                id,name,email,source,initialContact,status,tags,conversionProbability,estimatedValue,interactionHistory
              </code>
            </div>
            <ul className="mt-3 text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
              <li><strong>id</strong>: Unique identifier for the lead</li>
              <li><strong>name</strong>: Lead's full name</li>
              <li><strong>email</strong>: Lead's email address</li>
              <li><strong>source</strong>: Where the lead came from (e.g., LinkedIn, Website)</li>
              <li><strong>initialContact</strong>: ISO date format (YYYY-MM-DDTHH:MM:SSZ)</li>
              <li><strong>status</strong>: Current status (e.g., New, Contacted, Qualified, Converted)</li>
              <li><strong>tags</strong>: Semicolon-separated list of tags (e.g., "enterprise;high-value;marketing")</li>
              <li><strong>conversionProbability</strong>: Number between 0 and 1</li>
              <li><strong>estimatedValue</strong>: Estimated lead value in dollars</li>
              <li><strong>interactionHistory</strong>: JSON string of interactions (optional)</li>
            </ul>
          </div>
          
          {/* JSON Format */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">JSON Format</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              Your JSON file should contain an array of lead objects with this structure:
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md overflow-x-auto">
              <pre className="text-sm text-gray-800 dark:text-gray-200">
{`[
  {
    "id": "lead-001",
    "name": "John Smith",
    "email": "john@example.com",
    "source": "LinkedIn",
    "initialContact": "2023-12-15T14:25:00Z",
    "status": "Qualified",
    "interactionHistory": [
      {
        "date": "2023-12-15T14:30:00Z",
        "type": "Email",
        "response": "Positive"
      }
    ],
    "tags": ["enterprise", "high-value"],
    "conversionProbability": 0.75,
    "estimatedValue": 15000
  }
]`}
              </pre>
            </div>
          </div>
          
          {/* Demo Data Info */}
          <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 p-4 rounded-md">
            <h3 className="text-md font-semibold text-blue-800 dark:text-blue-200 mb-2">Using Demo Data</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              If you don't have your own lead data, use the "Generate Demo Data" option to create sample leads. This is a great way to explore the application features without uploading your own files.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataInput; 