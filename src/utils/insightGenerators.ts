import { Lead } from '../context/DataContext';

export interface InsightItem {
  type: 'info' | 'success' | 'warning' | 'danger';
  title: string;
  description: string;
  value?: number | string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: number;
}

export interface SourceBreakdown {
  name: string;
  value: number;
  count: number;
}

export interface StatusBreakdown {
  name: string;
  value: number;
  count: number;
}

export interface TagBreakdown {
  name: string;
  count: number;
}

export interface ConversionTimelineData {
  date: string;
  count: number;
}

export interface EngagementData {
  type: string;
  positiveCount: number;
  neutralCount: number;
  negativeCount: number;
}

// Generate key insights from the lead data
export const generateKeyInsights = (leads: Lead[]): InsightItem[] => {
  if (!leads || leads.length === 0) {
    return [];
  }

  const insights: InsightItem[] = [];
  
  // Total lead value
  const totalValue = leads.reduce((sum, lead) => sum + lead.estimatedValue, 0);
  insights.push({
    type: 'info',
    title: 'Total Lead Value',
    description: 'The sum of all estimated lead values',
    value: `$${totalValue.toLocaleString()}`
  });
  
  // Average conversion probability
  const avgProbability = leads.reduce((sum, lead) => sum + lead.conversionProbability, 0) / leads.length;
  insights.push({
    type: 'info',
    title: 'Average Conversion Probability',
    description: 'The average likelihood of converting leads',
    value: `${(avgProbability * 100).toFixed(1)}%`
  });
  
  // High value leads
  const highValueThreshold = 10000;
  const highValueLeads = leads.filter(lead => lead.estimatedValue >= highValueThreshold);
  insights.push({
    type: 'success',
    title: 'High Value Leads',
    description: `Leads with value ≥ $${highValueThreshold.toLocaleString()}`,
    value: highValueLeads.length
  });
  
  // Conversion rate
  const convertedLeads = leads.filter(lead => lead.status === 'Converted');
  const conversionRate = (convertedLeads.length / leads.length) * 100;
  insights.push({
    type: conversionRate > 20 ? 'success' : 'warning',
    title: 'Conversion Rate',
    description: 'Percentage of leads that converted',
    value: `${conversionRate.toFixed(1)}%`
  });
  
  // Most valuable source
  const sourceValues: Record<string, { total: number, count: number }> = {};
  leads.forEach(lead => {
    if (!sourceValues[lead.source]) {
      sourceValues[lead.source] = { total: 0, count: 0 };
    }
    sourceValues[lead.source].total += lead.estimatedValue;
    sourceValues[lead.source].count += 1;
  });
  
  let mostValuableSource = '';
  let highestValue = 0;
  
  Object.entries(sourceValues).forEach(([source, data]) => {
    if (data.total > highestValue) {
      mostValuableSource = source;
      highestValue = data.total;
    }
  });
  
  insights.push({
    type: 'success',
    title: 'Most Valuable Source',
    description: 'Lead source with the highest total value',
    value: mostValuableSource
  });
  
  // Recent lead activity
  const now = new Date();
  const oneWeekAgo = new Date(now);
  oneWeekAgo.setDate(now.getDate() - 7);
  
  const recentLeads = leads.filter(lead => new Date(lead.initialContact) >= oneWeekAgo);
  insights.push({
    type: recentLeads.length > 0 ? 'info' : 'warning',
    title: 'Recent Lead Activity',
    description: 'New leads in the past 7 days',
    value: recentLeads.length
  });
  
  // At-risk high-value leads
  const atRiskHighValueLeads = highValueLeads.filter(lead => lead.conversionProbability < 0.3);
  if (atRiskHighValueLeads.length > 0) {
    insights.push({
      type: 'danger',
      title: 'At-Risk High-Value Leads',
      description: 'High-value leads with low conversion probability',
      value: atRiskHighValueLeads.length
    });
  }
  
  return insights;
};

