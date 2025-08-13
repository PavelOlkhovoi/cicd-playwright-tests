// @ts-check
import { test, expect } from '@playwright/test';

// test('fuzzy search test', async ({ page }) => {
//   await page.goto('https://carma-dev-deployments.github.io/geoportal/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Geoportal/);

//   // Wait for fuzzy search container to be visible
//   const searchInput = page.locator('.ant-select-selection-search-input');
//   await expect(searchInput).toBeVisible({ timeout: 30000 });

//   // Click on the search input and type slowly to simulate user behavior
//   await searchInput.click();
//   await searchInput.pressSequentially('Achenbachter', { delay: 100 });
  
//   // Wait for the specific option to be visible, which confirms the dropdown is also visible.
//   const option = page.getByText('Achenbachtreppe', { exact: true });
//   await expect(option).toBeVisible({ timeout: 20000 });
//   await option.click();

//   // Verify the dropdown is no longer visible after selection
//   const dropdown = page.locator('.fuzzy-dropdownwrapper');
//   await expect(dropdown).not.toBeVisible();
// });

test('smoke test', async ({ page }) => {
  await page.goto('https://carma-dev-deployments.github.io/geoportal/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Geoportal/);

  // Wait for fuzzy search container to be visible
  const searchInput = page.locator('.ant-select-selection-search-input');
  await expect(searchInput).toBeVisible({ timeout: 30000 });

  const zoomInControl = page.locator('[data-test-id="zoom-in-control"]');
  const isVisible = await zoomInControl.isVisible();
  console.log('Zoom in control is visible:', isVisible);

  const measurementControl = page.locator('[data-test-id="measurement-control"]');
  const isVisibleMeasurement = await measurementControl.isVisible();
  console.log(`Measurement control visible: ${isVisibleMeasurement}`);

  await expect(page.locator('[data-test-id="modal-menu-btn"]')).toBeVisible();
  
  });
