import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '@shared/schema';
import ChatMessageComponent from './chat-message';
import VoiceVisualizer from './voice-visualizer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Mic, MicOff, SmilePlus } from 'lucide-react';
import { Loader2 } from 'lucide-react';

interface ChatWindowProps {
  messages: ChatMessage[];
  isLoading: boolean;
  inputMessage: string;
  setInputMessage: (message: string) => void;
  handleSendMessage: () => void;
  isRecording: boolean;
  setIsRecording: (isRecording: boolean) => void;
}

export default function ChatWindow({
  messages,
  isLoading,
  inputMessage,
  setInputMessage,
  handleSendMessage,
  isRecording,
  setIsRecording
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Handle Enter key to send message
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && inputMessage.trim()) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Toggle voice recording
  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-neutral-200">
      <div className="bg-primary-500 text-white p-4 flex items-center justify-between">
        <h3 className="font-semibold">Mental Health Companion</h3>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <i className="ri-volume-up-line"></i>
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <i className="ri-information-line"></i>
          </Button>
        </div>
      </div>
      
      {/* Chat messages container */}
      <div className="chat-container h-[400px] overflow-y-auto p-4 flex flex-col space-y-4">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-neutral-400">
            <i className="ri-message-3-line text-4xl mb-2"></i>
            <p>Start a conversation with your mental health companion</p>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessageComponent key={message.id} message={message} />
          ))
        )}
        
        {isLoading && (
          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mr-2">
              <i className="ri-mental-health-line text-primary-600"></i>
            </div>
            <div className="chat-message bg-neutral-100 rounded-lg p-3 rounded-tl-none">
              <Loader2 className="h-5 w-5 animate-spin text-primary-500" />
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Voice input visualizer */}
      <VoiceVisualizer isActive={isRecording} />
      
      {/* Chat input */}
      <div className="p-4 border-t border-neutral-200">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`text-neutral-500 hover:bg-neutral-100 mr-2 ${isRecording ? 'text-red-500' : ''}`}
            onClick={toggleRecording}
          >
            {isRecording ? <MicOff /> : <Mic />}
          </Button>
          <div className="flex-1 relative">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="pr-10"
              disabled={isRecording}
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-primary-500"
            >
              <SmilePlus size={18} />
            </Button>
          </div>
          <Button 
            variant="default" 
            size="icon"
            className="ml-2 bg-primary-500 hover:bg-primary-600"
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
