import { useState } from 'react';
import { Journal } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { Loader2, Plus, Save, Paperclip, Image, SmilePlus } from 'lucide-react';

interface JournalProps {
  journals: Journal[];
  onAddJournal: (content: string) => void;
  isLoading: boolean;
}

export default function JournalComponent({ journals, onAddJournal, isLoading }: JournalProps) {
  const [newEntry, setNewEntry] = useState('');
  const [isWriting, setIsWriting] = useState(false);

  const handleSubmit = () => {
    if (newEntry.trim()) {
      onAddJournal(newEntry);
      setNewEntry('');
      setIsWriting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* New entry form */}
      {isWriting ? (
        <div className="bg-neutral-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Today's Journal</h3>
          <Textarea
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="How are you feeling today? Write your thoughts here..."
            className="w-full h-32 bg-white border resize-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          <div className="flex justify-between items-center mt-3">
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <SmilePlus size={18} className="text-neutral-500" />
              </Button>
              <Button variant="ghost" size="icon">
                <Paperclip size={18} className="text-neutral-500" />
              </Button>
              <Button variant="ghost" size="icon">
                <Image size={18} className="text-neutral-500" />
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsWriting(false)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSubmit}
                disabled={!newEntry.trim() || isLoading}
                className="bg-primary-500 hover:bg-primary-600"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save Entry
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Button
          onClick={() => setIsWriting(true)}
          className="w-full py-6 flex items-center justify-center border-dashed border-2 border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-600"
        >
          <Plus className="mr-2 h-5 w-5" />
          Write New Journal Entry
        </Button>
      )}

      {/* Journal entries list */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Journal Entries</h3>
        {journals.length === 0 ? (
          <div className="bg-neutral-50 p-8 rounded-lg text-center">
            <p className="text-neutral-500">
              You haven't created any journal entries yet. Start journaling to track your thoughts and feelings.
            </p>
          </div>
        ) : (
          <ScrollArea className="h-[400px] rounded-md border">
            <div className="p-4 space-y-4">
              {journals.map((journal) => (
                <div key={journal.id} className="bg-white rounded-lg border border-neutral-200 p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-sm font-medium text-neutral-900">
                      {format(new Date(journal.timestamp), 'EEEE, MMMM d, yyyy')}
                    </div>
                    <div className="text-xs text-neutral-500">
                      {format(new Date(journal.timestamp), 'h:mm a')}
                    </div>
                  </div>
                  <p className="text-neutral-700 whitespace-pre-wrap">{journal.content}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
