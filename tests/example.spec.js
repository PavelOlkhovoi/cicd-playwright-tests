// @ts-check
import { test, expect } from '@playwright/test';

test('fuzzy search test', async ({ page }) => {
  await page.goto('https://carma-dev-deployments.github.io/geoportal/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Geoportal/);

  // Wait for page to fully load
  await page.waitForLoadState('networkidle');

  // Wait for fuzzy search container to be visible
  await expect(page.locator('.ant-select-selection-search-input')).toBeVisible({ timeout: 30000 });

    // Click on the search input to focus it, then type 'a' (more realistic user interaction)
    await page.locator('.ant-select-selection-search-input').click();
    await page.locator('.ant-select-selection-search-input').fill('achenbachter');

    // Wait for the dropdown wrapper to appear
    await expect(page.locator('.fuzzy-dropdownwrapper')).toBeVisible({ timeout: 10000 });

    // Click on the specific dropdown option
    await page.getByText('Achenbachtreppe', { exact: true }).click();

    // Verify the dropdown is no longer visible after selection
    await expect(page.locator('.fuzzy-dropdownwrapper')).not.toBeVisible();

});
