import React, { useState } from 'react';
import { useData, Lead } from '../context/DataContext';

interface TemplateProps {
  lead: Lead;
}

const EmailTemplate: React.FC<TemplateProps> = ({ lead }) => {
  const bestTime = lead.optimalContactTimes?.[0];
  const [copied, setCopied] = useState(false);

  const template = "Sample email template";

  const handleCopy = () => {
    navigator.clipboard.writeText(template);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>Email Template</div>
  );
};

const LinkedInTemplate: React.FC<TemplateProps> = ({ lead }) => {
  const [copied, setCopied] = useState(false);

  const template = "Sample LinkedIn template";

  const handleCopy = () => {
    navigator.clipboard.writeText(template);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>LinkedIn Template</div>
  );
};

const OutreachTemplates: React.FC = () => {
  const { leads } = useData();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [templateCategory, setTemplateCategory] = useState<'email' | 'linkedin'>('email');

  if (!leads || leads.length === 0) {
    return (
      <div>No lead data available for outreach templates.</div>
    );
  }

  return (
    <div>Outreach Templates</div>
  );
};

export default OutreachTemplates; 