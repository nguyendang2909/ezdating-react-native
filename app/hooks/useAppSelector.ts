import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { AppStore } from '../types/app-store.type';

export const useAppSelector: TypedUseSelectorHook<AppStore.RootState> = useSelector;
