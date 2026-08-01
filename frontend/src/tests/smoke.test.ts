import { describe, it, expect } from 'vitest';

describe('smoke', () => {
  it('führt die Testumgebung aus', () => {
    expect(1 + 1).toBe(2);
  });
});