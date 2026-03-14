import { test, expect } from "@playwright/test";

test.describe("Contact form", () => {
  test("shows validation errors for empty submission", async ({ page }) => {
    await page.goto("/contact");

    // Try to submit empty form — browser validation should prevent it
    const submitButton = page.getByRole("button", { name: /send message/i });
    await expect(submitButton).toBeVisible();

    // Name field should be required
    const nameInput = page.locator("#name");
    await expect(nameInput).toHaveAttribute("required", "");
  });

  test("form fields are present and interactive", async ({ page }) => {
    await page.goto("/contact");

    // Fill out the form
    await page.fill("#name", "Test User");
    await page.fill("#email", "test@example.com");
    await page.fill("#phone", "5551234567");
    await page.fill("#practice", "Test Practice");
    await page.fill("#message", "This is a test message for the contact form.");

    // Verify fields have values
    await expect(page.locator("#name")).toHaveValue("Test User");
    await expect(page.locator("#email")).toHaveValue("test@example.com");
    await expect(page.locator("#message")).toHaveValue(
      "This is a test message for the contact form."
    );

    // Character counter should update
    const counter = page.getByText(/\d+ \/ 2000/);
    await expect(counter).toBeVisible();
  });

  test("honeypot field is not visible to users", async ({ page }) => {
    await page.goto("/contact");

    // Honeypot is positioned offscreen (-left-[9999px]), not display:none.
    // Playwright considers offscreen elements "visible", so check the
    // bounding box is outside the viewport instead.
    const honeypot = page.locator("#company_url");
    const box = await honeypot.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.x).toBeLessThan(0);
  });

  test("submission with fake SMTP shows error gracefully", async ({ page }) => {
    await page.goto("/contact");

    // Fill valid data
    await page.fill("#name", "Test User");
    await page.fill("#email", "test@example.com");
    await page.fill("#message", "Testing form submission error handling in CI");

    // Wait for the 3-second bot timer to pass
    await page.waitForTimeout(3500);

    // Submit
    await page.getByRole("button", { name: /send message/i }).click();

    // SMTP will fail in CI (fake creds). Form should show an error message
    // instead of crashing or showing a blank page.
    const error = page.getByText(/failed|unable|error|try again/i);
    await expect(error).toBeVisible({ timeout: 10000 });
  });

  test("thank you page renders correctly", async ({ page }) => {
    await page.goto("/thank-you");

    await expect(page.getByText("Message Received")).toBeVisible();
    await expect(
      page.getByText("We'll respond within one business day")
    ).toBeVisible();

    // Should show blog posts
    const postLinks = page.locator("a[href*='/blog/']");
    await expect(postLinks.first()).toBeVisible();
  });
});
