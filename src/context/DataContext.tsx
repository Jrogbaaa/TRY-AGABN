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
    getConversionsByTimeFrame
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