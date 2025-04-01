import React from 'react';
import { useData, Lead } from '../context/DataContext';

const OptimalOutreachTiming: React.FC = () => {
  const { leads } = useData();

  if (!leads || leads.length === 0) {
    return (
      <div className="card p-6 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          No lead data available for timing analysis.
        </p>
      </div>
    );
  }

  // Get leads with optimal contact times
  const leadsWithTiming = leads.filter(lead => lead.optimalContactTimes && lead.optimalContactTimes.length > 0);

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Optimal Outreach Timing</h2>

        {/* Weekly calendar view */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Weekly Contact Calendar</h3>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="grid grid-cols-5 divide-x divide-gray-200 dark:divide-gray-700">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                <div key={day} className="p-4">
                  <h4 className="font-medium text-gray-800 dark:text-white text-center pb-2 border-b border-gray-200 dark:border-gray-700">
                    {day}
                  </h4>
                  <div className="mt-3 space-y-2">
                    {leads
                      .filter(lead => 
                        lead.optimalContactTimes?.some(time => time.day === day)
                      )
                      .slice(0, 3)
                      .map(lead => {
                        const timeSlot = lead.optimalContactTimes?.find(t => t.day === day);
                        return (
                          <div key={`${lead.id}-${day}`} className="p-2 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-30 rounded text-xs">
                            <div className="font-semibold text-blue-800 dark:text-blue-200">{lead.name}</div>
                            <div className="text-blue-600 dark:text-blue-300 flex justify-between">
                              <span>{timeSlot?.timeRange}</span>
                              <span className="text-green-600 dark:text-green-400">{timeSlot?.confidence}%</span>
                            </div>
                          </div>
                        );
                      })}
                    {leads.filter(lead => 
                      lead.optimalContactTimes?.some(time => time.day === day)
                    ).length > 3 && (
                      <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                        +{leads.filter(lead => 
                          lead.optimalContactTimes?.some(time => time.day === day)
                        ).length - 3} more
                      </div>
                    )}
                    {!leads.some(lead => 
                      lead.optimalContactTimes?.some(time => time.day === day)
                    ) && (
                      <div className="text-center text-xs text-gray-500 dark:text-gray-400 py-2">
                        No leads scheduled
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Times are based on lead activity patterns and industry best practices.
          </div>
        </div>

        {/* Lead timing details */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Lead-Specific Optimal Times</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Lead</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Best Days</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Best Times</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Confidence</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Source</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {leadsWithTiming.slice(0, 8).map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{lead.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{lead.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {lead.optimalContactTimes?.map(time => time.day).join(', ')}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {lead.optimalContactTimes?.[0]?.timeRange}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {lead.optimalContactTimes?.map((time, index) => (
                        <div key={index} className="flex items-center">
                          <div className={`h-1.5 rounded-full w-16 ${
                            time.confidence >= 90 ? 'bg-green-500' :
                            time.confidence >= 75 ? 'bg-lime-500' :
                            time.confidence >= 60 ? 'bg-yellow-500' :
                            'bg-orange-500'
                          }`}></div>
                          <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{time.confidence}%</span>
                        </div>
                      ))[0]}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {lead.source}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {leadsWithTiming.length > 8 && (
              <div className="text-center py-3 bg-gray-50 dark:bg-gray-900 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                Showing 8 of {leadsWithTiming.length} leads with optimal contact times
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimalOutreachTiming;
