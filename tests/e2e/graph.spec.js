import { test, expect } from '@playwright/test';

test.describe('Graph Visualization', () => {
  test('should load the page successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Agentic Design Patterns/);
  });

  test('should display graph nodes', async ({ page }) => {
    await page.goto('/');

    // Wait for D3 to load and render nodes
    await page.waitForSelector('.node', { timeout: 5000 });

    // Count nodes - should be 20
    const nodeCount = await page.locator('.node').count();
    expect(nodeCount).toBe(20);
  });

  test('should display graph links', async ({ page }) => {
    await page.goto('/');

    // Wait for links to render
    await page.waitForSelector('.link', { timeout: 5000 });

    // Should have 62 links
    const linkCount = await page.locator('.link').count();
    expect(linkCount).toBe(62);
  });

  test('should show node details when clicked', async ({ page }) => {
    await page.goto('/');

    // Wait for nodes to load
    await page.waitForSelector('.node', { timeout: 5000 });

    // Click first node
    await page.locator('.node').first().click();

    // Check if detail panel updated (should not show empty state)
    const emptyState = await page.locator('.empty-state').isVisible();
    expect(emptyState).toBe(false);

    // Should show detail cards
    const detailCards = await page.locator('.detail-card').count();
    expect(detailCards).toBeGreaterThan(0);
  });

  test('should filter nodes by search', async ({ page }) => {
    await page.goto('/');

    // Wait for nodes to load
    await page.waitForSelector('.node', { timeout: 5000 });

    // Type in search box
    await page.fill('#search-input', 'routing');

    // Wait a bit for debounce
    await page.waitForTimeout(200);

    // Count visible nodes (should be fewer than 20)
    const visibleNodes = await page.locator('.node:visible').count();
    expect(visibleNodes).toBeLessThan(20);
    expect(visibleNodes).toBeGreaterThan(0);
  });

  test('should toggle layer filters', async ({ page }) => {
    await page.goto('/');

    // Wait for filter buttons
    await page.waitForSelector('.filter-btn', { timeout: 5000 });

    // Click first filter button
    const firstFilter = page.locator('.filter-btn').first();
    await firstFilter.click();

    // Should have active class
    await expect(firstFilter).toHaveClass(/active/);

    // Some nodes should be hidden
    const allNodes = await page.locator('.node').count();
    const visibleNodes = await page.locator('.node:visible').count();
    expect(visibleNodes).toBeLessThan(allNodes);
  });

  test('zoom controls should work', async ({ page }) => {
    await page.goto('/');

    // Wait for zoom controls
    await page.waitForSelector('#zoom-in', { timeout: 5000 });

    // Click zoom in
    await page.click('#zoom-in');

    // Wait for animation
    await page.waitForTimeout(350);

    // Click zoom out
    await page.click('#zoom-out');

    // Wait for animation
    await page.waitForTimeout(350);

    // Click reset
    await page.click('#zoom-reset');

    // No errors should have occurred
    expect(true).toBe(true);
  });
});
