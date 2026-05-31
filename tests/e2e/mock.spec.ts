import { test, expect } from '@playwright/test';

test('mock paper happy path', async ({ page }) => {
  await page.goto('/mock/new');
  await page.getByRole('button', { name: /Start exam/i }).click();
  await page.waitForURL(/\/mock\/mock-/, { timeout: 15_000 });
  await expect(page.getByRole('timer')).toBeVisible({ timeout: 15_000 });

  // Data booklet drawer (bottom-right floating button)
  await page.getByRole('button', { name: /^Data booklet$/ }).click();
  await expect(page.getByRole('heading', { name: 'Data booklet' })).toBeVisible();
  await page.getByRole('button', { name: /^Close$/ }).click();

  // Calculator overlay
  await page.getByRole('button', { name: /^Calculator$/ }).click();
  // Calculator panel shows key buttons
  await expect(page.getByRole('button', { name: '=', exact: true })).toBeVisible();
  // Close the calculator (its close button is the ✕ glyph) so it doesn't intercept clicks
  await page.getByRole('button', { name: '✕', exact: true }).click();

  // Navigate to the last question via the navigator so "Hand in paper" becomes available
  const lastNavBtn = page.getByRole('button', { name: /^Go to question \d+/ }).last();
  await lastNavBtn.click();

  // Submit
  await page.getByRole('button', { name: /Hand in paper/i }).click();
  await page.getByRole('button', { name: /Submit final/i }).click();
  await page.waitForURL(/\/results$/, { timeout: 15_000 });
  await expect(page.getByRole('heading', { name: /Your paper/i })).toBeVisible();
});

test('mock exam visual snapshot at 1440 width', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1024 });
  await page.goto('/mock/new');
  await page.getByRole('button', { name: /Start exam/i }).click();
  await page.waitForURL(/\/mock\/mock-/, { timeout: 15_000 });
  await expect(page.getByRole('timer')).toBeVisible({ timeout: 15_000 });
  // Mask the dynamic timer
  await expect(page).toHaveScreenshot('mock-exam-1440.png', {
    mask: [page.getByRole('timer')],
    maxDiffPixelRatio: 0.02,
  });
});
