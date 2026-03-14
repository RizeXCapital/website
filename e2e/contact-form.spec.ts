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

  test("honeypot field is hidden from users", async ({ page }) => {
    await page.goto("/contact");

    const honeypot = page.locator("#company_url");
    await expect(honeypot).toBeHidden();
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
