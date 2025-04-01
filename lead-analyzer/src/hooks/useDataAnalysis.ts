import { useMemo } from 'react';
import { Lead } from '../context/DataContext';
import { 
  generateKeyInsights, 
  getSourceBreakdown, 
  getStatusBreakdown, 
  getTagBreakdown, 
  getConversionTimeline, 
  getEngagementMetrics,
  InsightItem,
  SourceBreakdown,
  StatusBreakdown,
  TagBreakdown,
  ConversionTimelineData,
  EngagementData
} from '../utils/insightGenerators';

interface DataAnalysisResult {
  insights: InsightItem[];
  sourceBreakdown: SourceBreakdown[];
  statusBreakdown: StatusBreakdown[];
  tagBreakdown: TagBreakdown[];
  conversionTimeline: ConversionTimelineData[];
  engagementMetrics: EngagementData[];
  totalLeadValue: number;
  averageLeadValue: number;
  conversionRate: number;
  recentLeadsCount: number;
  topSource: string;
  leadsByStatus: Record<string, number>;
}

export const useDataAnalysis = (leads: Lead[]): DataAnalysisResult => {
  return useMemo(() => {
    // Default empty result
    if (!leads || leads.length === 0) {
      return {
        insights: [],
        sourceBreakdown: [],
        statusBreakdown: [],
        tagBreakdown: [],
        conversionTimeline: [],
        engagementMetrics: [],
        totalLeadValue: 0,
        averageLeadValue: 0,
        conversionRate: 0,
        recentLeadsCount: 0,
        topSource: '',
        leadsByStatus: {}
      };
    }

    // Generate key insights
    const insights = generateKeyInsights(leads);

    // Get source breakdown
    const sourceBreakdown = getSourceBreakdown(leads);

    // Get status breakdown
    const statusBreakdown = getStatusBreakdown(leads);

    // Get tag breakdown
    const tagBreakdown = getTagBreakdown(leads);

    // Get conversion timeline (30 days)
    const conversionTimeline = getConversionTimeline(leads, 30);

    // Get engagement metrics
    const engagementMetrics = getEngagementMetrics(leads);

    // Calculate total and average lead value
    const totalLeadValue = leads.reduce((sum, lead) => sum + lead.estimatedValue, 0);
    const averageLeadValue = totalLeadValue / leads.length;

    // Calculate conversion rate
    const convertedLeads = leads.filter(lead => lead.status === 'Converted').length;
    const conversionRate = (convertedLeads / leads.length) * 100;

    // Count recent leads (last 7 days)
    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 7);
    const recentLeadsCount = leads.filter(lead => new Date(lead.initialContact) >= sevenDaysAgo).length;

    // Get top source
    const topSource = sourceBreakdown.length > 0 ? sourceBreakdown[0].name : '';

    // Count leads by status
    const leadsByStatus: Record<string, number> = {};
    leads.forEach(lead => {
      leadsByStatus[lead.status] = (leadsByStatus[lead.status] || 0) + 1;
    });

    return {
      insights,
      sourceBreakdown,
      statusBreakdown,
      tagBreakdown,
      conversionTimeline,
      engagementMetrics,
      totalLeadValue,
      averageLeadValue,
      conversionRate,
      recentLeadsCount,
      topSource,
      leadsByStatus
    };
  }, [leads]);
}; 