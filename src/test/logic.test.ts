import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { isValidDisplayName, sanitizeID, validateVoterAge } from '../lib/validation';

describe('Logic Validation', () => {
  it('validates voter age with precision', () => {
    const today = new Date();
    const exactly18 = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()).toISOString();
    const almost18 = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate() + 1).toISOString();
    
    expect(validateVoterAge(exactly18)).toBe(true);
    expect(validateVoterAge(almost18)).toBe(false);
  });

  it('prevents ID poisoning via sanitization', () => {
    const dirtyId = "user/profile?admin=true<script>";
    expect(sanitizeID(dirtyId)).toBe("userprofileadmintruescript");
    expect(sanitizeID("valid-id_123")).toBe("valid-id_123");
  });
});
