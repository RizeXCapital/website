import { test, expect, devices } from "@playwright/test";

test.use(devices["iPhone 13"]);

test.describe("Mobile viewport", () => {
  test("homepage loads and shows mobile CTA", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Sovereign RCM/);

    // Mobile sticky CTA should be visible
    const mobileCta = page.locator("a[href='/contact']").last();
    await expect(mobileCta).toBeVisible();
  });

  test("hamburger menu opens and contains nav links", async ({ page }) => {
    await page.goto("/");

    // Desktop nav links should be hidden, hamburger should be visible
    const hamburger = page.getByRole("button", { name: /menu|toggle|navigation/i });
    await hamburger.click();

    // Nav links should now be visible
    await expect(page.getByRole("link", { name: /about/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /blog/i })).toBeVisible();
  });

  test("contact form is usable at mobile width", async ({ page }) => {
    await page.goto("/contact");

    // Form should be visible and fields should be interactive
    await page.fill("#name", "Mobile Test");
    await page.fill("#email", "mobile@test.com");
    await page.fill("#message", "Testing from mobile viewport");

    await expect(page.locator("#name")).toHaveValue("Mobile Test");

    // Submit button should be visible
    const submit = page.getByRole("button", { name: /send message/i });
    await expect(submit).toBeVisible();
  });
});
