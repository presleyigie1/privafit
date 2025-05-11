export function calculateProgress(eaten, goal) {
    if (!goal || goal <= 0) return 0;
    return Math.min((eaten / goal) * 100, 100);
  }
  