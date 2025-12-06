import { test, expect } from "@playwright/test";

test.describe("Authentication E2E Tests", () => {
  const baseURL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  test.beforeEach(async ({ page }) => {
    // Clear cookies and storage before each test
    await page.context().clearCookies();
  });

  test.describe("Login Flow", () => {
    test("should successfully login with valid credentials", async ({ page }) => {
      await page.goto(`${baseURL}/en/login`);

      // Fill in login form
      await page.fill('input[name="email"]', "test@example.com");
      await page.fill('input[name="password"]', "password123");

      // Submit form
      await page.click('button[type="submit"]');

      // Wait for navigation to home page
      await page.waitForURL(`${baseURL}/en/`);

      // Verify we're on the home page
      expect(page.url()).toBe(`${baseURL}/en/`);
    });

    test("should display error for invalid credentials", async ({ page }) => {
      await page.goto(`${baseURL}/en/login`);

      // Fill in login form with invalid credentials
      await page.fill('input[name="email"]', "wrong@example.com");
      await page.fill('input[name="password"]', "wrongpassword");

      // Submit form
      await page.click('button[type="submit"]');

      // Wait for error toast
      await page.waitForSelector("text=/Login failed/i", { timeout: 5000 });

      // Verify we're still on login page
      expect(page.url()).toContain("/login");
    });

    test("should show validation errors for invalid email format", async ({ page }) => {
      await page.goto(`${baseURL}/en/login`);

      // Fill in invalid email
      await page.fill('input[name="email"]', "not-an-email");
      await page.fill('input[name="password"]', "password123");

      // Submit form
      await page.click('button[type="submit"]');

      // Check for validation error
      await expect(page.locator("text=/valid email/i")).toBeVisible();
    });

    test("should show validation error for short password", async ({ page }) => {
      await page.goto(`${baseURL}/en/login`);

      await page.fill('input[name="email"]', "test@example.com");
      await page.fill('input[name="password"]', "12345");

      await page.click('button[type="submit"]');

      // Check for password length validation
      await expect(page.locator("text=/at least 6/i")).toBeVisible();
    });

    test("should disable submit button during submission", async ({ page }) => {
      await page.goto(`${baseURL}/en/login`);

      await page.fill('input[name="email"]', "test@example.com");
      await page.fill('input[name="password"]', "password123");

      const submitButton = page.locator('button[type="submit"]');
      await submitButton.click();

      // Button should be disabled immediately
      await expect(submitButton).toBeDisabled();
    });
  });

  test.describe("Signup Flow", () => {
    test("should successfully signup with valid data", async ({ page }) => {
      await page.goto(`${baseURL}/en/signup`);

      // Fill in signup form
      await page.fill('input[name="name"]', "John Doe");
      await page.fill('input[name="email"]', "newuser@example.com");
      await page.fill('input[name="password"]', "password123");

      // Submit form
      await page.click('button[type="submit"]');

      // Wait for redirect to login page
      await page.waitForURL(`${baseURL}/en/login`);

      // Verify we're on the login page
      expect(page.url()).toContain("/login");
    });

    test("should show validation error for short name", async ({ page }) => {
      await page.goto(`${baseURL}/en/signup`);

      await page.fill('input[name="name"]', "J");
      await page.fill('input[name="email"]', "test@example.com");
      await page.fill('input[name="password"]', "password123");

      await page.click('button[type="submit"]');

      // Check for name validation error
      await expect(page.locator("text=/at least 2/i")).toBeVisible();
    });
  });

  test.describe("Google OAuth Flow", () => {
    test("should have Google login button on login page", async ({ page }) => {
      await page.goto(`${baseURL}/en/login`);

      // Check for Google login button
      const googleButton = page.locator('button:has-text("Continue with Google")');
      await expect(googleButton).toBeVisible();
    });

    test("should have Google signup button on signup page", async ({ page }) => {
      await page.goto(`${baseURL}/en/signup`);

      // Check for Google signup button
      const googleButton = page.locator('button:has-text("Continue with Google")');
      await expect(googleButton).toBeVisible();
    });

    // Note: Actual Google OAuth testing requires mocking or test credentials
    // This is a placeholder for the structure
    test.skip("should complete Google OAuth flow", async ({ page }) => {
      await page.goto(`${baseURL}/en/login`);

      // Click Google login button
      const googleButton = page.locator('button:has-text("Continue with Google")');
      await googleButton.click();

      // In a real test, you would:
      // 1. Wait for Google popup/redirect
      // 2. Fill in Google credentials (using test account)
      // 3. Handle OAuth callback
      // 4. Verify successful authentication
    });
  });

  test.describe("Navigation and Links", () => {
    test("should navigate from login to signup", async ({ page }) => {
      await page.goto(`${baseURL}/en/login`);

      // Click signup link
      await page.click('a[href*="/signup"]');

      // Verify we're on signup page
      await page.waitForURL(`${baseURL}/en/signup`);
      expect(page.url()).toContain("/signup");
    });

    test("should navigate from signup to login", async ({ page }) => {
      await page.goto(`${baseURL}/en/signup`);

      // Click login link
      await page.click('a[href*="/login"]');

      // Verify we're on login page
      await page.waitForURL(`${baseURL}/en/login`);
      expect(page.url()).toContain("/login");
    });

    test("should navigate to forgot password page", async ({ page }) => {
      await page.goto(`${baseURL}/en/login`);

      // Click forgot password link
      await page.click('a[href*="/forgot"]');

      // Verify we're on forgot password page
      await page.waitForURL(`${baseURL}/en/forgot`);
      expect(page.url()).toContain("/forgot");
    });
  });

  test.describe("Locale Support", () => {
    test("should work with English locale", async ({ page }) => {
      await page.goto(`${baseURL}/en/login`);
      expect(page.url()).toContain("/en/");
    });

    test("should work with Urdu locale", async ({ page }) => {
      await page.goto(`${baseURL}/ur/login`);
      expect(page.url()).toContain("/ur/");
    });

    test("should work with Arabic locale", async ({ page }) => {
      await page.goto(`${baseURL}/ar/login`);
      expect(page.url()).toContain("/ar/");
    });
  });

  test.describe("Error Handling", () => {
    test("should handle network errors gracefully", async ({ page }) => {
      // Simulate offline mode
      await page.context().setOffline(true);

      await page.goto(`${baseURL}/en/login`);

      await page.fill('input[name="email"]', "test@example.com");
      await page.fill('input[name="password"]', "password123");

      await page.click('button[type="submit"]');

      // Should show error message
      await page.waitForSelector("text=/failed/i", { timeout: 5000 });

      // Re-enable network
      await page.context().setOffline(false);
    });
  });
});
