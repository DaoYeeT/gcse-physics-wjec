import { test, expect } from '@playwright/test';

test('landing renders heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Sit the paper');
});
