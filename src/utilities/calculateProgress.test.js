import { calculateProgress } from './calculateProgress';

// Unit tests ensure the logic of progress percentage works correctly

test('returns correct percentage when under goal', () => {
  expect(calculateProgress(1000, 2000)).toBe(50);
});

test('caps at 100% when over goal', () => {
  expect(calculateProgress(2500, 2000)).toBe(100);
});

test('returns 0 if goal is 0', () => {
  expect(calculateProgress(500, 0)).toBe(0);
});
