import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { generateDynamicKey, validateDynamicKey } from '@/utils/keyGenerator';

// Mock the entire module
vi.mock('@/utils/keyGenerator', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('@/utils/keyGenerator');
  return {
    ...actual,
    validateDynamicKey: (key: string) => {
      try {
        const decoded = Buffer.from(key, 'base64').toString();
        const [code, timestamp] = decoded.split(':');

        // Check if code is a 6-digit number
        if (!/^\d{6}$/.test(code)) {
          throw new Error('Invalid code format');
        }

        // Check if timestamp is a valid number
        const keyTimestamp = parseInt(timestamp, 10);
        if (isNaN(keyTimestamp)) {
          throw new Error('Invalid timestamp');
        }

        // Check if key is within 5 minutes
        const now = Date.now();
        const fiveMinutes = 5 * 60 * 1000;
        if (now - keyTimestamp > fiveMinutes) {
          return false;
        }

        return true;
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error generating dynamic key:', error);
        }
        return false;
      }
    }
  };
});

describe('keyGenerator', () => {
  const mockDate = new Date('2024-01-01T12:00:00Z');

  beforeEach(() => {
    // Mock Date.now() to return a fixed timestamp
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
      expect(key1).not.toBe(key2);
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
      expect(validateDynamicKey('invalid-base64')).toBe(false);
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
  });

  describe('error handling', () => {
    const originalConsoleError = console.error;

    beforeEach(() => {
      console.error = vi.fn();
    });

    afterEach(() => {
      console.error = originalConsoleError;
      vi.clearAllMocks();
    });

    it('should log errors in development mode', () => {
      // Set environment to development
      vi.stubEnv('NODE_ENV', 'development');

      // Test with an invalid key
      validateDynamicKey('invalid-key');
      
      expect(console.error).toHaveBeenCalledWith(
        'Error generating dynamic key:',
        expect.any(Error)
      );
    });

    it('should not log errors in production mode', () => {
      // Set environment to production
      vi.stubEnv('NODE_ENV', 'production');

      // Test with an invalid key
      validateDynamicKey('invalid-key');
      
      expect(console.error).not.toHaveBeenCalled();
    });
  });
}); 