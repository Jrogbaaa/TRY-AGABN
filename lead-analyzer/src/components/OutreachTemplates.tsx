import React, { useState } from 'react';
import { useData, Lead } from '../context/DataContext';

interface TemplateProps {
  lead: Lead;
}

const EmailTemplate: React.FC<TemplateProps> = ({ lead }) => {
  const bestTime = lead.optimalContactTimes?.[0];
  const [copied, setCopied] = useState(false);

  const template = `Subject: Personalized Solutions for ${lead.name}

Hi ${lead.name.split(' ')[0]},

I hope this email finds you well. I noticed from your engagement with our content that you're interested in ${lead.tags[0] || 'our solutions'}.

Based on our analysis, companies similar to yours have seen significant improvements in their metrics after implementing our platform. I'd love to show you specifically how we can help with your unique challenges.

${bestTime ? `I'd like to suggest a quick 20-minute call on ${bestTime.day} between ${bestTime.timeRange}, which our data suggests might be convenient for you.` : 'I'd like to suggest a quick 20-minute call next week to discuss how we can help.'}

Would any of these times work for your schedule?

Looking forward to connecting,

[Your Name]
[Your Title]
[Your Phone]`;

  const handleCopy = () => {
    navigator.clipboard.writeText(template);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-md font-semibold text-gray-800 dark:text-white">Email Template</h4>
        <button
          onClick={handleCopy}
          className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 dark:text-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-label="Copy email template"
          tabIndex={0}
        >
          {copied ? (
            <>
              <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md border border-gray-200 dark:border-gray-700 whitespace-pre-wrap text-sm text-gray-600 dark:text-gray-300 font-mono">
        {template}
      </div>
    </div>
  );
};

const LinkedInTemplate: React.FC<TemplateProps> = ({ lead }) => {
  const [copied, setCopied] = useState(false);

  const template = `Hi ${lead.name.split(' ')[0]},

I came across your profile and noticed your work at ${lead.source.includes('Company') ? lead.source : 'your company'}. I'm reaching out because our platform has helped similar companies in the ${lead.tags[0] || 'industry'} space improve their results by up to 30%.

I'd love to share some specific insights we've gathered that might be valuable for your team. Are you open to a brief conversation?

Looking forward to connecting,
[Your Name]`;

  const handleCopy = () => {
    navigator.clipboard.writeText(template);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-md font-semibold text-gray-800 dark:text-white">LinkedIn Message</h4>
        <button
          onClick={handleCopy}
          className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 dark:text-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-label="Copy LinkedIn template"
          tabIndex={0}
        >
          {copied ? (
            <>
              <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md border border-gray-200 dark:border-gray-700 whitespace-pre-wrap text-sm text-gray-600 dark:text-gray-300 font-mono">
        {template}
      </div>
    </div>
  );
};

const OutreachTemplates: React.FC = () => {
  const { leads } = useData();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [templateCategory, setTemplateCategory] = useState<'email' | 'linkedin'>('email');

  if (!leads || leads.length === 0) {
    return (
      <div className="card p-6 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          No lead data available for outreach templates.
        </p>
      </div>
    );
  }

  // Sort leads by score (if available) or estimated value
  const sortedLeads = [...leads].sort((a, b) => {
    if (a.score !== undefined && b.score !== undefined) {
      return b.score - a.score;
    }
    return b.estimatedValue - a.estimatedValue;
  });

  // Select the first lead by default if none is selected
  if (!selectedLead && sortedLeads.length > 0) {
    setSelectedLead(sortedLeads[0]);
  }

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Outreach Templates</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lead selection sidebar */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Select Lead</h3>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
              {sortedLeads.map(lead => (
                <button
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className={`w-full text-left p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    selectedLead?.id === lead.id ? 'bg-blue-50 dark:bg-blue-900 dark:bg-opacity-40' : ''
                  }`}
                  aria-label={`Select ${lead.name}`}
                  tabIndex={0}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{lead.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{lead.source}</div>
                    </div>
                    {lead.score !== undefined && (
                      <div className={`text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center text-white ${
                        lead.score >= 80 ? 'bg-green-500' :
                        lead.score >= 60 ? 'bg-lime-500' :
                        lead.score >= 40 ? 'bg-yellow-500' :
                        lead.score >= 20 ? 'bg-orange-500' :
                        'bg-red-500'
                      }`}>
                        {lead.score}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Template content */}
          <div className="lg:col-span-2">
            {selectedLead ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                    Templates for {selectedLead.name}
                  </h3>
                  
                  <div className="flex space-x-2 mb-6">
                    <button
                      onClick={() => setTemplateCategory('email')}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        templateCategory === 'email'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                      }`}
                      aria-label="Select email template"
                      tabIndex={0}
                    >
                      Email
                    </button>
                    <button
                      onClick={() => setTemplateCategory('linkedin')}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        templateCategory === 'linkedin'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                      }`}
                      aria-label="Select LinkedIn template"
                      tabIndex={0}
                    >
                      LinkedIn
                    </button>
                  </div>
                  
                  {templateCategory === 'email' ? (
                    <EmailTemplate lead={selectedLead} />
                  ) : (
                    <LinkedInTemplate lead={selectedLead} />
                  )}
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 p-4 rounded-md border border-yellow-200 dark:border-yellow-800">
                  <div className="flex">
                    <svg className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                      <h4 className="font-medium text-yellow-800 dark:text-yellow-400 text-sm">Outreach Best Practices</h4>
                      <ul className="mt-2 text-sm text-yellow-700 dark:text-yellow-300 list-disc pl-5 space-y-1">
                        <li>Personalize templates with specific details from the lead's profile</li>
                        <li>Reference specific pain points related to their industry</li>
                        <li>Keep initial outreach concise and focused on value</li>
                        {selectedLead.optimalContactTimes && selectedLead.optimalContactTimes.length > 0 && (
                          <li>Reach out on {selectedLead.optimalContactTimes[0].day} during {selectedLead.optimalContactTimes[0].timeRange} for best response rates</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full p-8 text-gray-500 dark:text-gray-400">
                Select a lead to view outreach templates
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutreachTemplates;
