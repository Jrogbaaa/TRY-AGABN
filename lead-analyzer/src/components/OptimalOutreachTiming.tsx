import React from 'react';
import { useData } from '../context/DataContext';

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

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Content Calendar</h2>

        {/* Weekly calendar view */}
        <div>
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
      </div>
    </div>
  );
};

export default OptimalOutreachTiming;
