import { ChatMessage } from '@shared/schema';
import { apiRequest } from './queryClient';

// Function to send a message to the AI and get a response
export async function sendChatMessage(content: string): Promise<ChatMessage> {
  const response = await apiRequest('POST', '/api/chat', { content });
  return await response.json();
}

// Function to process voice input
export async function processVoiceInput(text: string): Promise<ChatMessage> {
  const response = await apiRequest('POST', '/api/voice', { text });
  return await response.json();
}

// Function to get SOS emergency information
export async function getEmergencyInfo() {
  const response = await fetch('/api/sos');
  return await response.json();
}
