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
        return 'bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800/40';
      case 'success':
        return 'bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800/40';
      case 'warning':
        return 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800/40';
      case 'danger':
        return 'bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-800/40';
      default:
        return 'bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/40';
    }
  };

  // Helper to determine icon and color based on insight type
  const getInsightIcon = (type: InsightItem['type']) => {
    switch (type) {
      case 'info':
        return (
          <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-800/70 rounded-full p-2 shadow-sm">
            <svg className="h-5 w-5 text-indigo-600 dark:text-indigo-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'success':
        return (
          <div className="flex-shrink-0 bg-emerald-100 dark:bg-emerald-800/70 rounded-full p-2 shadow-sm">
            <svg className="h-5 w-5 text-emerald-600 dark:text-emerald-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'warning':
        return (
          <div className="flex-shrink-0 bg-amber-100 dark:bg-amber-800/70 rounded-full p-2 shadow-sm">
            <svg className="h-5 w-5 text-amber-600 dark:text-amber-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'danger':
        return (
          <div className="flex-shrink-0 bg-rose-100 dark:bg-rose-800/70 rounded-full p-2 shadow-sm">
            <svg className="h-5 w-5 text-rose-600 dark:text-rose-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="flex-shrink-0 bg-gray-100 dark:bg-gray-800/70 rounded-full p-2 shadow-sm">
            <svg className="h-5 w-5 text-gray-600 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-xl shadow-md overflow-hidden transition-all duration-300">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 to-purple-50/30 dark:from-indigo-950/20 dark:to-purple-950/20 opacity-70"></div>
        
        {/* Stats Header */}
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-b border-gray-200/70 dark:border-gray-700/50">
          {statsItems.map((stat, index) => (
            <div key={index} className="relative overflow-hidden bg-white/40 dark:bg-gray-800/40 rounded-lg p-4 shadow-sm backdrop-blur-md transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/5 dark:to-purple-500/5 rounded-full"></div>
              <div className="relative">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate mb-1">
                  {stat.name}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                {stat.change && (
                  <div className={`flex items-center mt-1 text-xs font-medium ${
                    stat.changeType === 'increase' 
                      ? 'text-emerald-600 dark:text-emerald-400' 
                      : stat.changeType === 'decrease' 
                        ? 'text-rose-600 dark:text-rose-400' 
                        : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {stat.changeType === 'increase' && <span className="mr-1">↑</span>}
                    {stat.changeType === 'decrease' && <span className="mr-1">↓</span>}
                    {stat.change}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Insights Content */}
        <div className="relative p-6">
          <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-5">Key Insights</h3>
          
          {!insights || insights.length === 0 ? (
            <div className="text-gray-500 dark:text-gray-400 text-center py-10 bg-gray-50/50 dark:bg-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
              <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
              </svg>
              <p className="font-medium">No insights available.</p>
              <p className="text-sm mt-1">Upload lead data to generate insights.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {insights.map((insight, index) => (
                <div
                  key={index}
                  className={`${getInsightBackground(insight.type)} rounded-lg p-4 cursor-pointer hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5`}
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
                        <span className="text-sm font-bold bg-white/60 dark:bg-gray-800/60 px-2 py-0.5 rounded-full shadow-sm">
                          {insight.value}
                        </span>
                      </div>
                      <div className={`mt-1 text-sm text-gray-600 dark:text-gray-300 ${expandedInsight === insight.title ? '' : 'line-clamp-1'}`}>
                        {insight.description}
                      </div>
                      {insight.trend && (
                        <div className={`mt-2 flex items-center text-xs font-medium px-2 py-1 rounded-full w-fit ${
                          insight.trend === 'up' 
                            ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/30' 
                            : insight.trend === 'down' 
                              ? 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-900/30' 
                              : 'text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60'
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
        <div className="relative border-t border-gray-200/70 dark:border-gray-700/50 p-6">
          <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-5">Lead Status Summary</h3>
          <div className="space-y-4">
            {Object.entries(leadsByStatus).length > 0 ? (
              Object.entries(leadsByStatus)
                .sort((a, b) => b[1] - a[1])
                .map(([status, count]) => (
                  <div key={status} className="bg-white/40 dark:bg-gray-800/40 p-4 rounded-lg shadow-sm backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-800 dark:text-gray-200">{status}</span>
                      <div className="flex items-center">
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{count}</span>
                        <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">({((count / leads.length) * 100).toFixed(1)}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200/70 dark:bg-gray-700/70 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-2.5 rounded-full ${
                          status === 'Converted'
                            ? 'bg-emerald-500'
                            : status === 'Qualified' || status === 'Proposal' || status === 'Negotiation'
                              ? 'bg-indigo-500'
                              : status === 'Disqualified'
                                ? 'bg-rose-500'
                                : status === 'Contacted'
                                  ? 'bg-amber-500'
                                  : 'bg-purple-500'
                        }`}
                        style={{ width: `${(count / leads.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-gray-500 dark:text-gray-400 text-center py-8 bg-gray-50/50 dark:bg-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                <svg className="mx-auto h-10 w-10 text-gray-400 dark:text-gray-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p className="font-medium">No status data available.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsPanel; 