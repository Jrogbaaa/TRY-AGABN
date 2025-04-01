import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define the Lead type based on the mock data structure
export type InteractionHistory = {
  date: string;
  type: string;
  response: string;
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  source: string;
  initialContact: string;
  status: string;
  interactionHistory: InteractionHistory[];
  tags: string[];
  conversionProbability: number;
  estimatedValue: number;
  score?: number;
  optimalContactTimes?: {
    day: string;
    timeRange: string;
    confidence: number;
  }[];
};

// Define the context state type
type DataContextState = {
  leads: Lead[];
  isLoading: boolean;
  error: string | null;
  loadLeads: () => Promise<void>;
  uploadLeads: (leadsData: Lead[]) => void;
  filterLeadsBySource: (source: string) => Lead[];
  filterLeadsByStatus: (status: string) => Lead[];
  getTotalLeadValue: () => number;
  getAverageConversionProbability: () => number;
  getLeadsByTag: (tag: string) => Lead[];
  getMostCommonSource: () => { source: string; count: number };
  getConversionsByTimeFrame: (days: number) => { date: string; count: number }[];
  calculateLeadScores: () => void;
  getLeadsByScoreRange: (min: number, max: number) => Lead[];
  getOptimalContactTimes: (leadId: string) => { day: string; timeRange: string; confidence: number }[] | undefined;
};

// Create the context with default values
const DataContext = createContext<DataContextState | undefined>(undefined);

