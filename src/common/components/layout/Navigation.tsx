import { Link } from 'react-router-dom';
import { Trophy } from 'lucide-react';

export const Navigation = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Trophy className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">Tournament Manager</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};