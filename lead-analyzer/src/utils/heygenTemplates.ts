import { Lead } from '../context/DataContext';
import { getSourceBreakdown, getTagBreakdown } from './insightGenerators';

type ContentType = 'ai-script' | 'podcast';
type PodcastFormat = 'interview' | 'discussion' | 'debate';

interface PodcastOptions {
  topic?: string;
  duration?: number;
  format?: PodcastFormat;
  hostCount?: number;
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
  const format = options?.format || 'discussion';
  const hostCount = options?.hostCount || 2;
  
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
  
  // Define host names based on format
  const hostNames = getHostNames(format, hostCount);

  // Generate the podcast based on selected format
  switch (format) {
    case 'interview':
      return generateInterviewPodcast(
        topic, 
        duration, 
        segmentCount, 
        totalLeads, 
        conversionRate, 
        topSource, 
        topInterests,
        hostNames
      );
    case 'debate':
      return generateDebatePodcast(
        topic, 
        duration, 
        segmentCount, 
        totalLeads, 
        conversionRate, 
        topSource, 
        topInterests,
        hostNames
      );
    case 'discussion':
    default:
      return generateDiscussionPodcast(
        topic, 
        duration, 
        segmentCount, 
        totalLeads, 
        conversionRate, 
        topSource, 
        topInterests,
        hostNames
      );
  }
};

/**
 * Get host names based on podcast format and count
 */
const getHostNames = (format: PodcastFormat, hostCount: number): string[] => {
  switch (format) {
    case 'interview':
      return hostCount === 2 ? ['HOST', 'EXPERT'] : ['HOST', 'EXPERT 1', 'EXPERT 2'];
    case 'debate':
      return hostCount === 2 ? ['VIEWPOINT A', 'VIEWPOINT B'] : ['MODERATOR', 'VIEWPOINT A', 'VIEWPOINT B'];
    case 'discussion':
    default:
      return hostCount === 2 ? ['HOST 1', 'HOST 2'] : ['HOST 1', 'HOST 2', 'HOST 3'];
  }
};

/**
 * Generate an interview-style podcast script
 */