// Get breakdown of leads by source
export const getSourceBreakdown = (leads: Lead[]): SourceBreakdown[] => {
  if (!leads || leads.length === 0) {
    return [];
  }
  
  const sourceMap: Record<string, { value: number; count: number }> = {};
  
  leads.forEach(lead => {
    if (!sourceMap[lead.source]) {
      sourceMap[lead.source] = { value: 0, count: 0 };
    }
    sourceMap[lead.source].value += lead.estimatedValue;
    sourceMap[lead.source].count += 1;
  });
  
  return Object.entries(sourceMap).map(([name, data]) => ({
    name,
    value: data.value,
    count: data.count
  })).sort((a, b) => b.value - a.value);
};

// Get breakdown of leads by status
export const getStatusBreakdown = (leads: Lead[]): StatusBreakdown[] => {
  if (!leads || leads.length === 0) {
    return [];
  }
  
  const statusMap: Record<string, { value: number; count: number }> = {};
  
  leads.forEach(lead => {
    if (!statusMap[lead.status]) {
      statusMap[lead.status] = { value: 0, count: 0 };
    }
    statusMap[lead.status].value += lead.estimatedValue;
    statusMap[lead.status].count += 1;
  });
  
  return Object.entries(statusMap).map(([name, data]) => ({
    name,
    value: data.value,
    count: data.count
  })).sort((a, b) => b.count - a.count);
};

// Get breakdown of leads by tag
export const getTagBreakdown = (leads: Lead[]): TagBreakdown[] => {
  if (!leads || leads.length === 0) {
    return [];
  }
  
  const tagCounts: Record<string, number> = {};
  
  leads.forEach(lead => {
    lead.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  
  return Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
};

// Get conversion timeline data
export const getConversionTimeline = (leads: Lead[], days: number = 30): ConversionTimelineData[] => {
  if (!leads || leads.length === 0) {
    return [];
  }
  
  const now = new Date();
  const startDate = new Date(now);
  startDate.setDate(now.getDate() - days);
  
  // Create an array of all dates in the range
  const dateRange: string[] = [];
  const currentDate = new Date(startDate);
  
  while (currentDate <= now) {
    dateRange.push(currentDate.toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  // Initialize counts for each date
  const dateCounts: Record<string, number> = {};
  dateRange.forEach(date => {
    dateCounts[date] = 0;
  });
  
  // Count leads by initial contact date
  leads.forEach(lead => {
    const contactDate = new Date(lead.initialContact).toISOString().split('T')[0];
    if (dateCounts[contactDate] !== undefined) {
      dateCounts[contactDate] += 1;
    }
  });
  
  // Convert to array format for charts
  return Object.entries(dateCounts)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));
};

// Get engagement metrics data
export const getEngagementMetrics = (leads: Lead[]): EngagementData[] => {
  if (!leads || leads.length === 0) {
    return [];
  }
  
  const engagementMap: Record<string, { positive: number; neutral: number; negative: number }> = {};
  
  // Process all interaction history
  leads.forEach(lead => {
    lead.interactionHistory.forEach(interaction => {
      if (!engagementMap[interaction.type]) {
        engagementMap[interaction.type] = { positive: 0, neutral: 0, negative: 0 };
      }
      
      if (['Positive', 'Interested', 'Converted'].includes(interaction.response)) {
        engagementMap[interaction.type].positive += 1;
      } else if (['Neutral'].includes(interaction.response)) {
        engagementMap[interaction.type].neutral += 1;
      } else {
        engagementMap[interaction.type].negative += 1;
      }
    });
  });
  
  return Object.entries(engagementMap).map(([type, data]) => ({
    type,
    positiveCount: data.positive,
    neutralCount: data.neutral,
    negativeCount: data.negative
  })).sort((a, b) => {
    const totalA = a.positiveCount + a.neutralCount + a.negativeCount;
    const totalB = b.positiveCount + b.neutralCount + b.negativeCount;
    return totalB - totalA;
  });
}; 