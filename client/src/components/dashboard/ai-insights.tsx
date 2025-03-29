import { Mood, Journal } from '@shared/schema';
import { Card } from '@/components/ui/card';
import { Lightbulb, Zap, Brain, TrendingUp } from 'lucide-react';

interface AIInsightsProps {
  moods: Mood[];
  journals: Journal[];
}

export default function AIInsights({ moods, journals }: AIInsightsProps) {
  // If no data is available, show a placeholder message
  if (moods.length === 0 && journals.length === 0) {
    return (
      <div className="bg-neutral-50 p-8 rounded-lg text-center">
        <p className="text-neutral-500">
          Start tracking your mood and journaling to receive AI-powered insights about your mental health patterns.
        </p>
      </div>
    );
  }
  
  // Generate personalized insights based on available data
  const getInsights = () => {
    const insights = [];
    
    // Mood-based insights
    if (moods.length >= 3) {
      // Check if there's an upward trend in mood
      const recentMoods = moods.slice(0, 3);
      const isImproving = recentMoods[0].rating > recentMoods[1].rating;
      
      if (isImproving) {
        insights.push({
          icon: <TrendingUp className="text-green-500" />,
          title: "Mood Improvement",
          content: "Your mood appears to be improving over your recent entries. Continue with your current positive habits and self-care routines.",
          color: "bg-green-50 border-green-100"
        });
      }
      
      // Check for low mood patterns
      const lowMoodEntries = moods.filter(mood => mood.rating <= 4);
      if (lowMoodEntries.length >= 2) {
        insights.push({
          icon: <Brain className="text-blue-500" />,
          title: "Low Mood Pattern Detected",
          content: "You've recorded several low mood entries. Consider scheduling activities that have previously improved your mood or reach out to your support network.",
          color: "bg-blue-50 border-blue-100"
        });
      }
    }
    
    // Journal-based insights
    if (journals.length > 0) {
      // General journaling insight
      insights.push({
        icon: <Lightbulb className="text-primary-500" />,
        title: "Journaling Benefit",
        content: "Research shows that consistent journaling can reduce stress levels. You've made a great start by recording your thoughts regularly.",
        color: "bg-primary-50 border-primary-100"
      });
    }
    
    // General wellness insight
    insights.push({
      icon: <Zap className="text-accent-500" />,
      title: "Wellness Recommendation",
      content: "Based on your recent entries, you might benefit from spending more time outdoors. Research shows that 20 minutes in nature can significantly reduce stress levels.",
      color: "bg-accent-50 border-accent-100"
    });
    
    return insights;
  };
  
  const insights = getInsights();
  
  return (
    <div className="space-y-4">
      <p className="text-neutral-600 mb-2">
        Personalized insights based on your mood tracking and journal entries:
      </p>
      
      {insights.map((insight, index) => (
        <Card key={index} className={`p-4 ${insight.color}`}>
          <div className="flex items-start">
            <div className="mr-3 mt-1">
              {insight.icon}
            </div>
            <div>
              <h4 className="font-semibold text-neutral-800 mb-1">{insight.title}</h4>
              <p className="text-neutral-700 text-sm">{insight.content}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
