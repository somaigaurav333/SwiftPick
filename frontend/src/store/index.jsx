import { createSlice, configureStore } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) {
      return { isLoggedIn: false, isAdmin: false, userId: null };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { isLoggedIn: false, isAdmin: false, userId: null };
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: loadState(),
  reducers: {
    login(state, action) {
      const { isLoggedIn, isAdmin, userId } = action.payload;
      state.isLoggedIn = isLoggedIn;
      state.isAdmin = isAdmin;
      state.userId = userId;
      localStorage.setItem('authState', JSON.stringify(state));
    },
    logout(state) {
      state.isLoggedIn = false;
      state.isAdmin = false;
      state.userId = undefined;
      localStorage.removeItem('authState');
    },
  },
});

export const authActions = authSlice.actions;

export const selectIsLoggedIn = state => state.isLoggedIn;
export const selectIsAdmin = state => state.isAdmin;
export const selectUserId = state => state.userId;

export const store = configureStore({
  reducer: authSlice.reducer,
});
