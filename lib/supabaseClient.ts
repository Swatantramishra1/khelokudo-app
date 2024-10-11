import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Initialize tables if they don't exist
export async function initializeTables() {
  const { error: usersError } = await supabase.rpc('create_users_table_if_not_exists');
  const { error: gamesError } = await supabase.rpc('create_games_table_if_not_exists');
  const { error: leaderboardError } = await supabase.rpc('create_leaderboard_table_if_not_exists');

  if (usersError || gamesError || leaderboardError) {
    console.error('Error initializing tables:', usersError || gamesError || leaderboardError);
  }
}