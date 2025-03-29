import { useState } from 'react';
import { Mood } from '@shared/schema';
import { format, subDays } from 'date-fns';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface MoodChartProps {
  moods: Mood[];
}

export default function MoodChart({ moods }: MoodChartProps) {
  const [timeRange, setTimeRange] = useState<'week' | 'month'>('week');
  
  // Helper to get dates for the selected range
  const getDateRange = () => {
    const today = new Date();
    const days = timeRange === 'week' ? 7 : 30;
    
    // Create an array of dates for the range
    return Array.from({ length: days }, (_, index) => {
      const date = subDays(today, days - index - 1);
      return format(date, 'yyyy-MM-dd');
    });
  };
  
  // Process mood data for chart
  const processChartData = () => {
    const dateRange = getDateRange();
    const moodMap = new Map();
    
    // Create map of date -> mood rating
    moods.forEach(mood => {
      const moodDate = format(new Date(mood.timestamp), 'yyyy-MM-dd');
      if (dateRange.includes(moodDate)) {
        moodMap.set(moodDate, mood.rating);
      }
    });
    
    // Create chart data with all dates in range
    return dateRange.map(date => ({
      date,
      mood: moodMap.get(date) || null,
      displayDate: format(new Date(date), 'd MMM')
    }));
  };
  
  const chartData = processChartData();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Mood Over Time</h3>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 text-sm rounded-md ${
              timeRange === 'week'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
            onClick={() => setTimeRange('week')}
          >
            Week
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md ${
              timeRange === 'month'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
            onClick={() => setTimeRange('month')}
          >
            Month
          </button>
        </div>
      </div>
      
      {moods.length === 0 ? (
        <div className="h-64 bg-neutral-50 rounded-lg flex items-center justify-center">
          <p className="text-neutral-500">No mood data available. Start tracking your mood!</p>
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="displayDate" 
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis 
                domain={[0, 10]} 
                ticks={[0, 2, 4, 6, 8, 10]}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value) => [`Mood: ${value}`, 'Rating']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="mood"
                stroke="#5B8AD0"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
