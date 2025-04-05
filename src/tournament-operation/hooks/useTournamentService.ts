import { useCallback } from 'react';
import { TournamentService } from '../services/TournamentService';
import { LocalStorage } from '../../common/services';

export const useTournamentService = (storage: LocalStorage) => {
  return useCallback(() => {
    return new TournamentService(storage);
  }, [storage])();
}