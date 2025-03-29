import { ChatMessage } from '@shared/schema';

interface ChatMessageProps {
  message: ChatMessage;
}

export default function ChatMessageComponent({ message }: ChatMessageProps) {
  if (message.isUser) {
    return (
      <div className="flex items-start justify-end">
        <div className="chat-message bg-primary-500 text-white rounded-lg p-3 rounded-tr-none max-w-[80%] animate-in fade-in slide-in-from-bottom-5 duration-300">
          <p>{message.content}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex items-start">
      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mr-2">
        <i className="ri-mental-health-line text-primary-600"></i>
      </div>
      <div className="chat-message bg-neutral-100 rounded-lg p-3 rounded-tl-none max-w-[80%] animate-in fade-in slide-in-from-bottom-5 duration-300">
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
}
