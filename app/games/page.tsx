"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabaseClient';
import { format } from 'date-fns';

export default function GamesPage() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .order('date_played', { ascending: false });

    if (error) {
      console.error('Error fetching games:', error);
    } else {
      setGames(data);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Games</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <Card key={game.id}>
            <CardHeader>
              <CardTitle>{format(new Date(game.date_played), 'PPP')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Player: {game.player_name}</p>
              <p>Opponent: {game.opponent_name}</p>
              <p>Score: {game.player_score} - {game.opponent_score}</p>
              <p>Winner: {game.winner_name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button className="mt-6" onClick={fetchGames}>Refresh Games</Button>
    </div>
  );
}