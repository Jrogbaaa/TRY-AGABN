import { useState } from 'react';
import { useData } from '../context/DataContext';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeSlots = ['Morning (8-11)', 'Midday (11-2)', 'Afternoon (2-5)', 'Evening (5-8)'];

const OptimalOutreachTiming = () => {
  const { leads } = useData();
  const [selectedDay, setSelectedDay] = useState<string>(daysOfWeek[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // No leads state
  if (!leads || leads.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Optimal Outreach Timing</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Upload lead data to see the optimal times to contact your leads throughout the week.
        </p>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p className="text-gray-500 dark:text-gray-400">No contact data available</p>
        </div>
      </div>
    );
  }

  // Aggregate lead data to find optimal contact times
  const contactData: { [key: string]: { [key: string]: number } } = {};
  
  daysOfWeek.forEach(day => {
    contactData[day] = {};
    timeSlots.forEach(slot => {
      contactData[day][slot] = 0;
    });
  });

  leads.forEach(lead => {
    if (lead.optimalContactTimes) {
      lead.optimalContactTimes.forEach(time => {
        if (contactData[time.day] && contactData[time.day][time.timeRange]) {
          contactData[time.day][time.timeRange]++;
        }
      });
    }
  });

  // Find leads for selected day and time slot
  const selectedLeads = leads.filter(lead => 
    lead.optimalContactTimes?.some(time => 
      time.day === selectedDay && 
      (selectedTime ? time.timeRange === selectedTime : true)
    )
  );

  // Find best time for each day
  const bestTimes: { [key: string]: { slot: string, count: number } } = {};
  
  Object.keys(contactData).forEach(day => {
    let bestSlot = '';
    let maxCount = 0;
    
    Object.keys(contactData[day]).forEach(slot => {
      if (contactData[day][slot] > maxCount) {
        maxCount = contactData[day][slot];
        bestSlot = slot;
      }
    });
    
    bestTimes[day] = { slot: bestSlot, count: maxCount };
  });

  // Get intensity level for heatmap display
  const getIntensity = (count: number) => {
    const max = Math.max(...Object.values(contactData).flatMap(day => Object.values(day)));
    if (max === 0) return 'low';
    
    const percentage = count / max;
    if (percentage >= 0.7) return 'high';
    if (percentage >= 0.3) return 'medium';
    if (percentage > 0) return 'low';
    return 'none';
  };

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900 dark:from-opacity-20 dark:to-blue-900 dark:to-opacity-20 rounded-xl shadow-sm p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Optimal Outreach Timing</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Plan your outreach during the best times to increase engagement
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button 
            className="px-3 py-2 text-sm bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-medium rounded-lg border border-indigo-200 dark:border-indigo-800 shadow-sm hover:bg-indigo-50 dark:hover:bg-indigo-900 dark:hover:bg-opacity-30 transition-colors duration-300"
            aria-label="Export calendar to CSV"
            tabIndex={0}
          >
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              Export
            </div>
          </button>
          <button 
            className="px-3 py-2 text-sm bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-medium rounded-lg border border-indigo-200 dark:border-indigo-800 shadow-sm hover:bg-indigo-50 dark:hover:bg-indigo-900 dark:hover:bg-opacity-30 transition-colors duration-300"
            aria-label="Add to calendar"
            tabIndex={0}
          >
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              Add to Calendar
            </div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Heatmap Calendar */}
        <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Weekly Contact Calendar</h3>
          
          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysOfWeek.map(day => (
              <button
                key={day}
                className={`text-center py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  selectedDay === day 
                    ? 'bg-indigo-100 dark:bg-indigo-900 dark:bg-opacity-50 text-indigo-800 dark:text-indigo-200' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setSelectedDay(day)}
                aria-label={`Select ${day}`}
                tabIndex={0}
              >
                {day.substring(0, 3)}
                {bestTimes[day]?.count > 0 && (
                  <div className="flex justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 gap-2 mt-4">
            {timeSlots.map(slot => {
              const intensity = getIntensity(contactData[selectedDay][slot]);
              const isSelected = selectedTime === slot;
              
              return (
                <button
                  key={slot}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-300 ${
                    isSelected 
                      ? 'bg-indigo-50 dark:bg-indigo-900 dark:bg-opacity-30 border-indigo-300 dark:border-indigo-700 shadow-sm' 
                      : intensity === 'high'
                        ? 'bg-green-50 dark:bg-green-900 dark:bg-opacity-20 border-green-200 dark:border-green-800'
                        : intensity === 'medium'
                          ? 'bg-lime-50 dark:bg-lime-900 dark:bg-opacity-20 border-lime-200 dark:border-lime-800'
                          : intensity === 'low'
                            ? 'bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 border-yellow-200 dark:border-yellow-800'
                            : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                  }`}
                  onClick={() => setSelectedTime(isSelected ? null : slot)}
                  aria-label={`Select time slot ${slot}`}
                  tabIndex={0}
                >
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      intensity === 'high' 
                        ? 'bg-green-500' 
                        : intensity === 'medium'
                          ? 'bg-lime-500'
                          : intensity === 'low'
                            ? 'bg-yellow-500'
                            : 'bg-gray-300 dark:bg-gray-500'
                    }`}></div>
                    <span className={`font-medium ${
                      isSelected 
                        ? 'text-indigo-800 dark:text-indigo-200' 
                        : 'text-gray-800 dark:text-gray-200'
                    }`}>
                      {slot}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-sm ${
                      isSelected 
                        ? 'text-indigo-600 dark:text-indigo-400' 
                        : intensity === 'high'
                          ? 'text-green-600 dark:text-green-400'
                          : intensity === 'medium'
                            ? 'text-lime-600 dark:text-lime-400'
                            : intensity === 'low'
                              ? 'text-yellow-600 dark:text-yellow-400'
                              : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {contactData[selectedDay][slot]} leads
                    </span>
                    {isSelected && (
                      <svg className="w-5 h-5 ml-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Selected Leads */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Leads to Contact</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {selectedDay}{selectedTime ? ` - ${selectedTime}` : ''}
          </p>
          
          {selectedLeads.length > 0 ? (
            <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2">
              {selectedLeads.map(lead => (
                <div key={lead.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                        (lead.score ?? 0) >= 80 ? 'bg-green-500' : 
                        (lead.score ?? 0) >= 60 ? 'bg-lime-500' : 
                        (lead.score ?? 0) >= 40 ? 'bg-yellow-500' : 
                        (lead.score ?? 0) >= 20 ? 'bg-orange-500' : 'bg-red-500'
                      }`}>
                        {lead.score ?? 0}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{lead.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{lead.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <button 
                      className="flex justify-center items-center py-1.5 bg-indigo-50 dark:bg-indigo-900 dark:bg-opacity-30 text-indigo-700 dark:text-indigo-300 text-sm font-medium rounded-md hover:bg-indigo-100 dark:hover:bg-opacity-50 transition-colors duration-300"
                      aria-label={`Call ${lead.name}`}
                      tabIndex={0}
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                      Call
                    </button>
                    <button 
                      className="flex justify-center items-center py-1.5 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-md hover:bg-blue-100 dark:hover:bg-opacity-50 transition-colors duration-300"
                      aria-label={`Email ${lead.name}`}
                      tabIndex={0}
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      Email
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <svg className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
              <p className="text-gray-500 dark:text-gray-400 text-center">
                No leads scheduled for this {selectedTime ? 'time slot' : 'day'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OptimalOutreachTiming;
