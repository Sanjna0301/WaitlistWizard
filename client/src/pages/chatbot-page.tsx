import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ChatWindow from '@/components/chatbot/chat-window';
import SpeechRecognition from '@/components/ui/speech-recognition';
import { ChatMessage } from '@shared/schema';
import { sendChatMessage, processVoiceInput } from '@/lib/gemini';

export default function ChatbotPage() {
  const { user } = useAuth();
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const queryClient = useQueryClient();
  
  // Fetch chat history
  const { data: chatHistory = [], isLoading } = useQuery<ChatMessage[]>({
    queryKey: ['/api/chat'],
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
  
  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: sendChatMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/chat'] });
    },
  });
  
  // Voice input mutation
  const voiceInputMutation = useMutation({
    mutationFn: processVoiceInput,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/chat'] });
    },
  });
  
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Optimistically add user message to UI
    queryClient.setQueryData(['/api/chat'], (old: ChatMessage[] = []) => [
      ...old,
      {
        id: Date.now(),
        userId: user?.id || 0,
        isUser: true,
        content: inputMessage,
        timestamp: new Date(),
      },
    ]);
    
    sendMessageMutation.mutate(inputMessage);
    setInputMessage('');
  };
  
  const handleVoiceInput = (text: string) => {
    if (!text) return;
    
    // Optimistically add user voice message to UI
    queryClient.setQueryData(['/api/chat'], (old: ChatMessage[] = []) => [
      ...old,
      {
        id: Date.now(),
        userId: user?.id || 0,
        isUser: true,
        content: text,
        timestamp: new Date(),
      },
    ]);
    
    voiceInputMutation.mutate(text);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary-800 mb-2">AI Mental Health Companion</h1>
            <p className="text-neutral-600">Have a conversation with our AI companion about your mental health concerns.</p>
          </div>
          
          <ChatWindow 
            messages={chatHistory}
            isLoading={isLoading || sendMessageMutation.isPending || voiceInputMutation.isPending}
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            handleSendMessage={handleSendMessage}
            isRecording={isRecording}
            setIsRecording={setIsRecording}
          />
          
          <SpeechRecognition 
            onResult={handleVoiceInput} 
            isRecording={isRecording}
            setIsRecording={setIsRecording}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
