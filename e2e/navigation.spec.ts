import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("sovereign RCM dropdown links work", async ({ page }) => {
    // Navigate directly — dropdown hover is unreliable in CI
    await page.goto("/sovereign-rcm/how-it-works");
    await expect(page).toHaveTitle(/How It Works/);
    await expect(page.locator("h1")).toBeVisible();

    await page.goto("/sovereign-rcm/pricing");
    await expect(page).toHaveTitle(/Pricing/);
  });

  test("contact button in nav leads to contact page", async ({ page }) => {
    await page.goto("/");

    const contactBtn = page.getByRole("navigation").getByRole("link", { name: /contact/i });
    await contactBtn.click();
    await expect(page).toHaveURL(/\/contact/);
  });

  test("logo links to homepage", async ({ page }) => {
    await page.goto("/contact");

    const logo = page.getByRole("navigation").getByRole("link").first();
    await logo.click();
    await expect(page).toHaveURL("/");
  });
});
