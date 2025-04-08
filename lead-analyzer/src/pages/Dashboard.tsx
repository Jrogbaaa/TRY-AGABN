import { useData } from '../context/DataContext';
import InsightsPanel from '../components/InsightsPanel';
import LeadsBySource from '../components/visualizations/LeadsBySource';
import ConversionTimeline from '../components/visualizations/ConversionTimeline';
import EngagementMetrics from '../components/visualizations/EngagementMetrics';
import { useDataAnalysis } from '../hooks/useDataAnalysis';

const Dashboard = () => {
  const { leads, isLoading, error } = useData();
  const { 
    sourceBreakdown, 
    conversionTimeline, 
    engagementMetrics,
  } = useDataAnalysis(leads);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full py-12">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600 dark:text-gray-300">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900 dark:bg-opacity-20 p-4 rounded-md">
        <h2 className="text-lg font-medium text-red-800 dark:text-red-200">Error Loading Data</h2>
        <p className="mt-1 text-sm text-red-700 dark:text-red-300">{error}</p>
      </div>
    );
  }

  // No data state
  if (!leads || leads.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
        </svg>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Lead Data Available</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          To see insights and visualizations, please upload lead data or generate demo data from the Data Input page.
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
    );
  }

  // Dashboard with data
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Lead Dashboard</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Analyzing {leads.length} leads
        </div>
      </div>

      {/* Insights Panel */}
      <InsightsPanel leads={leads} />

      {/* Visualizations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LeadsBySource data={sourceBreakdown} />
        <ConversionTimeline data={conversionTimeline} />
      </div>

      <EngagementMetrics data={engagementMetrics} />
    </div>
  );
};

export default Dashboard; 