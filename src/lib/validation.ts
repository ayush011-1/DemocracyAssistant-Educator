/**
 * Validation utilities for voter registration and civic tools
 */

export const validateVoterAge = (birthDate: string): boolean => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age >= 18;
};

export const sanitizeID = (id: string): string => {
  return id.replace(/[^a-zA-Z0-9_\-]/g, '').slice(0, 128);
};

export const isValidDisplayName = (name: string): boolean => {
  return name.length >= 2 && name.length <= 100;
};
