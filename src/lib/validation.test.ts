import { describe, it, expect } from 'vitest';
import { validateVoterAge, sanitizeID, isValidDisplayName } from './validation';

describe('Validation Utilities', () => {
  it('should correctly validate voter age', () => {
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
    eighteenYearsAgo.setDate(eighteenYearsAgo.getDate() - 1); // Make it slightly more than 18
    
    const seventeenYearsAgo = new Date();
    seventeenYearsAgo.setFullYear(seventeenYearsAgo.getFullYear() - 17);

    expect(validateVoterAge(eighteenYearsAgo.toISOString())).toBe(true);
    expect(validateVoterAge(seventeenYearsAgo.toISOString())).toBe(false);
  });

  it('should sanitize IDs correctly', () => {
    expect(sanitizeID('abc-123!@#')).toBe('abc-123');
    expect(sanitizeID('valid_id-123')).toBe('valid_id-123');
  });

  it('should validate display names', () => {
    expect(isValidDisplayName('A')).toBe(false);
    expect(isValidDisplayName('John Doe')).toBe(true);
    expect(isValidDisplayName('a'.repeat(101))).toBe(false);
  });
});
