import { Lead } from '../context/DataContext';
import { getSourceBreakdown, getTagBreakdown } from './insightGenerators';

export interface ScriptTemplate {
  id: string;
  name: string;
  description: string;
  templateFn: (data: Lead[], leadName?: string) => string;
}

// Generate a script for a general lead analysis overview
const generateOverviewScript = (data: Lead[]): string => {
  if (!data || data.length === 0) {
    return 'No lead data available for analysis.';
  }

  const totalLeads = data.length;
  const totalValue = data.reduce((sum, lead) => sum + lead.estimatedValue, 0);
  const avgValue = totalValue / totalLeads;
  const convertedLeads = data.filter(lead => lead.status === 'Converted').length;
  const conversionRate = (convertedLeads / totalLeads) * 100;
  
  const sourceBreakdown = getSourceBreakdown(data);
  const topSources = sourceBreakdown.slice(0, 3).map(source => source.name);
  
  return `
Hi there! I've just completed an analysis of our lead data, and I'd like to share some key insights with you.

We currently have ${totalLeads} leads in our pipeline with a total estimated value of $${totalValue.toLocaleString()}. That's an average of $${avgValue.toLocaleString()} per lead.

Our current conversion rate stands at ${conversionRate.toFixed(1)}%, with ${convertedLeads} leads successfully converted.

The majority of our leads are coming from ${topSources.join(', ')}. 

Based on this analysis, I recommend we focus our efforts on nurturing high-value leads and optimizing our approach for our top-performing channels.

Let me know if you'd like a more detailed breakdown of any specific aspect of our lead performance.
  `.trim();
};

// Generate a personalized script for a specific lead
const generatePersonalizedScript = (data: Lead[], leadName?: string): string => {
  if (!data || data.length === 0 || !leadName) {
    return 'No lead data available for personalization.';
  }

  const lead = data.find(l => l.name.toLowerCase().includes(leadName.toLowerCase()));
  
  if (!lead) {
    return `No lead found with the name "${leadName}".`;
  }
  
  const leadSource = lead.source;
  const daysAgo = Math.floor((new Date().getTime() - new Date(lead.initialContact).getTime()) / (1000 * 60 * 60 * 24));
  
  let interactionSummary = 'We haven\'t had any interactions yet.';
  if (lead.interactionHistory.length > 0) {
    const lastInteraction = lead.interactionHistory[lead.interactionHistory.length - 1];
    const lastInteractionType = lastInteraction.type.toLowerCase();
    const lastInteractionDate = new Date(lastInteraction.date).toLocaleDateString();
    interactionSummary = `Our last interaction was a ${lastInteractionType} on ${lastInteractionDate}.`;
  }
  
  const tags = lead.tags.join(', ');
  const estimatedValue = lead.estimatedValue.toLocaleString();
  
  return `
Hi ${lead.name},

I wanted to personally reach out to you. It's been ${daysAgo} days since we first connected through ${leadSource}.

${interactionSummary}

Based on your interests in ${tags}, I believe our solutions could provide significant value to your organization. We estimate a potential value of $${estimatedValue} for a partnership with us.

I'd love to schedule some time to discuss how we can address your specific needs. Would you be available for a brief call this week?

Looking forward to connecting with you soon!
  `.trim();
};

// Generate a script focused on lead source performance
const generateSourcePerformanceScript = (data: Lead[]): string => {
  if (!data || data.length === 0) {
    return 'No lead data available for source analysis.';
  }

  const sourceBreakdown = getSourceBreakdown(data);
  
  // Top 3 sources by value
  const topSources = sourceBreakdown.slice(0, 3);
  
  // Paragraphs for each top source
  const sourceParagraphs = topSources.map((source, index) => {
    const sourceLeads = data.filter(lead => lead.source === source.name);
    const convertedLeads = sourceLeads.filter(lead => lead.status === 'Converted');
    const conversionRate = (convertedLeads.length / sourceLeads.length) * 100;
    
    return `
${index + 1}. ${source.name}: This channel has generated ${source.count} leads with a total value of $${source.value.toLocaleString()}. The conversion rate for this source is ${conversionRate.toFixed(1)}%.
    `.trim();
  });
  
  // Bottom source if we have enough data
  let bottomSourceParagraph = '';
  if (sourceBreakdown.length > 3) {
    const bottomSource = sourceBreakdown[sourceBreakdown.length - 1];
    bottomSourceParagraph = `\n\nOur lowest-performing channel is ${bottomSource.name}, which has generated only ${bottomSource.count} leads with a value of $${bottomSource.value.toLocaleString()}.`;
  }
  
  return `
Hi team,

I've analyzed the performance of our lead sources, and I'd like to share the key findings.

Our top-performing channels by lead value are:

${sourceParagraphs.join('\n\n')}
${bottomSourceParagraph}

Based on this data, I recommend we increase our investment in ${topSources[0].name} while reassessing our strategy for our lower-performing channels.

Let me know if you'd like me to dive deeper into any specific source or metrics.
  `.trim();
};

// Generate a script focused on lead segmentation by tags
const generateSegmentationScript = (data: Lead[]): string => {
  if (!data || data.length === 0) {
    return 'No lead data available for segmentation analysis.';
  }

  const tagBreakdown = getTagBreakdown(data);
  const topTags = tagBreakdown.slice(0, 5);
  
  const tagParagraphs = topTags.map(tag => {
    const tagLeads = data.filter(lead => lead.tags.includes(tag.name));
    const totalValue = tagLeads.reduce((sum, lead) => sum + lead.estimatedValue, 0);
    const avgValue = totalValue / tagLeads.length;
    
    return `
- ${tag.name}: ${tag.count} leads with a total value of $${totalValue.toLocaleString()} (average of $${avgValue.toLocaleString()} per lead)
    `.trim();
  });
  
  return `
Hi everyone,

I've completed a segmentation analysis of our leads based on their tags, and I want to share the insights.

Here's a breakdown of our top 5 segments:

${tagParagraphs.join('\n')}

This segmentation provides valuable insights for our targeting and messaging strategy. Based on this data, I recommend we develop specialized outreach campaigns for our ${topTags[0].name} and ${topTags[1].name} segments, as they represent our largest and potentially most valuable audiences.

We should also consider refining our qualification criteria to better identify leads in these key segments earlier in the process.

Let me know your thoughts on this approach.
  `.trim();
};

// Available script templates
export const scriptTemplates: ScriptTemplate[] = [
  {
    id: 'overview',
    name: 'Lead Overview',
    description: 'General overview of all lead data and key metrics',
    templateFn: generateOverviewScript
  },
  {
    id: 'personalized',
    name: 'Personalized Outreach',
    description: 'Customized script for reaching out to a specific lead',
    templateFn: generatePersonalizedScript
  },
  {
    id: 'source-performance',
    name: 'Source Performance',
    description: 'Analysis of which lead sources are performing best',
    templateFn: generateSourcePerformanceScript
  },
  {
    id: 'segmentation',
    name: 'Lead Segmentation',
    description: 'Breakdown of leads by segment/tag for targeted messaging',
    templateFn: generateSegmentationScript
  }
];

// Generate a script based on template ID and data
export const generateScript = (
  templateId: string,
  data: Lead[],
  leadName?: string
): string => {
  const template = scriptTemplates.find(t => t.id === templateId);
  
  if (!template) {
    return 'No template found with the specified ID.';
  }
  
  return template.templateFn(data, leadName);
}; 