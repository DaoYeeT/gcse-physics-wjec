import { test, expect } from '@playwright/test';

test('formulas page renders KaTeX-typeset equations', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /Equation sheet/i }).click();
  await expect(page).toHaveURL(/\/formulas$/);
  await expect(page.getByRole('heading', { name: 'Formulas' })).toBeVisible();
  // KaTeX produces .katex spans wrapping rendered math
  const katexCount = await page.locator('.katex').count();
  expect(katexCount).toBeGreaterThan(5);
});
