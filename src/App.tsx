import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './common/components';
import { HomePage, InitTournamentPage } from './tournament-init/pages';
import { AnimatePresence } from 'framer-motion';
import { TournamentOperationPage } from './tournament-operation/pages/TournamentOperationPage';

export default function App() {

  return (
    <AnimatePresence>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/tournament-init" element={<HomePage />} />
            <Route path="/tournament-init/new" element={<InitTournamentPage />} />
            <Route path="/tournament-operation/:id" element={<TournamentOperationPage />} />
          </Route>
        </Routes>
      </Router>
    </AnimatePresence>
  );
}