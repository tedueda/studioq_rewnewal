const URL_PATTERN = /https?:\/\/|www\.|\.com|\.net|\.org|\.jp|\.co/i;

export function containsUrl(text: string): boolean {
  return URL_PATTERN.test(text);
}

export function validateNickname(nickname: string): string | null {
  const trimmed = nickname.trim();
  if (!trimmed) return 'validation.nicknameRequired';
  if (trimmed.length < 2) return 'validation.nicknameTooShort';
  if (trimmed.length > 30) return 'validation.nicknameTooLong';
  if (containsUrl(trimmed)) return 'validation.noUrls';
  return null;
}

export function validateComment(comment: string): string | null {
  const trimmed = comment.trim();
  if (!trimmed) return 'validation.commentRequired';
  if (trimmed.length < 20) return 'validation.commentTooShort';
  if (trimmed.length > 1000) return 'validation.commentTooLong';
  if (containsUrl(trimmed)) return 'validation.noUrls';
  return null;
}

export function validateRating(rating: number): string | null {
  if (!rating || rating < 1 || rating > 5) return 'validation.ratingRequired';
  return null;
}

export function sanitizeText(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const RATE_LIMIT_KEY = 'sou_house_review_timestamps';
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

export function checkRateLimit(propertySlug: string): boolean {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    const timestamps: Record<string, number> = stored
      ? JSON.parse(stored)
      : {};
    const lastSubmit = timestamps[propertySlug];
    if (lastSubmit && Date.now() - lastSubmit < RATE_LIMIT_WINDOW_MS) {
      return false;
    }
    return true;
  } catch {
    return true;
  }
}

export function recordSubmission(propertySlug: string): void {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    const timestamps: Record<string, number> = stored
      ? JSON.parse(stored)
      : {};
    timestamps[propertySlug] = Date.now();
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(timestamps));
  } catch {
    // ignore storage errors
  }
}
