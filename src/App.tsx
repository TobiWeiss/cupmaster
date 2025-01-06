import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './common/components';
import { HomePage } from './tournament-management/pages';
import { CreateTournamentPage, EditTournamentPage } from './tournament-management/pages';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/tournament-management" element={<HomePage />} />
          <Route path="/tournament-management/new" element={<CreateTournamentPage />} />
          <Route path="/tournament-management/edit/:id" element={<EditTournamentPage />} />
        </Route>
      </Routes>
    </Router>
  );
}