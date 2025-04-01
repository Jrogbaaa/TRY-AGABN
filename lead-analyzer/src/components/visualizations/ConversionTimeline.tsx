import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ConversionTimelineData } from '../../utils/insightGenerators';

interface ConversionTimelineProps {
  data: ConversionTimelineData[];
  timeframe?: number; // days
}

const ConversionTimeline = ({ data, timeframe = 30 }: ConversionTimelineProps) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-gray-500 dark:text-gray-400">No timeline data available</p>
      </div>
    );
  }

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Lead Acquisition Timeline</h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">Last {timeframe} days</span>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
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
              labelFormatter={formatDate}
              formatter={(value: number) => [`${value} leads`, 'New Leads']}
            />
            <Line 
              type="monotone" 
              dataKey="count" 
              stroke="#3B82F6" 
              activeDot={{ r: 8 }}
              strokeWidth={2}
              dot={{ stroke: '#3B82F6', strokeWidth: 2, r: 4, fill: 'white' }}
              name="New Leads"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex justify-between">
        <div className="text-sm">
          <p className="text-gray-600 dark:text-gray-400">Total in period</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {data.reduce((sum, item) => sum + item.count, 0)} leads
          </p>
        </div>
        <div className="text-sm text-right">
          <p className="text-gray-600 dark:text-gray-400">Daily average</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {(data.reduce((sum, item) => sum + item.count, 0) / data.length).toFixed(1)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversionTimeline; 