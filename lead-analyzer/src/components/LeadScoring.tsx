import React, { useEffect } from 'react';
import { useData, Lead } from '../context/DataContext';
import { useDataAnalysis } from '../hooks/useDataAnalysis';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const SCORE_COLORS = ['#ef4444', '#f97316', '#facc15', '#84cc16', '#22c55e'];

interface ScoreIndicatorProps {
  score: number;
}

const ScoreIndicator: React.FC<ScoreIndicatorProps> = ({ score }) => {
  // Determine color based on score range
  const getColorClass = () => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-lime-500';
    if (score >= 40) return 'bg-yellow-500';
    if (score >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  // Get number of filled stars based on score
  const getStars = () => {
    const totalStars = 5;
    const filledStars = Math.round((score / 100) * totalStars);
    
    return Array(totalStars).fill(0).map((_, index) => (
      <svg 
        key={index}
        className={`w-5 h-5 ${index < filledStars ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
        fill="currentColor" 
        viewBox="0 0 20 20" 
        xmlns="http://www.w3.org/2000/svg"
        aria-label={index < filledStars ? "Filled star" : "Empty star"}
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
    ));
  };

  return (
    <div className="flex items-center space-x-2">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${getColorClass()}`}>
        {score}
      </div>
      <div className="flex">
        {getStars()}
      </div>
    </div>
  );
};

const LeadScoring: React.FC = () => {
  const { leads, calculateLeadScores } = useData();
  const { leadScoreDistribution, highValueLeads, leadsByScore } = useDataAnalysis(leads);

  // Calculate scores when component mounts
  useEffect(() => {
    if (leads.length > 0) {
      calculateLeadScores();
    }
  }, []);

  if (!leads || leads.length === 0) {
    return (
      <div className="card p-6 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          No lead data available for scoring.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Lead Scoring</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Score Distribution Chart */}
          <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Score Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leadScoreDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="range"
                    label={({ range }) => range}
                  >
                    {leadScoreDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={SCORE_COLORS[index % SCORE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value} leads`, `Score ${name}`]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Scoring Leads */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">High-Value Leads</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Lead</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Score</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Source</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Value</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {highValueLeads.slice(0, 5).map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{lead.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{lead.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <ScoreIndicator score={lead.score || 0} />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{lead.source}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${lead.estimatedValue.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* All Leads Scored */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">All Leads by Score</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Lead</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Score</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Source</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Value</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {leadsByScore.slice(0, 10).map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{lead.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{lead.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <ScoreIndicator score={lead.score || 0} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{lead.source}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      lead.status === 'Qualified' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      lead.status === 'New' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      lead.status === 'Disqualified' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${lead.estimatedValue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeadScoring; 