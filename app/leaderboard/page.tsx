"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/lib/supabaseClient';

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState({
    weekly: [],
    monthly: [],
    yearly: [],
  });

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    const timeframes = ['weekly', 'monthly', 'yearly'];
    const newLeaderboard = {};

    for (const timeframe of timeframes) {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .eq('timeframe', timeframe)
        .order('rank', { ascending: true });

      if (error) {
        console.error(`Error fetching ${timeframe} leaderboard:`, error);
      } else {
        newLeaderboard[timeframe] = data;
      }
    }

    setLeaderboard(newLeaderboard);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
      <Tabs defaultValue="weekly">
        <TabsList>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="yearly">Yearly</TabsTrigger>
        </TabsList>
        {Object.entries(leaderboard).map(([timeframe, data]) => (
          <TabsContent key={timeframe} value={timeframe}>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {data.map((entry) => (
                <Card key={entry.id}>
                  <CardHeader>
                    <CardTitle>Rank {entry.rank}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Player: {entry.user_id}</p>
                    <p>Points: {entry.points}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}