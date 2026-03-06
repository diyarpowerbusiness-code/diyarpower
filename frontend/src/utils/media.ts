import { API_BASE } from '../api';

const ABSOLUTE_RE = /^https?:\/\//i;

export const resolveImageUrl = (src?: string) => {
  if (!src) return '';
  if (ABSOLUTE_RE.test(src) || src.startsWith('data:')) return src;
  if (src.startsWith('/uploads')) return `${API_BASE}${src}`;
  return src;
};
