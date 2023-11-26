import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface Event {
  requireLogin: Function;
}

// Define the initial state using that type
const initialState: Event = {
  requireLogin: () => {},
};

export const counterSlice = createSlice({
  name: 'nextEvent',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    nextEvent: (state, action: PayloadAction<Event>) => {
      state.requireLogin = action.payload.requireLogin;
    },
  },
});

const nextEventReducer = counterSlice.reducer;
export const { nextEvent } = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default nextEventReducer;
