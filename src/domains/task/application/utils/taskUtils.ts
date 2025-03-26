import { createHash } from 'crypto';

export const generateTaskId = (userId: string): string => {
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(2, 8);
  const dataToHash = `${userId}-${timestamp}-${randomString}`;
  
  const hash = createHash('sha256')
    .update(dataToHash)
    .digest('hex')
    .substring(0, 8);

  return `task-${timestamp}-${hash}`;
};