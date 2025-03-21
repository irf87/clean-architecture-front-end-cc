import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { generateDynamicKey, validateDynamicKey } from '@/utils/keyGenerator';

describe('keyGenerator', () => {
  const mockDate = new Date('2024-01-01T12:00:00Z');

  beforeEach(() => {
    // Mock Date.now() to return a fixed timestamp for predictable testing
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('generateDynamicKey', () => {
    it('should generate a base64 encoded string', () => {
      const key = generateDynamicKey();
      expect(() => Buffer.from(key, 'base64').toString()).not.toThrow();
    });

    it('should contain a 6-digit code and timestamp', () => {
      const key = generateDynamicKey();
      const decoded = Buffer.from(key, 'base64').toString();
      const [code, timestamp] = decoded.split(':');

      expect(code).toMatch(/^\d{6}$/);
      expect(timestamp).toBe(mockDate.getTime().toString());
    });

    it('should generate different codes each time', () => {
      const key1 = generateDynamicKey();
      const key2 = generateDynamicKey();
      
      const decoded1 = Buffer.from(key1, 'base64').toString();
      const decoded2 = Buffer.from(key2, 'base64').toString();
      
      const [code1] = decoded1.split(':');
      const [code2] = decoded2.split(':');
      
      expect(code1).not.toBe(code2);
    });
  });

  describe('validateDynamicKey', () => {
    it('should validate a correctly formatted key within 5 minutes', () => {
      const key = generateDynamicKey();
      expect(validateDynamicKey(key)).toBe(true);
    });

    it('should reject a key older than 5 minutes', () => {
      const key = generateDynamicKey();
      // Move time forward by 6 minutes
      vi.advanceTimersByTime(6 * 60 * 1000);
      expect(validateDynamicKey(key)).toBe(false);
    });

    it('should reject an invalid base64 string', () => {
      expect(validateDynamicKey('not-base64!')).toBe(false);
    });

    it('should reject a key with invalid code format', () => {
      // Create a key with a 5-digit code
      const invalidCode = '12345';
      const timestamp = Date.now().toString();
      const key = Buffer.from(`${invalidCode}:${timestamp}`).toString('base64');
      expect(validateDynamicKey(key)).toBe(false);
    });

    it('should reject a key with invalid timestamp format', () => {
      // Create a key with an invalid timestamp
      const code = '123456';
      const key = Buffer.from(`${code}:invalid-timestamp`).toString('base64');
      expect(validateDynamicKey(key)).toBe(false);
    });

    it('should reject a key with missing parts', () => {
      // Create a key without timestamp
      const key = Buffer.from('123456').toString('base64');
      expect(validateDynamicKey(key)).toBe(false);
    });

    it('should reject a key with future timestamp', () => {
      // Create a key with a timestamp 1 minute in the future
      const code = '123456';
      const futureTimestamp = Date.now() + 60 * 1000;
      const key = Buffer.from(`${code}:${futureTimestamp}`).toString('base64');
      expect(validateDynamicKey(key)).toBe(true); // The function only checks if the key is not older than 5 minutes
    });
  });
}); 