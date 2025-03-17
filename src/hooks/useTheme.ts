// useTheme.ts (or useTheme.js)
import { useSelector } from 'react-redux';
import { getTheme } from '../components/Colors/Color'; // Adjust path if needed
import { selectCurrentTheme } from '../../store/user/user.selector'; // Adjust path if needed

export const useTheme = () => {
  const isDarkMode = useSelector(selectCurrentTheme); // Get current theme state from Redux
  return getTheme(isDarkMode); // Return the appropriate theme
};

export const useGetTheme = () => {
    return useSelector(selectCurrentTheme)
  };
