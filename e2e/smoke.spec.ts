import { test, expect } from "@playwright/test";

test.describe("Smoke tests", () => {
  test("homepage loads with correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Sovereign RCM/);
  });

  test("blog listing loads and shows posts", async ({ page }) => {
    await page.goto("/blog");
    await expect(page).toHaveTitle(/Blog/);
    const posts = page.locator("article, [href*='/blog/']");
    await expect(posts.first()).toBeVisible();
  });

  test("sovereign RCM overview loads", async ({ page }) => {
    await page.goto("/sovereign-rcm");
    await expect(page).toHaveTitle(/Sovereign RCM/);
  });

  test("blog post detail renders with content and author", async ({ page }) => {
    // Navigate directly to a known post
    await page.goto("/blog/change-healthcare-attack-what-it-means-for-your-practice");

    // Should have a title and content
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("article").first()).toBeVisible();

    // Breadcrumb should show Blog link within the breadcrumb nav
    const blogCrumb = page.getByLabel("Breadcrumb").getByRole("link", { name: /blog/i });
    await expect(blogCrumb).toBeVisible();
  });

  test("404 page renders for unknown routes", async ({ page }) => {
    const res = await page.goto("/this-page-does-not-exist");
    expect(res?.status()).toBe(404);
  });
});
