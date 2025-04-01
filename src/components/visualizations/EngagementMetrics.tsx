import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { EngagementData } from '../../utils/insightGenerators';

interface EngagementMetricsProps {
  data: EngagementData[];
}

const EngagementMetrics = ({ data }: EngagementMetricsProps) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-gray-500 dark:text-gray-400">No engagement data available</p>
      </div>
    );
  }

  // Transform data for stacked bar chart
  const chartData = data.map(item => ({
    type: item.type,
    Positive: item.positiveCount,
    Neutral: item.neutralCount,
    Negative: item.negativeCount
  }));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 h-full">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Engagement by Type</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis 
              dataKey="type" 
              tick={{ fontSize: 12 }}
              stroke="#6B7280"
            />
            <YAxis 
              allowDecimals={false}
              tick={{ fontSize: 12 }}
              stroke="#6B7280"
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '4px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              formatter={(value: number, name: string) => [value, name]}
            />
            <Legend />
            <Bar dataKey="Positive" fill="#10B981" stackId="a" name="Positive" />
            <Bar dataKey="Neutral" fill="#F59E0B" stackId="a" name="Neutral" />
            <Bar dataKey="Negative" fill="#EF4444" stackId="a" name="Negative" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Response Summary</h4>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-green-50 dark:bg-green-900 dark:bg-opacity-20 p-2 rounded">
            <p className="text-xs text-green-700 dark:text-green-300">Positive</p>
            <p className="text-lg font-semibold text-green-800 dark:text-green-200">
              {data.reduce((sum, item) => sum + item.positiveCount, 0)}
            </p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 p-2 rounded">
            <p className="text-xs text-yellow-700 dark:text-yellow-300">Neutral</p>
            <p className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
              {data.reduce((sum, item) => sum + item.neutralCount, 0)}
            </p>
          </div>
          <div className="bg-red-50 dark:bg-red-900 dark:bg-opacity-20 p-2 rounded">
            <p className="text-xs text-red-700 dark:text-red-300">Negative</p>
            <p className="text-lg font-semibold text-red-800 dark:text-red-200">
              {data.reduce((sum, item) => sum + item.negativeCount, 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngagementMetrics; 