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

    // Click hamburger
    const hamburger = page.getByRole("button", { name: /toggle menu/i });
    await hamburger.click();

    // Wait for menu to expand, then check for links
    // The mobile menu uses grid-template-rows animation, so give it a moment
    await page.waitForTimeout(500);

    // Check that "About" link text appears somewhere on the page after menu opens
    await expect(page.getByRole("link", { name: "About" }).first()).toBeVisible();
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
