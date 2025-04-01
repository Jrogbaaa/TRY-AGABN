import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { SourceBreakdown } from '../../utils/insightGenerators';

interface LeadsBySourceProps {
  data: SourceBreakdown[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A259FF', '#FF5A5A', '#4CAF50', '#03A9F4'];

const formatCurrency = (value: number) => {
  return `$${value.toLocaleString()}`;
};

const LeadsBySource = ({ data }: LeadsBySourceProps) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-gray-500 dark:text-gray-400">No data available</p>
      </div>
    );
  }

  // Prepare data for the chart
  const chartData = data.map(item => ({
    name: item.name,
    value: item.value,
    count: item.count
  }));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 h-full">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Leads by Source</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number, name: string, props: any) => {
                return [`${formatCurrency(value)} (${props.payload.count} leads)`, name];
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Top Sources</h4>
        <ul className="space-y-1">
          {data.slice(0, 3).map((source, index) => (
            <li key={index} className="flex justify-between items-center">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {source.name}
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {formatCurrency(source.value)} ({source.count})
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeadsBySource; 