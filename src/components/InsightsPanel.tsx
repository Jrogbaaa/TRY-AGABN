import { useState } from 'react';
import { InsightItem } from '../utils/insightGenerators';
import { Lead } from '../context/DataContext';
import { useDataAnalysis } from '../hooks/useDataAnalysis';

interface InsightsPanelProps {
  leads: Lead[];
}

type ChangeType = 'increase' | 'decrease' | 'neutral';

interface StatItem {
  name: string;
  value: string | number;
  change: string;
  changeType: ChangeType;
}

const InsightsPanel = ({ leads }: InsightsPanelProps) => {
  const {
    insights,
    totalLeadValue,
    averageLeadValue,
    conversionRate,
    leadsByStatus
  } = useDataAnalysis(leads);

  const [expandedInsight, setExpandedInsight] = useState<string | null>(null);

  // Get stats for the header section
  const statsItems: StatItem[] = [
    {
      name: 'Total Leads',
      value: leads.length,
      change: '',
      changeType: 'neutral'
    },
    {
      name: 'Total Value',
      value: `$${totalLeadValue.toLocaleString()}`,
      change: '',
      changeType: 'neutral'
    },
    {
      name: 'Avg. Value',
      value: `$${averageLeadValue.toLocaleString()}`,
      change: '',
      changeType: 'neutral'
    },
    {
      name: 'Conversion Rate',
      value: `${conversionRate.toFixed(1)}%`,
      change: '',
      changeType: 'neutral'
    }
  ];

  // Helper to determine background color based on insight type
  const getInsightBackground = (type: InsightItem['type']) => {
    switch (type) {
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20';
      case 'success':
        return 'bg-green-50 dark:bg-green-900 dark:bg-opacity-20';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20';
      case 'danger':
        return 'bg-red-50 dark:bg-red-900 dark:bg-opacity-20';
      default:
        return 'bg-gray-50 dark:bg-gray-700';
    }
  };

  // Helper to determine icon and color based on insight type
  const getInsightIcon = (type: InsightItem['type']) => {
    switch (type) {
      case 'info':
        return (
          <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-800 rounded-full p-2">
            <svg className="h-5 w-5 text-blue-600 dark:text-blue-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'success':
        return (
          <div className="flex-shrink-0 bg-green-100 dark:bg-green-800 rounded-full p-2">
            <svg className="h-5 w-5 text-green-600 dark:text-green-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'warning':
        return (
          <div className="flex-shrink-0 bg-yellow-100 dark:bg-yellow-800 rounded-full p-2">
            <svg className="h-5 w-5 text-yellow-600 dark:text-yellow-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'danger':
        return (
          <div className="flex-shrink-0 bg-red-100 dark:bg-red-800 rounded-full p-2">
            <svg className="h-5 w-5 text-red-600 dark:text-red-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded-full p-2">
            <svg className="h-5 w-5 text-gray-600 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      {/* Stats Header */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border-b border-gray-200 dark:border-gray-700">
        {statsItems.map((stat, index) => (
          <div key={index} className="text-center">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              {stat.name}
            </p>
            <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
              {stat.value}
            </p>
            {stat.change && (
              <div className={`flex items-center justify-center mt-1 text-xs font-medium ${
                stat.changeType === 'increase' 
                  ? 'text-green-600 dark:text-green-400' 
                  : stat.changeType === 'decrease' 
                    ? 'text-red-600 dark:text-red-400' 
                    : 'text-gray-500 dark:text-gray-400'
              }`}>
                {stat.changeType === 'increase' && <span className="mr-1">↑</span>}
                {stat.changeType === 'decrease' && <span className="mr-1">↓</span>}
                {stat.change}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Insights Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Key Insights</h3>
        
        {!insights || insights.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-400 text-center py-6">
            No insights available. Upload lead data to generate insights.
          </div>
        ) : (
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div
                key={index}
                className={`${getInsightBackground(insight.type)} rounded-lg p-4 cursor-pointer hover:opacity-90 transition-opacity`}
                onClick={() => setExpandedInsight(expandedInsight === insight.title ? null : insight.title)}
                tabIndex={0}
                aria-label={`Insight: ${insight.title}`}
                onKeyDown={(e) => e.key === 'Enter' && setExpandedInsight(expandedInsight === insight.title ? null : insight.title)}
              >
                <div className="flex items-start">
                  {getInsightIcon(insight.type)}
                  <div className="ml-3 w-full">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        {insight.title}
                      </h4>
                      <span className="text-sm font-bold">
                        {insight.value}
                      </span>
                    </div>
                    <div className={`mt-1 text-sm text-gray-600 dark:text-gray-300 ${expandedInsight === insight.title ? '' : 'line-clamp-1'}`}>
                      {insight.description}
                    </div>
                    {insight.trend && (
                      <div className={`mt-1 flex items-center text-xs font-medium ${
                        insight.trend === 'up' 
                          ? 'text-green-600 dark:text-green-400' 
                          : insight.trend === 'down' 
                            ? 'text-red-600 dark:text-red-400' 
                            : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {insight.trend === 'up' && <span className="mr-1">↑</span>}
                        {insight.trend === 'down' && <span className="mr-1">↓</span>}
                        {insight.trendValue !== undefined && `${insight.trendValue}%`}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lead Status Summary */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Lead Status Summary</h3>
        <div className="space-y-2">
          {Object.entries(leadsByStatus).length > 0 ? (
            Object.entries(leadsByStatus)
              .sort((a, b) => b[1] - a[1])
              .map(([status, count]) => (
                <div key={status} className="flex items-center">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        status === 'Converted'
                          ? 'bg-green-600'
                          : status === 'Qualified' || status === 'Proposal' || status === 'Negotiation'
                            ? 'bg-blue-600'
                            : status === 'Disqualified'
                              ? 'bg-red-600'
                              : status === 'Contacted'
                                ? 'bg-yellow-500'
                                : 'bg-purple-600'
                      }`}
                      style={{ width: `${(count / leads.length) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between w-full items-center ml-2">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{status}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{count}</span>
                  </div>
                </div>
              ))
          ) : (
            <div className="text-gray-500 dark:text-gray-400 text-center py-2">
              No status data available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InsightsPanel; 