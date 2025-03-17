export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const digitsRegex = /^\d+$/;
export const hebrewStringRegex = /^[\u0590-\u05FF\s'-]{1,50}$/;
export const numbersOnlyRegex = /^[0-9]+$/;
export const hebrewAlphanumericRegex = /^[\u0590-\u05FF0-9]+$/;
export const passwordRegex = /^.{6,10}$/; // Password length between 6 and 10 characters
export const usernameRegex = /^[^\s]+$/;  // Ensures no spaces in the username
