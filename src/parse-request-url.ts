/**
 * Parse full URL to relative path
 */
export const parseRequestUrl = (url: string): URL => {
  return new URL(url);
};
