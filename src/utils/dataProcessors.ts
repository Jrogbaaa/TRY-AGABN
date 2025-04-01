import { Lead } from '../context/DataContext';

// Process and validate CSV data
export const processCSVData = (csvText: string): Lead[] => {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  
  const requiredFields = ['id', 'name', 'email', 'source', 'initialContact', 'status', 'conversionProbability', 'estimatedValue'];
  const missingFields = requiredFields.filter(field => !headers.includes(field));
  
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }
  
  return lines.slice(1).map((line) => {
    const values = line.split(',').map(value => value.trim());
    const lead: Record<string, any> = {};
    
    headers.forEach((header, i) => {
      if (values[i] !== undefined) {
        if (header === 'tags') {
          lead[header] = values[i].split(';').map(tag => tag.trim());
        } else if (header === 'conversionProbability' || header === 'estimatedValue') {
          lead[header] = parseFloat(values[i]);
        } else {
          lead[header] = values[i];
        }
      }
    });
    
    // Set default values for interaction history if not present
    if (!lead.interactionHistory) {
      lead.interactionHistory = [];
    }
    
    // Set default tags if not present
    if (!lead.tags) {
      lead.tags = [];
    }
    
    return lead as Lead;
  });
};

// Process and validate JSON data
export const processJSONData = (jsonData: any): Lead[] => {
  if (!Array.isArray(jsonData)) {
    throw new Error('Invalid JSON data. Expected an array of leads.');
  }
  
  return jsonData.map((lead, index) => {
    // Check for required fields
    const requiredFields = ['id', 'name', 'email', 'source', 'initialContact', 'status', 'conversionProbability', 'estimatedValue'];
    const missingFields = requiredFields.filter(field => lead[field] === undefined);
    
    if (missingFields.length > 0) {
      throw new Error(`Lead at index ${index} is missing required fields: ${missingFields.join(', ')}`);
    }
    
    // Ensure interactionHistory is an array
    if (!lead.interactionHistory || !Array.isArray(lead.interactionHistory)) {
      lead.interactionHistory = [];
    }
    
    // Ensure tags is an array
    if (!lead.tags || !Array.isArray(lead.tags)) {
      lead.tags = [];
    }
    
    return lead as Lead;
  });
};

// Generate demo/mock data programmatically
export const generateMockData = (count: number): Lead[] => {
  const sources = ['LinkedIn', 'Website', 'Referral', 'Conference', 'Advertisement', 'Webinar', 'Cold Call', 'Email Campaign'];
  const statuses = ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Converted', 'Disqualified'];
  const interactionTypes = ['Email', 'Call', 'Meeting', 'Demo', 'InPerson', 'WebForm'];
  const responses = ['Positive', 'Neutral', 'Negative', 'Interested', 'Converted'];
  const tags = ['enterprise', 'small-business', 'mid-size', 'technology', 'healthcare', 'finance', 'education', 'retail', 'high-value', 'marketing', 'sales', 'growth'];
  
  const randomDate = (start: Date, end: Date) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
  };
  
  const randomElement = <T>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
  };
  
  const randomName = () => {
    const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'Robert', 'Amanda', 'William', 'Elizabeth'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson'];
    return `${randomElement(firstNames)} ${randomElement(lastNames)}`;
  };
  
  const randomEmail = (name: string) => {
    const domains = ['example.com', 'company.org', 'business.net', 'enterprise.io', 'corp.co', 'startup.tech'];
    const simpleName = name.toLowerCase().replace(' ', '.').replace(/[^a-z.]/g, '');
    return `${simpleName}@${randomElement(domains)}`;
  };
  
  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(endDate.getMonth() - 3); // Generate data for the last 3 months
  
  return Array.from({ length: count }, (_, i) => {
    const name = randomName();
    const initialContact = randomDate(startDate, endDate);
    const initialContactDate = new Date(initialContact);
    
    // Generate 0-3 interaction history items
    const interactionCount = Math.floor(Math.random() * 4);
    const interactionHistory = Array.from({ length: interactionCount }, (_, j) => {
      const interactionDate = new Date(initialContactDate);
      interactionDate.setDate(initialContactDate.getDate() + j + 1);
      
      return {
        date: interactionDate.toISOString(),
        type: randomElement(interactionTypes),
        response: randomElement(responses)
      };
    });
    
    // Generate 1-3 random tags
    const tagCount = Math.floor(Math.random() * 3) + 1;
    const selectedTags: string[] = [];
    for (let j = 0; j < tagCount; j++) {
      const tag = randomElement(tags);
      if (!selectedTags.includes(tag)) {
        selectedTags.push(tag);
      }
    }
    
    // Generate random conversion probability and estimated value
    const conversionProbability = Math.round(Math.random() * 100) / 100;
    const estimatedValue = Math.floor(Math.random() * 20000) + 1000;
    
    return {
      id: `lead-${String(i + 1).padStart(3, '0')}`,
      name,
      email: randomEmail(name),
      source: randomElement(sources),
      initialContact,
      status: randomElement(statuses),
      interactionHistory,
      tags: selectedTags,
      conversionProbability,
      estimatedValue
    };
  });
}; 