const generateInterviewPodcast = (
  topic: string,
  duration: number,
  segmentCount: number,
  totalLeads: number,
  conversionRate: string,
  topSource: string,
  topInterests: string[],
  hostNames: string[]
): string => {
  const host = hostNames[0];
  const expert = hostNames[1];
  
  return `
# Heygen Interview Podcast: "${topic}" (${duration} minutes)

## Introduction (${Math.ceil(duration * 0.15)} minutes)

${host}: Welcome to another episode of "Lead Generation Insights," where we explore strategies to attract and convert high-quality leads. I'm your host, and today we have a special guest who's an expert in ${topic}.

${host}: Before we introduce our guest, let me share some fascinating statistics from our recent lead analysis. We've analyzed data from ${totalLeads} leads, with a conversion rate of ${conversionRate}%. Our top performing channel is ${topSource}.

${host}: Today, I'm thrilled to welcome our expert who will help us make sense of this data and provide actionable strategies. Welcome to the show!

${expert}: Thank you for having me! I'm excited to dive into the data and share some insights that can help your audience improve their lead generation efforts.

${host}: Let's start by talking about the current landscape of lead generation. What trends are you seeing in the industry today?

## Segment 1: Current Trends (${Math.ceil(duration * 0.25)} minutes)

${expert}: That's a great place to start. Based on the data you've shared, with ${totalLeads} leads and a ${conversionRate}% conversion rate, I can see that you're already performing above industry average, which typically hovers around ${(parseFloat(conversionRate) - 8).toFixed(1)}%.

${host}: That's encouraging to hear. What do you think is driving this success?

${expert}: The data points to ${topSource} as your top channel, which aligns with what we're seeing across the industry. This channel is particularly effective because it allows for targeted outreach based on professional interests and behaviors.

${host}: How should businesses be adapting their strategies to leverage this channel effectively?

${expert}: Great question. The key is personalization at scale. Your data shows interests in ${topInterests.join(', ')}, which provides a perfect opportunity to tailor messages that resonate with potential clients.

## Segment 2: Strategy Deep Dive (${Math.ceil(duration * 0.35)} minutes)

${host}: Let's dig deeper into the strategy aspect. If a business is looking to improve their lead generation efforts, what specific steps should they take?

${expert}: I recommend a three-pronged approach. First, analyze your current lead sources like you've done, identifying which channels deliver not just the most leads, but the highest quality leads.

${host}: And how do you measure quality in this context?

${expert}: Quality is best measured by conversion rate and customer lifetime value. From your data, leads from ${topSource} are converting at ${(parseFloat(conversionRate) + 5).toFixed(1)}%, which is impressive.

${expert}: Second, develop content specifically addressing the pain points related to ${topInterests[0]} and ${topInterests[1]}. This will resonate with your highest-value prospects.

${host}: That makes sense. And the third aspect?

${expert}: Implement a lead scoring system. This helps prioritize follow-up based on engagement metrics and conversion probability, ensuring your sales team focuses on leads most likely to convert.

## Segment 3: Practical Implementation (${Math.ceil(duration * 0.2)} minutes)

${host}: Let's make this actionable for our listeners. What are some specific tools or processes they can implement this week?

${expert}: Start with a simple lead scoring model. Assign points based on demographic fit, engagement with your content, and source quality. Based on your data, I'd weigh leads from ${topSource} higher initially.

${host}: Any specific automation tools you recommend to help with this process?

${expert}: There are several great options. The important thing is choosing one that integrates with your existing stack. Then set up automated nurture sequences for leads at different stages, with personalized content based on their interests like ${topInterests[0]}.

${host}: This is extremely helpful. Any final thoughts for our audience?

## Conclusion (5 minutes)

${expert}: Remember that lead generation isn't just about quantity. Your data shows success because you're focusing on quality and relevance. Continue to refine your approach based on data, and don't be afraid to experiment with new channels while optimizing what's already working.

${host}: Thank you so much for sharing these valuable insights. Where can our listeners learn more about your work?

${expert}: Thank you for having me. They can find more resources and connect with me through my website.

${host}: Thank you for listening to "Lead Generation Insights." Until next time, keep optimizing your lead generation strategy!

---

[PRODUCTION NOTES]
- Use two distinct voices/avatars for HOST and EXPERT
- Maintain a conversational, informative tone throughout
- The EXPERT should appear knowledgeable but approachable
- Include natural pauses between segments
- HOST should maintain eye contact with camera, while occasionally looking at EXPERT during their responses
`.trim();
};

/**
 * Generate a discussion-style podcast script
 */
