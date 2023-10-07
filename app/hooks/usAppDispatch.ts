import { store } from 'app/store';
import { useDispatch } from 'react-redux';

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
