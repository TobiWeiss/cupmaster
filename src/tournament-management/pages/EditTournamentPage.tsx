import { useParams } from 'react-router-dom';
import { useTournament } from '../hooks/useTournament';

export const EditTournamentPage = () => {
  const { id } = useParams<{ id: string }>();
  const { tournament, loading, error } = useTournament(id!);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!tournament) return <div>Tournament not found</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Tournament</h1>
      {/* Tournament edit form will be added here */}
    </div>
  );
};