import { createSlice, configureStore } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem('authState'); // Use sessionStorage instead of localStorage
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
      sessionStorage.setItem('authState', JSON.stringify(state)); // Use sessionStorage instead of localStorage
    },
    logout(state) {
      state.isLoggedIn = false;
      sessionStorage.removeItem('authState'); // Use sessionStorage instead of localStorage
    },
  },
});

export const authActions = authSlice.actions;

export const store = configureStore({
  reducer: authSlice.reducer,
});
