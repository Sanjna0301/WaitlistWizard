import { useEffect, useState } from 'react';

interface SpeechRecognitionProps {
  onResult: (text: string) => void;
  isRecording: boolean;
  setIsRecording: (isRecording: boolean) => void;
}

// Create a type for the Web Speech API
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item: (index: number) => SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item: (index: number) => SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

// Define window with SpeechRecognition
interface WindowWithSpeechRecognition extends Window {
  SpeechRecognition: new () => SpeechRecognition;
  webkitSpeechRecognition: new () => SpeechRecognition;
}

export default function SpeechRecognition({ onResult, isRecording, setIsRecording }: SpeechRecognitionProps) {
  const [transcript, setTranscript] = useState<string>('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState<boolean>(true);

  useEffect(() => {
    // Check if speech recognition is supported
    const windowWithSpeech = window as unknown as WindowWithSpeechRecognition;
    const SpeechRecognitionAPI = windowWithSpeech.SpeechRecognition || windowWithSpeech.webkitSpeechRecognition;
    
    if (!SpeechRecognitionAPI) {
      setIsSupported(false);
      setError('Speech recognition is not supported in your browser.');
      return;
    }
    
    const recognitionInstance = new SpeechRecognitionAPI();
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = 'en-US';
    
    recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        }
      }
      
      if (finalTranscript) {
        setTranscript(finalTranscript);
        onResult(finalTranscript);
        recognitionInstance.stop();
        setIsRecording(false);
      }
    };
    
    recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
      setError(`Error occurred in recognition: ${event.error}`);
      setIsRecording(false);
    };
    
    recognitionInstance.onend = () => {
      setIsRecording(false);
    };
    
    setRecognition(recognitionInstance);
    
    return () => {
      if (recognitionInstance) {
        recognitionInstance.stop();
      }
    };
  }, [onResult, setIsRecording]);
  
  useEffect(() => {
    if (!recognition) return;
    
    if (isRecording) {
      try {
        recognition.start();
        setError(null);
      } catch (err) {
        setError('Error starting speech recognition.');
        setIsRecording(false);
      }
    } else {
      recognition.stop();
    }
  }, [isRecording, recognition, setIsRecording]);
  
  return null; // This component doesn't render UI elements
}
