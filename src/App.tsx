import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './common/components';
import { HomePage } from './tournament-init/pages';
import { InitTournamentPage } from './tournament-init/pages';
import { AnimatePresence } from 'motion/react';


export default function App() {
  return (
    <AnimatePresence>
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/tournament-init" element={<HomePage />} />
          <Route path="/tournament-init/new" element={<InitTournamentPage />} />
        </Route>
      </Routes>
    </Router>
    </AnimatePresence>
  );
}