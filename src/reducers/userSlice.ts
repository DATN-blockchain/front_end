import { Action, PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Auth {
  logged: boolean;
  user: UserType;
}

export const initialUser: UserType = {
  id: '',
  username: '',
  email: '',
  avatar: '',
  full_name: '',
  birthday: '',
  phone: '',
  // description:'',
  address_wallet: '',
  address_real: '',
  is_active: false,
  system_role: '',
  account_balance: 0,
};
const initialAuth: Auth = {
  logged: false,
  user: initialUser,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialAuth,
  reducers: {
    setLogin: (state, action: PayloadAction<Auth>) => {
      state.logged = true;
      state.user = action.payload.user;
    },
    logOut: (state) => {
      state.logged = false;
      state.user = initialUser;
    },
    // setUser: (state, action: PayloadAction<User>) => {
    //   state.user = action.payload ;
    // },
    setUser: (state, action: PayloadAction<Object>) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

const userReducer = userSlice.reducer;
export const { setLogin, logOut, setUser } = userSlice.actions;

export default userReducer;
