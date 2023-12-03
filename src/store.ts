import { configureStore } from '@reduxjs/toolkit';
import counterSliceReducer from './reducers/counterSlice';
import userReducer from './reducers/userSlice';
import nextEventReducer from './reducers/nextEventSlice';
import showFormReducer from './reducers/showFormSlice';
import openMessageSliceReducer from './reducers/openMessageSilce';

export const store = configureStore({
  reducer: {
    counter: counterSliceReducer,
    nextEvent: nextEventReducer,
    // comments: commentsReducer,
    user: userReducer,
    showForm: showFormReducer,
    showMessage: openMessageSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['nextEvent'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.requireLogin'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates', 'nextEvent.requireLogin'],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
