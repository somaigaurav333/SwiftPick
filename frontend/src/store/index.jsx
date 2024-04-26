import { configureStore, createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) {
      return { isLoggedIn: false };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { isLoggedIn: false };
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: loadState(),
  reducers: {
    login(state) {
      state.isLoggedIn = true;
      localStorage.setItem('authState', JSON.stringify(state));
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.setItem('authState', JSON.stringify(state));
    },
  },
});

export const authActions = authSlice.actions;

export const store = configureStore({
  reducer: authSlice.reducer,
});
