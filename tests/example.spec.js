// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Fuzzy Search', () => {
  test('should search and select an option', async ({ page }, testInfo) => {
    // Set a longer timeout for the whole test
    test.setTimeout(60000);
    
    // Navigate to the page
    await page.goto('https://carma-dev-deployments.github.io/geoportal/');

    // Wait for the page to be fully loaded
    await expect(page).toHaveTitle(/Geoportal/);
    
    // Wait for the search input to be visible and enabled
    const searchInput = page.locator('.ant-select-selection-search-input');
    await expect(searchInput).toBeVisible({ timeout: 30000 });
    await expect(searchInput).toBeEnabled({ timeout: 5000 });

    // Click and type in the search input
    await searchInput.click();
    await searchInput.fill('achenbachter');

    // Wait for the dropdown wrapper to appear with retry logic
    const dropdownWrapper = page.locator('.fuzzy-dropdownwrapper');
    try {
      await expect(dropdownWrapper).toBeVisible({ timeout: 15000 });
      console.log('Dropdown wrapper is visible');
    } catch (error) {
      console.error('Dropdown wrapper not visible. Current page state:', {
        url: page.url(),
        title: await page.title(),
        searchInputVisible: await searchInput.isVisible(),
        pageContent: await page.content()
      });
      throw error;
    }

    // Click on the specific dropdown option
    const option = page.getByText('Achenbachtreppe', { exact: true });
    await expect(option).toBeVisible({ timeout: 5000 });
    await option.click();

    // Verify the dropdown is no longer visible after selection
    await expect(dropdownWrapper).not.toBeVisible();
  });
});
