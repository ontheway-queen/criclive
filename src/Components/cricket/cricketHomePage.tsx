import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Trophy, CalendarDays } from "lucide-react";

interface Match {
  id: string;
  team1: string;
  team2: string;
  score: string;
  status: string;
  date: string;
}

export default function CricketHomePage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchScores() {
      try {
        const res = await fetch("/api/cricket-scores"); 
        const data = await res.json();
        const formattedMatches: Match[] = data.matches.map((m: any) => ({
          id: m.id,
          team1: m.team1,
          team2: m.team2,
          score: m.score || "N/A",
          status: m.status,
          date: m.date,
        }));

        setMatches(formattedMatches);
      } catch (err) {
        console.error("Error fetching cricket scores", err);
      } finally {
        setLoading(false);
      }
    }

    fetchScores();
  }, []);

  return (
    <div className="p-6 space-y-8">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-3">🏏 Cricket Live Hub</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Stay updated with the latest cricket scores, live matches, and upcoming fixtures.
          Get real-time updates and never miss a moment of the game!
        </p>
      </section>

      {/* Live Scores Section */}
      <section>
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
          <Trophy className="w-6 h-6 text-green-600" /> Live Matches
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="animate-spin w-6 h-6 mr-2" />
            <span>Fetching live scores...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matches.map((match) => (
              <Card key={match.id} className="shadow-md">
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-betcricen">
                    <span className="font-bold">{match.team1}</span>
                    <span className="font-bold">{match.team2}</span>
                  </div>
                  <p className="text-lg font-semibold text-green-700">{match.score}</p>
                  <p className="text-sm text-gray-500">{match.status}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <CalendarDays className="w-4 h-4" /> {match.date}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Upcoming Matches */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Upcoming Matches</h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li>India vs Australia – 28th Aug, 2025</li>
          <li>England vs Pakistan – 30th Aug, 2025</li>
          <li>Bangladesh vs Sri Lanka – 2nd Sep, 2025</li>
        </ul>
      </section>

      {/* Cricket News */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Latest Cricket News</h2>
        <div className="space-y-3">
          <Card>
            <CardContent className="p-3">
              📰 ICC announces new World Cup format for 2027.
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              🏆 Virat Kohli reaches another milestone with 80th international century.
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              🌍 Franchise leagues around the world continue to attract star players.
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="text-center">
        <Button>View All Scores</Button>
      </div>
    </div>
  );
}
