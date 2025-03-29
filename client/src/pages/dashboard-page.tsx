import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import MoodChart from '@/components/dashboard/mood-chart';
import Journal from '@/components/dashboard/journal';
import AIInsights from '@/components/dashboard/ai-insights';
import { Mood, Journal as JournalType } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Fetch moods
  const { data: moods = [] } = useQuery<Mood[]>({
    queryKey: ['/api/moods'],
  });
  
  // Fetch journals
  const { data: journals = [] } = useQuery<JournalType[]>({
    queryKey: ['/api/journals'],
  });
  
  // Add mood mutation
  const addMoodMutation = useMutation({
    mutationFn: async (moodData: { rating: number; note?: string }) => {
      const res = await apiRequest('POST', '/api/moods', moodData);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/moods'] });
    },
  });
  
  // Add journal mutation
  const addJournalMutation = useMutation({
    mutationFn: async (content: string) => {
      const res = await apiRequest('POST', '/api/journals', { content });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/journals'] });
    },
  });
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8 px-4 bg-neutral-50">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-neutral-800 mb-2">Your Wellness Dashboard</h1>
            <p className="text-neutral-600">Track your mental health journey and gain insights about your emotional patterns.</p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-white border border-neutral-200">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="mood">Mood Tracking</TabsTrigger>
              <TabsTrigger value="journal">Journal</TabsTrigger>
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Current Mood</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold">{moods.length > 0 ? `${moods[0].rating}/10` : 'No data'}</div>
                      <div className="text-sm text-neutral-500">
                        {moods.length > 0 ? new Date(moods[0].timestamp).toLocaleDateString() : ''}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-neutral-600">{moods.length > 0 ? moods[0].note : 'Record your first mood entry'}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Journal Entries</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{journals.length}</div>
                    <p className="mt-2 text-sm text-neutral-600">
                      {journals.length > 0 
                        ? `Last entry: ${new Date(journals[0].timestamp).toLocaleDateString()}`
                        : 'No journal entries yet'}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Wellness Streak</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {Math.min(moods.length, journals.length)} days
                    </div>
                    <p className="mt-2 text-sm text-neutral-600">Keep tracking to maintain your streak</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle>Mood Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MoodChart moods={moods} />
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle>Latest Journal Entry</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {journals.length > 0 ? (
                      <div>
                        <p className="text-sm text-neutral-500 mb-2">
                          {new Date(journals[0].timestamp).toLocaleString()}
                        </p>
                        <p className="text-neutral-700">{journals[0].content}</p>
                      </div>
                    ) : (
                      <p className="text-neutral-500">No journal entries yet. Start journaling to track your thoughts.</p>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>AI Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <AIInsights moods={moods} journals={journals} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="mood">
              <Card>
                <CardHeader>
                  <CardTitle>Mood Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <MoodChart moods={moods} />
                  <div className="mt-8 max-w-xl mx-auto">
                    <h3 className="font-bold text-lg mb-4">Record Your Current Mood</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          How are you feeling today? (1-10)
                        </label>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-neutral-500">Poor (1)</span>
                          <span className="text-neutral-500">Excellent (10)</span>
                        </div>
                        <div className="flex space-x-2">
                          {Array.from({ length: 10 }, (_, i) => i + 1).map(rating => (
                            <button
                              key={rating}
                              className={`flex-1 py-2 rounded-md ${
                                addMoodMutation.variables?.rating === rating
                                  ? 'bg-primary-500 text-white'
                                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                              }`}
                              onClick={() => addMoodMutation.mutate({ rating })}
                            >
                              {rating}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="journal">
              <Card>
                <CardHeader>
                  <CardTitle>Journal</CardTitle>
                </CardHeader>
                <CardContent>
                  <Journal
                    journals={journals}
                    onAddJournal={(content) => addJournalMutation.mutate(content)}
                    isLoading={addJournalMutation.isPending}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="insights">
              <Card>
                <CardHeader>
                  <CardTitle>AI Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <AIInsights moods={moods} journals={journals} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
