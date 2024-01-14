import { add } from '../lib/math'

test("Returns the correct sum value", () => {
  expect(add(1, 2, 3, 4, 5)).toBe(15);
});