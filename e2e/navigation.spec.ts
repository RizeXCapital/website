import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("sovereign RCM dropdown links work", async ({ page }) => {
    await page.goto("/");

    // Open the Sovereign RCM dropdown
    const dropdownTrigger = page.getByRole("navigation").getByText("Sovereign RCM");
    await dropdownTrigger.hover();

    // Click How It Works
    const howItWorks = page.getByRole("link", { name: /how it works/i });
    await howItWorks.click();
    await expect(page).toHaveURL(/sovereign-rcm\/how-it-works/);
    await expect(page).toHaveTitle(/How It Works/);
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
