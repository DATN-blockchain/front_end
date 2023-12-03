import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { fas } from '@fortawesome/free-solid-svg-icons';

interface CurrentReceive{
  id?: string,
  username?: string,
  avatar?: string
}

// Define a type for the slice state
interface OpenMesssageState {
  open: boolean;
  currentReceiver: CurrentReceive
}

// Define the initial state using that type
const initialState: OpenMesssageState = {
  open: false,
  currentReceiver: {}
};


export const openMessageSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    openMessage: (state, action: PayloadAction<CurrentReceive>) => {
      state.open = true;
      state.currentReceiver = action.payload
    },
    closeMessage: (state) => {
        state.open = false;
    },

  },
});

const openMessageSliceReducer = openMessageSlice.reducer;
export const { openMessage, closeMessage} = openMessageSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default openMessageSliceReducer;
