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
  highValueLeads: Lead[];
  leadScoreDistribution: { range: string; count: number }[];
  leadsByScore: Lead[];
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
        leadsByStatus: {},
        highValueLeads: [],
        leadScoreDistribution: [],
        leadsByScore: []
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

    // Get high-value leads (leads with scores > 80 or top 10% if no scores available)
    const scoredLeads = leads.filter(lead => lead.score !== undefined);
    let highValueLeads: Lead[] = [];
    
    if (scoredLeads.length > 0) {
      // If we have scored leads, get the ones with high scores
      highValueLeads = scoredLeads
        .filter(lead => (lead.score || 0) > 80)
        .sort((a, b) => (b.score || 0) - (a.score || 0));
    } else {
      // Otherwise, use the top 10% by estimated value as high-value leads
      const sortedByValue = [...leads].sort((a, b) => b.estimatedValue - a.estimatedValue);
      const topCount = Math.max(1, Math.ceil(leads.length * 0.1));
      highValueLeads = sortedByValue.slice(0, topCount);
    }
    
    // Generate lead score distribution
    const scoreRanges = [
      { min: 0, max: 20, label: '0-20' },
      { min: 21, max: 40, label: '21-40' },
      { min: 41, max: 60, label: '41-60' },
      { min: 61, max: 80, label: '61-80' },
      { min: 81, max: 100, label: '81-100' }
    ];
    
    const leadScoreDistribution = scoreRanges.map(range => {
      const count = scoredLeads.filter(
        lead => (lead.score || 0) >= range.min && (lead.score || 0) <= range.max
      ).length;
      
      return {
        range: range.label,
        count
      };
    });
    
    // Sort leads by score (highest to lowest)
    const leadsByScore = [...leads]
      .sort((a, b) => (b.score || 0) - (a.score || 0));

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
      leadsByStatus,
      highValueLeads,
      leadScoreDistribution,
      leadsByScore
    };
  }, [leads]);
}; 