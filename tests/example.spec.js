// @ts-check
import { test, expect } from '@playwright/test';

test('fuzzy search test', async ({ page }) => {
  await page.goto('https://carma-dev-deployments.github.io/geoportal/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Geoportal/);

  // Wait for page to fully load
  await page.waitForLoadState('networkidle');

  // Wait for fuzzy search container to be visible
  const searchInput = page.locator('.ant-select-selection-search-input');
  await expect(searchInput).toBeVisible({ timeout: 30000 });

  // Click on the search input to focus it, then type 'a' (more realistic user interaction)
  await searchInput.click();
  await searchInput.fill('achenbachter');
  
  // Wait for the dropdown to be present in the DOM first
  await page.waitForSelector('.fuzzy-dropdownwrapper', { state: 'attached', timeout: 10000 });
  
  // Then wait for it to be visible with a longer timeout
  const dropdown = page.locator('.fuzzy-dropdownwrapper');
  await expect(dropdown).toBeVisible({ timeout: 20000 });

  // Wait for the specific option to be visible
  const option = page.getByText('Achenbachtreppe', { exact: true });
  await expect(option).toBeVisible({ timeout: 10000 });
  await option.click();

  // Verify the dropdown is no longer visible after selection
  await expect(dropdown).not.toBeVisible();
});