// Create a provider component
export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load mock data on component mount
  useEffect(() => {
    loadLeads();
  }, []);

  // Load leads from mock data
  const loadLeads = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/mock-data/leads.json');
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setLeads(data);
    } catch (err) {
      setError((err as Error).message || 'Failed to load lead data');
      console.error('Error loading leads:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Upload leads from user input
  const uploadLeads = (leadsData: Lead[]) => {
    setLeads(leadsData);
  };

  // Filter leads by source
  const filterLeadsBySource = (source: string) => {
    return leads.filter(lead => lead.source === source);
  };

  // Filter leads by status
  const filterLeadsByStatus = (status: string) => {
    return leads.filter(lead => lead.status === status);
  };

  // Calculate total estimated value of all leads
  const getTotalLeadValue = () => {
    return leads.reduce((total, lead) => total + lead.estimatedValue, 0);
  };

  // Calculate average conversion probability
  const getAverageConversionProbability = () => {
    if (leads.length === 0) return 0;
    const sum = leads.reduce((total, lead) => total + lead.conversionProbability, 0);
    return sum / leads.length;
  };

  // Get leads by tag
  const getLeadsByTag = (tag: string) => {
    return leads.filter(lead => lead.tags.includes(tag));
  };

  // Get most common lead source
  const getMostCommonSource = () => {
    const sourceCounts: Record<string, number> = {};
    
    leads.forEach(lead => {
      sourceCounts[lead.source] = (sourceCounts[lead.source] || 0) + 1;
    });
    
    let maxSource = '';
    let maxCount = 0;
    
    Object.entries(sourceCounts).forEach(([source, count]) => {
      if (count > maxCount) {
        maxSource = source;
        maxCount = count;
      }
    });
    
    return { source: maxSource, count: maxCount };
  };

  // Get conversions by time frame (last X days)
  const getConversionsByTimeFrame = (days: number) => {
    const now = new Date();
    const startDate = new Date(now);
    startDate.setDate(now.getDate() - days);
    
    const filteredLeads = leads.filter(lead => {
      const contactDate = new Date(lead.initialContact);
      return contactDate >= startDate && contactDate <= now;
    });
    
    // Group by date
    const conversionsByDate: Record<string, number> = {};
    
    filteredLeads.forEach(lead => {
      const date = new Date(lead.initialContact).toISOString().split('T')[0];
      conversionsByDate[date] = (conversionsByDate[date] || 0) + 1;
    });
    
    // Convert to array for charting
    return Object.entries(conversionsByDate).map(([date, count]) => ({
      date,
      count
    })).sort((a, b) => a.date.localeCompare(b.date));
  };

  // Calculate scores for all leads based on engagement, conversion probability, and estimated value
  const calculateLeadScores = () => {
    const scoredLeads = leads.map(lead => {
      // Calculate score based on multiple factors
      const engagementScore = calculateEngagementScore(lead);
      const valueScore = calculateValueScore(lead);
      const conversionScore = lead.conversionProbability * 30; // Scale to roughly 0-30 range
      
      // Generate optimal contact times if not already present
      const optimalContactTimes = lead.optimalContactTimes || generateOptimalContactTimes(lead);
      
      // Calculate final score (0-100 range)
      const totalScore = Math.min(100, Math.round(engagementScore + valueScore + conversionScore));
      
      return { 
        ...lead, 
        score: totalScore,
        optimalContactTimes
      };
    });
    
    setLeads(scoredLeads);
  };
  
  // Helper function to calculate engagement score (0-40 range)
  const calculateEngagementScore = (lead: Lead): number => {
    const interactionCount = lead.interactionHistory.length;
    const positiveInteractions = lead.interactionHistory.filter(
      interaction => interaction.response === 'Positive'
    ).length;
    
    // Calculate engagement from interaction history
    const engagementBase = Math.min(20, interactionCount * 3);
    const responsiveness = interactionCount > 0 
      ? (positiveInteractions / interactionCount) * 20 
      : 0;
    
    return Math.round(engagementBase + responsiveness);
  };
  
  // Helper function to calculate value score (0-30 range)
  const calculateValueScore = (lead: Lead): number => {
    // Score based on estimated value (assumes most leads are between $0-50,000)
    // Adjust this scale based on typical value range for your business
    const valueScore = Math.min(30, (lead.estimatedValue / 50000) * 30);
    return Math.round(valueScore);
  };
  
  // Generate optimal contact times based on lead data
  const generateOptimalContactTimes = (lead: Lead) => {
    // This would ideally use actual interaction data patterns
    // For now, generate some plausible times based on lead properties
    
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const times = ['9:00 AM - 11:00 AM', '1:00 PM - 3:00 PM', '3:00 PM - 5:00 PM'];
    
    // Use lead properties to determine likely best days/times
    // This is a simplified example - in reality would use more sophisticated analysis
    const source = lead.source.toLowerCase();
    let preferredDays: string[] = [];
    
    if (source.includes('linkedin')) {
      preferredDays = ['Tuesday', 'Thursday'];
    } else if (source.includes('email') || source.includes('newsletter')) {
      preferredDays = ['Monday', 'Wednesday', 'Friday'];
    } else {
      // Select 2-3 random days if no specific pattern
      preferredDays = days.sort(() => 0.5 - Math.random()).slice(0, 2 + Math.floor(Math.random() * 2));
    }
    
    // Generate 2-3 optimal contact windows
    return preferredDays.map(day => {
      const randomTimeIndex = Math.floor(Math.random() * times.length);
      return {
        day,
        timeRange: times[randomTimeIndex],
        confidence: 70 + Math.floor(Math.random() * 20) // 70-90% confidence
      };
    });
  };

  // Filter leads by score range
  const getLeadsByScoreRange = (min: number, max: number) => {
    return leads.filter(lead => {
      if (!lead.score) return false;
      return lead.score >= min && lead.score <= max;
    });
  };
  
  // Get optimal contact times for a specific lead
  const getOptimalContactTimes = (leadId: string) => {
    const lead = leads.find(lead => lead.id === leadId);
    return lead?.optimalContactTimes;
  };

  const value = {
    leads,
    isLoading,
    error,
    loadLeads,
    uploadLeads,
    filterLeadsBySource,
    filterLeadsByStatus,
    getTotalLeadValue,
    getAverageConversionProbability,
    getLeadsByTag,
    getMostCommonSource,
    getConversionsByTimeFrame,
    calculateLeadScores,
    getLeadsByScoreRange,
    getOptimalContactTimes
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// Create a custom hook to use the context
export const useData = () => {
  const context = useContext(DataContext);
  
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  
  return context;
}; 