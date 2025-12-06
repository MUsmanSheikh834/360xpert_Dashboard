import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/auth-slice";
import LoginPage from "@/app/[locale]/(auth)/login/page";
import SignupPage from "@/app/[locale]/(auth)/signup/page";
import { toast } from "sonner";

// Mock dependencies
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => "/en/login",
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("@react-oauth/google", () => ({
  useGoogleLogin: () => jest.fn(),
}));

jest.mock("@/lib/cookie/cookie", () => ({
  setToken: jest.fn(),
  getToken: jest.fn(),
  removeToken: jest.fn(),
}));

describe("Auth Flow (integration)", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    // Create a fresh store for each test
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });
    jest.clearAllMocks();
  });

  describe("Login Page", () => {
    it("should render login form with email and password fields", () => {
      render(
        <Provider store={store}>
          <LoginPage />
        </Provider>
      );

      expect(screen.getByLabelText(/emailLabel/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/passwordLabel/i)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /submitButton/i })).toBeInTheDocument();
    });

    it("should display validation errors for invalid email", async () => {
      render(
        <Provider store={store}>
          <LoginPage />
        </Provider>
      );

      const emailInput = screen.getByLabelText(/emailLabel/i);
      const submitButton = screen.getByRole("button", { name: /submitButton/i });

      fireEvent.change(emailInput, { target: { value: "invalid-email" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        // Check for validation error message
        expect(screen.getByText(/valid email/i)).toBeInTheDocument();
      });
    });

    it("should display validation errors for short password", async () => {
      render(
        <Provider store={store}>
          <LoginPage />
        </Provider>
      );

      const emailInput = screen.getByLabelText(/emailLabel/i);
      const passwordInput = screen.getByLabelText(/passwordLabel/i);
      const submitButton = screen.getByRole("button", { name: /submitButton/i });

      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "12345" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/at least 6/i)).toBeInTheDocument();
      });
    });

    it("should show loading state during form submission", async () => {
      render(
        <Provider store={store}>
          <LoginPage />
        </Provider>
      );

      const emailInput = screen.getByLabelText(/emailLabel/i);
      const passwordInput = screen.getByLabelText(/passwordLabel/i);
      const submitButton = screen.getByRole("button", { name: /submitButton/i });

      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.click(submitButton);

      // Button should be disabled during submission
      await waitFor(() => {
        expect(submitButton).toBeDisabled();
      });
    });
  });

  describe("Signup Page", () => {
    it("should render signup form with name, email, and password fields", () => {
      render(
        <Provider store={store}>
          <SignupPage />
        </Provider>
      );

      expect(screen.getByLabelText(/nameLabel/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/emailLabel/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/passwordLabel/i)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /submitButton/i })).toBeInTheDocument();
    });

    it("should display validation errors for short name", async () => {
      render(
        <Provider store={store}>
          <SignupPage />
        </Provider>
      );

      const nameInput = screen.getByLabelText(/nameLabel/i);
      const submitButton = screen.getByRole("button", { name: /submitButton/i });

      fireEvent.change(nameInput, { target: { value: "J" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/at least 2/i)).toBeInTheDocument();
      });
    });

    it("should show loading state during signup submission", async () => {
      render(
        <Provider store={store}>
          <SignupPage />
        </Provider>
      );

      const nameInput = screen.getByLabelText(/nameLabel/i);
      const emailInput = screen.getByLabelText(/emailLabel/i);
      const passwordInput = screen.getByLabelText(/passwordLabel/i);
      const submitButton = screen.getByRole("button", { name: /submitButton/i });

      fireEvent.change(nameInput, { target: { value: "John Doe" } });
      fireEvent.change(emailInput, { target: { value: "john@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(submitButton).toBeDisabled();
      });
    });
  });

  describe("Form Validation", () => {
    it("should prevent submission with empty fields", async () => {
      render(
        <Provider store={store}>
          <LoginPage />
        </Provider>
      );

      const submitButton = screen.getByRole("button", { name: /submitButton/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        // Should show required field errors
        const errors = screen.getAllByText(/required/i);
        expect(errors.length).toBeGreaterThan(0);
      });
    });
  });
});
