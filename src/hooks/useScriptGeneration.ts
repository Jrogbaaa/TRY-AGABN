import { useState, useCallback } from 'react';
import { Lead } from '../context/DataContext';
import { scriptTemplates, generateScript, ScriptTemplate } from '../utils/scriptTemplates';

interface ScriptGenerationState {
  selectedTemplateId: string;
  leadName: string;
  generatedScript: string;
  isCopied: boolean;
  availableTemplates: ScriptTemplate[];
}

interface ScriptGenerationResult extends ScriptGenerationState {
  selectTemplate: (templateId: string) => void;
  setLeadName: (name: string) => void;
  generateNewScript: () => void;
  copyToClipboard: () => Promise<void>;
}

export const useScriptGeneration = (leads: Lead[]): ScriptGenerationResult => {
  const [state, setState] = useState<ScriptGenerationState>({
    selectedTemplateId: scriptTemplates[0]?.id || '',
    leadName: '',
    generatedScript: '',
    isCopied: false,
    availableTemplates: scriptTemplates
  });

  // Select a template
  const selectTemplate = useCallback((templateId: string) => {
    setState(prev => ({
      ...prev,
      selectedTemplateId: templateId,
      // Reset copied state when changing templates
      isCopied: false
    }));
  }, []);

  // Set lead name for personalized templates
  const setLeadName = useCallback((name: string) => {
    setState(prev => ({
      ...prev,
      leadName: name,
      // Reset copied state when changing lead name
      isCopied: false
    }));
  }, []);

  // Generate a new script based on current template and data
  const generateNewScript = useCallback(() => {
    if (!leads || leads.length === 0) {
      setState(prev => ({
        ...prev,
        generatedScript: 'No lead data available for script generation.',
        isCopied: false
      }));
      return;
    }

    const script = generateScript(
      state.selectedTemplateId,
      leads,
      state.leadName
    );

    setState(prev => ({
      ...prev,
      generatedScript: script,
      isCopied: false
    }));
  }, [leads, state.selectedTemplateId, state.leadName]);

  // Copy the generated script to clipboard
  const copyToClipboard = useCallback(async () => {
    if (!state.generatedScript) {
      return;
    }

    try {
      await navigator.clipboard.writeText(state.generatedScript);
      
      setState(prev => ({
        ...prev,
        isCopied: true
      }));
      
      // Reset the copied state after 3 seconds
      setTimeout(() => {
        setState(prev => ({
          ...prev,
          isCopied: false
        }));
      }, 3000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }, [state.generatedScript]);

  return {
    ...state,
    selectTemplate,
    setLeadName,
    generateNewScript,
    copyToClipboard
  };
}; 