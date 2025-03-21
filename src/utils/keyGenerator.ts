export function generateDynamicKey(): string {
  // Generate a 6-digit code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  // Add timestamp to make it unique
  const timestamp = Date.now().toString();
  // Combine and encode
  return Buffer.from(`${code}:${timestamp}`).toString('base64');
}

export function validateDynamicKey(key: string): boolean {
  try {
    // Decode the key
    const decoded = Buffer.from(key, 'base64').toString();
    const [code, timestamp] = decoded.split(':');
    
    // Check if the code is 6 digits
    if (!/^\d{6}$/.test(code)) return false;
    
    // Check if the timestamp is within the last 5 minutes
    const keyTimestamp = parseInt(timestamp);
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds
    
    return now - keyTimestamp <= fiveMinutes;
  } catch (error) {
    // Log error in development only
    if (process.env.NODE_ENV === 'development') {
      console.error('Error generating dynamic key:', error);
    }
    return false;
  }
} 