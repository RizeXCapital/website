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
    await page.goto("/blog");

    // Click the first blog post link
    const firstPost = page.locator("a[href*='/blog/']").first();
    await firstPost.click();

    // Should have a title, content, and author info
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("article")).toBeVisible();

    // Breadcrumb should show Blog link
    const blogCrumb = page.getByRole("link", { name: /blog/i });
    await expect(blogCrumb).toBeVisible();
  });

  test("404 page renders for unknown routes", async ({ page }) => {
    const res = await page.goto("/this-page-does-not-exist");
    expect(res?.status()).toBe(404);
  });
});
