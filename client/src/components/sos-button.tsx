import { useState } from 'react';
import { getEmergencyInfo } from '@/lib/gemini';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AlertTriangle, Phone } from 'lucide-react';

interface EmergencyInfo {
  helpline: string;
  resources: {
    name: string;
    steps?: string[];
    instructions?: string;
  }[];
}

export default function SosButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [emergencyInfo, setEmergencyInfo] = useState<EmergencyInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const fetchEmergencyInfo = async () => {
    if (emergencyInfo) return;
    
    setIsLoading(true);
    try {
      const data = await getEmergencyInfo();
      setEmergencyInfo(data);
    } catch (error) {
      console.error('Failed to fetch emergency information:', error);
      // Fallback info if API fails
      setEmergencyInfo({
        helpline: '1800 599 0019',
        resources: [
          {
            name: 'Breathing Exercise',
            steps: [
              'Breathe in slowly through your nose for 4 counts',
              'Hold your breath for 2 counts',
              'Exhale gently through your mouth for 6 counts',
              'Repeat this cycle 5 times'
            ]
          },
          {
            name: 'Crisis Intervention',
            instructions: 'If you\'re experiencing a mental health emergency, please call the helpline immediately.'
          }
        ]
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleEmergencyCall = () => {
    if (emergencyInfo) {
      window.location.href = `tel:${emergencyInfo.helpline.replace(/\s/g, '')}`;
    }
  };
  
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="destructive" 
            size="icon"
            className="fixed right-5 bottom-24 z-40 w-14 h-14 rounded-full shadow-lg pulse"
            onClick={() => {
              fetchEmergencyInfo();
            }}
          >
            <AlertTriangle />
            <span className="sr-only">Emergency SOS</span>
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl text-red-600 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Emergency Support
            </DialogTitle>
            <DialogDescription>
              If you're experiencing a mental health crisis, we're here to help.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {isLoading ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-red-500"></div>
              </div>
            ) : (
              <>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-bold text-red-700 mb-2">Mental Health Helpline</h3>
                  <p className="text-red-600 mb-4">
                    {emergencyInfo?.helpline || '1800 599 0019'}
                  </p>
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={handleEmergencyCall}
                  >
                    <Phone className="mr-2 h-4 w-4" /> Call Now
                  </Button>
                </div>
                
                {emergencyInfo?.resources.map((resource, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-bold mb-2">{resource.name}</h3>
                    {resource.steps && (
                      <ol className="list-decimal ml-5 space-y-1">
                        {resource.steps.map((step, stepIndex) => (
                          <li key={stepIndex}>{step}</li>
                        ))}
                      </ol>
                    )}
                    {resource.instructions && (
                      <p className="mt-2">{resource.instructions}</p>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      <style jsx>{`
        .pulse {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
      `}</style>
    </>
  );
}
