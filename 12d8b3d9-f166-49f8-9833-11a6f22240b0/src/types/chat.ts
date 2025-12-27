export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}
export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}
export interface OpenAIResponse {
  id: string;
  choices: {
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
}