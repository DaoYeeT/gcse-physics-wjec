import { test, expect } from '@playwright/test';

test('topic practice happy path', async ({ page }) => {
  await page.goto('/topics');
  // First sub-topic in Unit 1 is 1-1-1 "Current, p.d. and resistance"
  await page.getByRole('link', { name: /1-1-1/ }).first().click();
  await page.waitForURL(/\/topics\/1-1-1$/, { timeout: 15_000 });
  await page.getByRole('link', { name: /Start drill/i }).click();
  await page.waitForURL(/\/practice\/1-1-1$/, { timeout: 15_000 });
  // The first question should render — pick the first answer regardless of type
  // For MCQs the first option button is labeled A
  const firstOption = page.getByRole('button').filter({ hasText: /^A($|\s)/ }).first();
  if ((await firstOption.count()) > 0) {
    await firstOption.click();
  } else {
    // Fallback: fill any textarea/input with a sample answer
    const input = page.locator('input[type="number"], textarea').first();
    if ((await input.count()) > 0) await input.fill('1');
  }
  await page.getByRole('button', { name: /Show mark scheme/i }).click();
  // After reveal, "Awarded:" should appear OR the next-question / mark-scheme reveal UI
  await expect(
    page.getByText(/Awarded:|Correct answer:|Expected:/i).first(),
  ).toBeVisible();
});
