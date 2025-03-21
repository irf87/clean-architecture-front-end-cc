import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { generateDynamicKey, validateDynamicKey } from '@/utils/keyGenerator';

describe('keyGenerator', () => {
  describe('generateDynamicKey', () => {
    beforeEach(() => {
      // Mock Math.random to return a consistent value
      vi.spyOn(Math, 'random').mockReturnValue(0.5);
      // Mock Date.now to return a fixed timestamp
      vi.spyOn(Date, 'now').mockReturnValue(1600000000000);
    });

    it('should generate a base64 encoded string', () => {
      const key = generateDynamicKey();
      expect(() => Buffer.from(key, 'base64').toString()).not.toThrow();
    });

    it('should generate a key containing a 6-digit code and timestamp', () => {
      const key = generateDynamicKey();
      const decoded = Buffer.from(key, 'base64').toString();
      const [code, timestamp] = decoded.split(':');
      
      expect(code).toMatch(/^\d{6}$/);
      expect(timestamp).toBe('1600000000000');
    });

    it('should generate different keys on each call', () => {
      // Restore the real Date.now for this test
      vi.spyOn(Date, 'now').mockRestore();
      
      const key1 = generateDynamicKey();
      const key2 = generateDynamicKey();
      expect(key1).not.toBe(key2);
    });
  });

  describe('validateDynamicKey', () => {
    beforeEach(() => {
      vi.spyOn(Date, 'now').mockReturnValue(1600000000000);
    });

    it('should validate a correctly formatted key within 5 minutes', () => {
      const fourMinutesAgo = 1600000000000 - 4 * 60 * 1000;
      const validKey = Buffer.from(`123456:${fourMinutesAgo}`).toString('base64');
      expect(validateDynamicKey(validKey)).toBe(true);
    });

    it('should reject a key older than 5 minutes', () => {
      const sixMinutesAgo = 1600000000000 - 6 * 60 * 1000;
      const oldKey = Buffer.from(`123456:${sixMinutesAgo}`).toString('base64');
      expect(validateDynamicKey(oldKey)).toBe(false);
    });

    it('should reject a key with invalid code format', () => {
      const invalidKey = Buffer.from(`12345:${Date.now()}`).toString('base64');
      expect(validateDynamicKey(invalidKey)).toBe(false);
    });

    it('should reject an invalid base64 string', () => {
      expect(validateDynamicKey('invalid-base64')).toBe(false);
    });

    it('should reject a key with invalid timestamp', () => {
      const invalidKey = Buffer.from('123456:invalid-timestamp').toString('base64');
      expect(validateDynamicKey(invalidKey)).toBe(false);
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
}); 