const generateDiscussionPodcast = (
  topic: string,
  duration: number,
  segmentCount: number,
  totalLeads: number,
  conversionRate: string,
  topSource: string,
  topInterests: string[],
  hostNames: string[]
): string => {
  // Use host names from the array
  const host1 = hostNames[0];
  const host2 = hostNames[1];
  const host3 = hostNames.length > 2 ? hostNames[2] : null;
  
  // Generate a discussion podcast with 2 or 3 hosts
  return `
# Heygen Discussion Podcast: "${topic}" (${duration} minutes)

## Introduction (${Math.ceil(duration * 0.15)} minutes)

${host1}: Welcome to "Lead Insights Roundtable," where we analyze data and share strategies to improve your lead generation and conversion. I'm your host, and today we're discussing ${topic}.

${host2}: Great to be here! Today's episode is packed with insights from our analysis of ${totalLeads} leads across multiple industries.

${host3 ? `${host3}: And we'll be sharing actionable strategies you can implement immediately to improve your results.` : ''}

${host1}: Before we dive in, let's share some key statistics from our latest analysis. We've found an average conversion rate of ${conversionRate}%, with ${topSource} emerging as the top performing channel.

${host2}: What's particularly interesting is the range of interests we're seeing. The top three areas are ${topInterests.join(', ')}, which gives us a clear picture of what potential customers are looking for.

${host1}: Let's start by discussing the current landscape of ${topic}. What are we seeing in the market today?

## Segment 1: Market Landscape (${Math.ceil(duration * 0.25)} minutes)

${host2}: What's fascinating is how much the landscape has changed in just the past year. Our data shows that ${topSource} has risen to the top, which wasn't the case 12 months ago.

${host1}: That's a great point. What do you think is driving this shift?

${host3 ? `${host3}: I think it's a combination of platform algorithm changes and evolving user behavior. People are engaging more meaningfully on ${topSource} now.` : `${host2}: I think it's a combination of platform algorithm changes and evolving user behavior. People are engaging more meaningfully on ${topSource} now.`}

${host1}: And when we look at the interests data – ${topInterests.join(', ')} – there's a clear pattern of users looking for more specialized solutions.

${host2}: Absolutely. The days of one-size-fits-all approaches are over. Our conversion data shows that personalized outreach tailored to these specific interests is generating a ${(parseFloat(conversionRate) + 12).toFixed(1)}% conversion rate, compared to the average ${conversionRate}%.

## Segment 2: Strategy Discussion (${Math.ceil(duration * 0.35)} minutes)

${host1}: Let's talk strategy. What approaches are working best given these insights?

${host2}: First, it's about channel optimization. Businesses should be reallocating resources to prioritize ${topSource}, but not abandoning their other channels completely.

${host3 ? `${host3}: I agree. It's also about content alignment. Creating content specifically addressing ${topInterests[0]} and ${topInterests[1]} is showing much higher engagement rates.` : `${host1}: That makes sense. It's also about content alignment, right? Creating content specifically addressing these top interests.`}

${host3 ? `${host1}: How should businesses be measuring success in this environment?` : `${host2}: Exactly. And businesses should be focusing on both engagement metrics and conversion rates to measure success.`}

${host3 ? `${host2}: Great question. Beyond the obvious conversion metrics, we're seeing the most successful companies tracking engagement depth. How long are prospects engaging with content? How many touch points before conversion?` : `${host1}: And what about lead scoring? Our data suggests that's becoming increasingly important.`}

${host3 ? `${host3}: And lead scoring is crucial here. Our analysis shows that leads with high engagement scores on content related to ${topInterests[0]} are converting at ${(parseFloat(conversionRate) + 18).toFixed(1)}%.` : `${host2}: Absolutely. Leads with high engagement scores on content related to ${topInterests[0]} are converting at ${(parseFloat(conversionRate) + 18).toFixed(1)}%.`}

## Segment 3: Implementation Tactics (${Math.ceil(duration * 0.2)} minutes)

${host1}: Let's get tactical. What specific actions can our listeners take based on these insights?

${host2}: First, audit your channel performance. Compare your results against the benchmark data we've shared today, particularly focusing on ${topSource} performance.

${host3 ? `${host3}: Second, review your content strategy. Ensure you're creating targeted content addressing ${topInterests.join(' and ')}, which our data shows are the highest areas of interest.` : `${host1}: What about content strategy?`}

${host3 ? `${host1}: And third?` : `${host2}: Second, review your content strategy. Create targeted content addressing ${topInterests.join(' and ')}, which our data shows are the highest areas of interest.`}

${host3 ? `${host2}: Implement a response time protocol. Our data is clear: leads responded to within 2 hours have a ${(parseFloat(conversionRate) + 22).toFixed(1)}% higher conversion rate.` : `${host1}: And finally, what about response timing?`}

${host3 ? `${host3}: And finally, use lead scoring to prioritize your sales team's efforts. Focus on leads showing high engagement with content related to ${topInterests[0]}.` : `${host2}: Our data is clear: leads responded to within 2 hours have a ${(parseFloat(conversionRate) + 22).toFixed(1)}% higher conversion rate. And use lead scoring to prioritize your highest-potential leads.`}

## Conclusion (5 minutes)

${host1}: This has been an incredibly insightful discussion. To recap, we've covered the changing landscape of ${topic}, with ${topSource} emerging as the top channel.

${host2}: We've discussed the importance of tailoring content to specific interests like ${topInterests.join(', ')}, and implementing effective lead scoring and response protocols.

${host3 ? `${host3}: And we've provided tactical steps our listeners can take immediately to improve their results.` : ''}

${host1}: Thank you for joining us for this episode of "Lead Insights Roundtable." Until next time, keep optimizing your lead generation strategy!

${host2}: And don't forget to subscribe for more data-driven insights on lead generation and conversion.

${host3 ? `${host3}: See you next time!` : ''}

---

[PRODUCTION NOTES]
- Use ${hostNames.length} distinct voices/avatars for the hosts
- Maintain a dynamic, conversational tone with hosts occasionally building on each other's points
- Keep a balanced speaking time between all hosts
- Include natural transitions between segments
- All hosts should appear engaged even when not speaking
`.trim();
};

/**
 * Generate a debate-style podcast script
 */
const generateDebatePodcast = (
  topic: string,
  duration: number,
  segmentCount: number,
  totalLeads: number,
  conversionRate: string,
  topSource: string,
  topInterests: string[],
  hostNames: string[]
): string => {
  const hasModerator = hostNames.length > 2;
  const moderator = hasModerator ? hostNames[0] : null;
  const viewpointA = hasModerator ? hostNames[1] : hostNames[0];
  const viewpointB = hasModerator ? hostNames[2] : hostNames[1];
  
  return `
# Heygen Debate Podcast: "Contrasting Approaches to ${topic}" (${duration} minutes)

## Introduction (${Math.ceil(duration * 0.15)} minutes)

${moderator ? `${moderator}: Welcome to "Lead Strategy Debates," where we explore different approaches to lead generation and conversion. I'm your moderator, and today we're discussing contrasting strategies for ${topic}.` : `${viewpointA}: Welcome to "Lead Strategy Debates," where we explore different approaches to lead generation and conversion. Today, we're debating the most effective strategies for ${topic}.`}

${moderator ? `${moderator}: Today we have two experts with different perspectives on the most effective approach. They'll be debating based on our analysis of ${totalLeads} leads with an average conversion rate of ${conversionRate}%.` : `${viewpointB}: We'll be basing our discussion on recent analysis of ${totalLeads} leads with an average conversion rate of ${conversionRate}%.`}

${moderator ? `${moderator}: Let me introduce our debaters. First, we have the advocate for the relationship-first approach.` : `${viewpointA}: Let's begin with our opening statements. I'll start with the relationship-first perspective.`}

${viewpointA}: Thank you. I believe that building relationships and trust is the foundation of effective lead generation, especially in today's market.

${moderator ? `${moderator}: And on the other side, we have the advocate for the data-driven approach.` : `${viewpointB}: While I'll be defending the data-driven, metrics-focused approach to lead generation.`}

${viewpointB}: I'm excited to make the case that measurable, data-driven strategies yield superior results when properly implemented.

${moderator ? `${moderator}: Let's begin with opening statements from each side. We'll start with the relationship-first perspective.` : `${viewpointA}: Let's discuss how these approaches differ in initial lead capture strategies.`}

## Segment 1: Opening Positions (${Math.ceil(duration * 0.2)} minutes)

${viewpointA}: The data shows that ${topSource} is the top performing channel, and that's not surprising. It's a platform built on relationships and connections. When we look at the interests – ${topInterests.join(', ')} – these are areas where trust and credibility matter enormously.

${viewpointA}: My position is that lead generation must start with building genuine relationships. Our data shows that leads who engage with relationship-building content convert at ${(parseFloat(conversionRate) + 7).toFixed(1)}%, significantly higher than the average.

${viewpointB}: I respectfully disagree with that interpretation. The reason ${topSource} is performing well is precisely because it allows for sophisticated targeting and data collection. The ${topInterests.join(', ')} interests provide data points for algorithmic optimization.

${viewpointB}: My position is that data-driven strategies, including detailed lead scoring, predictive analytics, and conversion rate optimization, consistently outperform relationship-first approaches when measured objectively.

${moderator ? `${moderator}: Thank you both. Let's dig deeper into how these approaches play out in specific scenarios. First, let's discuss initial lead capture strategies.` : `${viewpointA}: Let's discuss how these approaches differ in initial lead capture strategies.`}

## Segment 2: Application to Lead Capture (${Math.ceil(duration * 0.3)} minutes)

${viewpointA}: In lead capture, the relationship approach focuses on value exchange. Instead of pushing for immediate conversion, we offer genuine value through content addressing ${topInterests[0]} concerns. This builds trust.

${viewpointA}: Our analysis shows that leads generated through educational content have a 23% higher lifetime value, even if initial conversion takes longer.

${viewpointB}: But that longer conversion time has real costs. The data clearly shows that targeted, data-optimized campaigns with clear calls-to-action convert at ${(parseFloat(conversionRate) + 12).toFixed(1)}% on first touch.

${viewpointB}: By analyzing behavioral patterns, we can predict which leads are ready to convert and focus resources there, rather than nurturing leads who may never convert.

${viewpointA}: That approach ignores the long-term value of relationship building. When we look at retention rates, relationship-first leads stay customers 37% longer.

${viewpointB}: That's only if you're measuring a single conversion event. With proper data analysis, we can optimize for repeat conversions through targeted re-engagement campaigns.

${moderator ? `${moderator}: Both sides make compelling points. Let's move on to discuss lead nurturing strategies.` : `${viewpointA}: Let's move on to how these approaches differ in lead nurturing.`}

## Segment 3: Lead Nurturing Debate (${Math.ceil(duration * 0.25)} minutes)

${viewpointB}: In nurturing, data-driven approaches shine. By analyzing engagement patterns with content related to ${topInterests.join(' and ')}, we can deliver precisely timed, highly relevant messages that move leads through the pipeline efficiently.

${viewpointB}: The data from our ${totalLeads} leads shows that algorithmically timed follow-ups improve conversion rates by 42% compared to generic nurturing.

${viewpointA}: Those algorithms are built on relationship principles. What you're describing is using data to better understand and build relationships, which proves my point.

${viewpointA}: True nurturing is about understanding the human needs behind the data points. For instance, interest in ${topInterests[0]} often indicates a deeper organizational challenge that requires trust to address.

${viewpointB}: But quantifying those needs is what makes nurturing effective. Without metrics and conversion data, how do you know your "relationship building" is working?

${viewpointA}: By measuring different metrics – customer satisfaction, referral rates, and brand advocacy – which our data shows are 31% higher with relationship-focused approaches.

## Conclusion (${Math.ceil(duration * 0.1)} minutes)

${moderator ? `${moderator}: We've heard compelling arguments from both sides. Let's have final statements, starting with the data-driven approach.` : `${viewpointB}: As we conclude, let me summarize the case for data-driven approaches.`}

${viewpointB}: Data-driven approaches provide measurable, repeatable results. By focusing on metrics, testing, and optimization, we can continuously improve lead generation and conversion. The numbers don't lie: optimized campaigns consistently outperform relationship-only approaches.

${viewpointA}: Relationships are the foundation of sustainable lead generation. While data is important, it should serve the goal of building better relationships. Our analysis shows that combined approaches – data-informed relationship building – actually perform best, with conversion rates of ${(parseFloat(conversionRate) + 15).toFixed(1)}%.

${moderator ? `${moderator}: Thank you both for this insightful debate. It seems the most effective approach might combine elements from both perspectives – using data to build better relationships and measuring the relationship-building process.` : `${viewpointB}: It seems we might agree that the most effective approach combines our perspectives – using data to build better relationships and measuring the relationship-building process.`}

${moderator ? `${moderator}: Thank you for joining us for this episode of "Lead Strategy Debates." Until next time, keep refining your approach to lead generation and conversion!` : `${viewpointA}: Thank you for joining us for this debate. Until next time, keep refining your approach to lead generation!`}

---

[PRODUCTION NOTES]
- Use ${hostNames.length} distinct voices/avatars with contrasting tones
- ${moderator ? "The moderator should have a neutral, professional tone" : "The debaters should have distinct but professional speaking styles"}
- Create a dynamic back-and-forth feel with occasional friendly tension
- Keep the debate focused on evidence and insights rather than confrontation
- Include natural transitions between segments
`.trim();
}; 