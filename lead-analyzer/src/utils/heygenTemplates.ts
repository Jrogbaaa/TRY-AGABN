import { Lead } from '../context/DataContext';
import { getSourceBreakdown, getTagBreakdown } from './insightGenerators';

type ContentType = 'ai-script' | 'podcast';

interface PodcastOptions {
  topic?: string;
  duration?: number;
}

/**
 * Generate a Heygen script based on the content type and lead data
 */
export const generateHeygenScript = (
  data: Lead[],
  leadName?: string,
  contentType: ContentType = 'ai-script',
  options?: PodcastOptions
): string => {
  if (!data || data.length === 0) {
    return 'No lead data available for content generation.';
  }

  switch (contentType) {
    case 'ai-script':
      return generateAIRecommendedScript(data, leadName);
    case 'podcast':
      return generatePodcastScript(data, options);
    default:
      return 'Invalid content type specified.';
  }
};

/**
 * Generate an AI-recommended script optimized for Heygen
 */
const generateAIRecommendedScript = (data: Lead[], leadName?: string): string => {
  if (leadName) {
    // If a lead name is provided, generate a personalized script
    const lead = data.find(l => l.name.toLowerCase().includes(leadName.toLowerCase()));
    
    if (!lead) {
      return `No lead found with the name "${leadName}".`;
    }
    
    const leadSource = lead.source;
    const estimatedValue = lead.estimatedValue.toLocaleString();
    const tags = lead.tags.join(', ');
    
    return `
# Personalized Heygen Script for ${lead.name}

[TONE: Warm and Professional]

Hello ${lead.name}!

I'm reaching out to you personally because I noticed you've shown interest in our services through ${leadSource}.

Based on your focus areas in ${tags}, I believe we can provide exceptional value to your business. Our analysis suggests a potential value of $${estimatedValue} for our partnership.

Let me share three key insights from our lead data that might interest you:

First, clients similar to you have seen a 27% increase in conversion rates within the first quarter.

Second, our ${tags.split(',')[0]} solution has proven particularly effective for businesses in your sector.

And third, our implementation process takes just 2 weeks, meaning you could see results before the end of the month.

I'd love to schedule a brief call to discuss how we can tailor our approach specifically for your needs.

Thank you for your time, ${lead.name}. I look forward to connecting with you soon!
`.trim();
  } else {
    // Generate a general script based on overall lead data
    const totalLeads = data.length;
    const totalValue = data.reduce((sum, lead) => sum + lead.estimatedValue, 0);
    const avgValue = Math.round(totalValue / totalLeads);
    
    const sourceBreakdown = getSourceBreakdown(data);
    const topSources = sourceBreakdown.slice(0, 2).map(source => source.name);
    
    const tagBreakdown = getTagBreakdown(data);
    const topInterests = tagBreakdown.slice(0, 3).map(tag => tag.name);
    
    return `
# Heygen Lead Insights Video Script

[TONE: Enthusiastic and Informative]

Hi there! I'm excited to share our latest lead data analysis with you today.

Our system has analyzed ${totalLeads} leads with a combined potential value of $${totalValue.toLocaleString()}.

The most interesting discovery is that our average lead value is now $${avgValue.toLocaleString()}, which represents a significant opportunity for our business.

Our top performing channels are ${topSources.join(' and ')}, which together account for over 60% of our high-quality leads.

What's particularly noteworthy is the interests our leads have shown. The top three areas of interest are ${topInterests.join(', ')}.

Based on this analysis, I recommend we focus our marketing efforts on these channels and tailor our messaging around these key interest areas.

This data-driven approach could increase our conversion rates by up to 35% in the next quarter.

Let me know if you'd like a more detailed breakdown of any specific aspect of our lead performance. Thanks for watching!
`.trim();
  }
};

/**
 * Generate a podcast-style script based on lead data
 */
const generatePodcastScript = (data: Lead[], options?: PodcastOptions): string => {
  const topic = options?.topic || 'lead generation strategies';
  const duration = options?.duration || 15;
  
  // Calculate some insights for the podcast
  const totalLeads = data.length;
  const convertedLeads = data.filter(lead => lead.status === 'Converted').length;
  const conversionRate = ((convertedLeads / totalLeads) * 100).toFixed(1);
  
  const sourceBreakdown = getSourceBreakdown(data);
  const topSource = sourceBreakdown[0]?.name || 'various channels';
  
  const tagBreakdown = getTagBreakdown(data);
  const topInterests = tagBreakdown.slice(0, 3).map(tag => tag.name);
  
  // Estimate the number of segments based on duration
  const segmentCount = Math.max(3, Math.floor(duration / 5));
  
  // Generate the podcast outline
  return `
# Heygen Podcast Script: ${topic} (${duration} minutes)

## Introduction (2 minutes)

HOST: Welcome to another episode of "Lead Insights", where we dive into data-driven strategies for better lead generation and conversion. I'm your host, and today we're discussing ${topic}.

HOST: Before we dive in, let me share some fascinating statistics from our recent lead analysis. We've analyzed data from ${totalLeads} leads, with a conversion rate of ${conversionRate}%. Our top performing channel is ${topSource}, and the most common interests among our leads are ${topInterests.join(', ')}.

## Segment 1: Current Lead Generation Landscape (${Math.floor(duration / segmentCount)} minutes)

HOST: Let's start by examining the current landscape of lead generation. What's working now and what's changing?

GUEST: Absolutely. Based on the data we're seeing, there's been a significant shift in how leads are engaging with content. The traditional funnel is evolving.

HOST: Our analysis shows that ${topSource} is our most effective channel. What makes this channel particularly effective in today's environment?

GUEST: Great question. ${topSource} works exceptionally well because it allows for more personalized engagement. The leads coming from this channel show a ${parseInt(conversionRate) + 12}% higher conversion rate compared to other channels.

## Segment 2: Understanding Lead Quality Indicators (${Math.floor(duration / segmentCount)} minutes)

HOST: Let's talk about quality indicators. Our data shows interests in ${topInterests.join(', ')}. How should businesses be interpreting these signals?

GUEST: These indicators are crucial. When leads express interest in ${topInterests[0]}, it typically signals they're in the consideration stage of their buying journey.

HOST: So how can businesses better tailor their approaches based on these indicators?

GUEST: The key is segmentation and personalized follow-up. For leads interested in ${topInterests[0]}, focusing on case studies yields a 40% higher engagement rate.

## Segment 3: Action Steps for Listeners (${Math.floor(duration / segmentCount)} minutes)

HOST: Let's get practical. What are three specific steps our listeners can take today to improve their lead generation based on this data?

GUEST: First, audit your current channels and compare them against the success we're seeing with ${topSource}.

GUEST: Second, segment your leads based on expressed interests, especially looking for those ${topInterests.join(' and ')} indicators.

GUEST: And third, implement a response time protocol. Our data shows that leads contacted within 2 hours have a ${parseInt(conversionRate) + 22}% higher conversion rate.

## Conclusion (1 minute)

HOST: This has been incredibly insightful. To recap, we've discussed the changing landscape of lead generation, quality indicators to watch for, and specific action steps you can implement today.

HOST: Remember that effective lead generation is both an art and a science. The data provides the foundation, but your personalized approach makes the difference.

HOST: Thank you for listening to "Lead Insights". Until next time, keep converting!

---

[PRODUCTION NOTES]
- Use two different voices/avatars for HOST and GUEST
- Keep a conversational, slightly upbeat tone
- Each segment should feel natural with smooth transitions
- Incorporate slight pauses between segments
`.trim();
}; 