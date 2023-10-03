import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppStore } from 'app/types/app-store.type';
import { Entity } from 'app/types/entity.type';
import _ from 'lodash';

import { appActions } from './app.store';

const initialState: AppStore.MatchState = {};

export const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    addManyFirst: (state, action: PayloadAction<Entity.Match[]>) => {
      const { payload } = action;

      if (!payload.length) {
        return;
      }

      state.data = payload;
    },

    addManyNext(state, action: PayloadAction<Entity.Match[]>) {
      const { payload } = action;

      if (!payload.length) {
        return;
      }

      if (!state.data) {
        state.data = payload;
      }

      state.data = state.data.concat(payload);
    },

    addOne(state, { payload }: PayloadAction<Entity.Match>) {
      if (!state.data?.length) {
        state.data = [payload];
        return;
      }

      const stateDataLength = state.data.length;

      for (let i = 0; i < stateDataLength; i += 1) {
        const item = state.data[i];
        if (item._id === payload._id) {
          state.data[i] = {
            ...item,
            ...payload,
          };
        }
      }

      state.data = _.chain([...state.data]).unionBy;

      setList(
        prev =>
          orderBy(
            unionBy([...prev, ...dataList], 'id'),
            ['createdAt'],
            ['desc'],
          ) as Array<ConversationItem>,
      );
    },

    setReachedEnd(state, action: PayloadAction<boolean>) {
      state.isReachedEnd = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(appActions.logout, state => {
      state.data = undefined;
      state.isReachedEnd = undefined;
    });
  },
});

export const matchActions = matchSlice.actions;

export const matchReducer = matchSlice.reducer;
