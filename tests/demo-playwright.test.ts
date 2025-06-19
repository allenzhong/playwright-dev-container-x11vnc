import { test, expect } from '@playwright/test';

test.describe('GitHub', () => {
  test('should show the microsoft/Playwright project in the search if you search for Playwright', async ({ page }) => {
    await page.goto('https://github.com');
    await page.pause();
    await expect(page).toHaveTitle(/GitHub/);
  });
});