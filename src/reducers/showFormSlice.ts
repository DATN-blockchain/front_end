import { Action, PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Form {
  showFormLogin: boolean;
}

const initialFormLogin: Form = {
  showFormLogin: false,
};

export const showFormSlice = createSlice({
  name: 'showForm',
  initialState: initialFormLogin,
  reducers: {
    setshowFormLogin: (state, action: PayloadAction<Form>) => {
      state.showFormLogin = action.payload.showFormLogin;
    },
  },
});

const showFormReducer = showFormSlice.reducer;
export const { setshowFormLogin } = showFormSlice.actions;

export default showFormReducer;
