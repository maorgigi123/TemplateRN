import { RootState } from '../root.reducer'; // Adjust path if needed

export const selectCurrentTheme = (state: RootState) => state.user.isDarkMode;

export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;

export const selectLocation = (state: RootState) => state.user.location;
