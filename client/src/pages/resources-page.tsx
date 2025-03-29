import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ResourceCard from '@/components/resources/resource-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

// Define resource categories and items
const resources = {
  meditation: [
    {
      id: 1,
      title: '10-Minute Mindfulness Practices',
      description: 'Simple mindfulness techniques you can incorporate into your daily routine to reduce stress and anxiety.',
      category: 'Meditation',
      imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
    },
    {
      id: 2,
      title: 'Guided Meditation for Anxiety',
      description: 'A collection of guided meditations specifically designed to help manage anxiety symptoms.',
      category: 'Meditation',
      imageUrl: 'https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
    },
    {
      id: 3,
      title: 'Breathing Techniques for Stress Relief',
      description: 'Learn different breathing exercises that can help calm your nervous system during stressful moments.',
      category: 'Meditation',
      imageUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
    },
  ],
  sleep: [
    {
      id: 4,
      title: 'Improving Sleep Quality',
      description: 'Evidence-based strategies to improve your sleep patterns and mental health through better rest.',
      category: 'Sleep',
      imageUrl: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
    },
    {
      id: 5,
      title: 'Bedtime Routines for Better Sleep',
      description: 'Create effective evening routines that prepare your mind and body for restful sleep.',
      category: 'Sleep',
      imageUrl: 'https://images.unsplash.com/photo-1511295742362-96445a368bd4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
    },
  ],
  anxiety: [
    {
      id: 6,
      title: 'Managing Anxiety in Daily Life',
      description: 'Practical tools and techniques to recognize and manage anxiety triggers in everyday situations.',
      category: 'Anxiety',
      imageUrl: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
    },
    {
      id: 7,
      title: 'Understanding Panic Attacks',
      description: 'Learn about panic attacks, their symptoms, and effective strategies to manage them when they occur.',
      category: 'Anxiety',
      imageUrl: 'https://images.unsplash.com/photo-1594839688818-0dc56f8a596c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
    },
  ],
  wellness: [
    {
      id: 8,
      title: 'Building Mental Resilience',
      description: 'Techniques to develop psychological resilience and bounce back from life\'s challenges.',
      category: 'Wellness',
      imageUrl: 'https://images.unsplash.com/photo-1552083375-1447ce886485?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
    },
    {
      id: 9,
      title: 'Nutrition and Mental Health',
      description: 'Explore the connection between diet, nutrition, and mental wellbeing with practical advice for dietary changes.',
      category: 'Wellness',
      imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
    },
  ],
};

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState('all');
  
  // Get all resources combined when "all" is selected
  const allResources = Object.values(resources).flat();
  
  // Determine which resources to display based on active tab
  const displayResources = activeTab === 'all' 
    ? allResources 
    : resources[activeTab as keyof typeof resources] || [];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="bg-accent-100 text-accent-700 text-sm font-medium py-1 px-3 rounded-full">RESOURCE HUB</span>
            <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4 font-inter text-neutral-800">Evidence-Based Resources</h1>
            <p className="text-lg text-neutral-600">Access a curated collection of mental health resources, articles, and practices.</p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <div className="flex justify-center">
              <TabsList>
                <TabsTrigger value="all">All Resources</TabsTrigger>
                <TabsTrigger value="meditation">Meditation</TabsTrigger>
                <TabsTrigger value="sleep">Sleep</TabsTrigger>
                <TabsTrigger value="anxiety">Anxiety</TabsTrigger>
                <TabsTrigger value="wellness">Wellness</TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
          
          {displayResources.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-neutral-500">No resources found in this category.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
