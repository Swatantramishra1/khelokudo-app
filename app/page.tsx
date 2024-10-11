import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800">
      <h1 className="text-4xl font-bold mb-8 text-blue-800 dark:text-blue-200">Badminton Tracker</h1>
      <div className="space-y-4">
        <Button asChild className="w-48">
          <Link href="/games">View Games</Link>
        </Button>
        <Button asChild className="w-48">
          <Link href="/leaderboard">Leaderboard</Link>
        </Button>
        <Button asChild className="w-48">
          <Link href="/admin">Admin Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}