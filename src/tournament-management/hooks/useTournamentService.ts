import { useCallback } from 'react';
import { TournamentService } from '../services/TournamentService';
import { LocalStorage } from '../../common/services';

export const useTournamentService = () => {
  return useCallback(() => {
    return new TournamentService(new LocalStorage());
  }, [])();
}