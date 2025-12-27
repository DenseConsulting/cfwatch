import { useState, useCallback } from 'react';
import { Message, ChatState, OpenAIResponse } from '../types/chat';
const SYSTEM_PROMPT = `You are a helpful legal assistant for Civil Forfeiture Watch. 
Help users understand civil asset forfeiture, explain deadlines and procedures, and guide them on when to seek attorney help. 
Provide general information, not specific legal advice. 
Be professional, empathetic, and clear. 
If a user asks for legal representation, direct them to the "Find an Attorney" page.`;
const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: "Hello! I'm the Civil Forfeiture Watch assistant. I can help answer questions about seizure notices, forfeiture procedures, or help you find an attorney. How can I assist you today?"
};
export function useOpenAI() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [INITIAL_MESSAGE],
    isLoading: false,
    error: null
  });
  const sendMessage = useCallback(async (content: string) => {
    // Add user message immediately
    const userMessage: Message = {
      role: 'user',
      content
    };
    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null
    }));
    try {
      // Prepare messages for API (including system prompt)
      const apiMessages = [{
        role: 'system',
        content: SYSTEM_PROMPT
      }, ...chatState.messages.filter(m => m.role !== 'system'),
      // Previous history
      userMessage];
      const response = await fetch('https://requests.magicpatterns.com/openai/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-4-turbo',
          messages: apiMessages,
          stream: false
        })
      });
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const data: OpenAIResponse = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.choices[0]?.message?.content || 'I apologize, but I could not generate a response at this time.'
      };
      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false
      }));
    } catch (error) {
      console.error('OpenAI API Error:', error);
      setChatState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Sorry, I encountered an error connecting to the service. Please try again later.'
      }));
    }
  }, [chatState.messages]);
  const resetChat = useCallback(() => {
    setChatState({
      messages: [INITIAL_MESSAGE],
      isLoading: false,
      error: null
    });
  }, []);
  return {
    messages: chatState.messages,
    isLoading: chatState.isLoading,
    error: chatState.error,
    sendMessage,
    resetChat
  };
}