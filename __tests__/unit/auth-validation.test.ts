import { createLoginSchema, createSignupSchema } from "@/validations/authValidation";

describe("Auth Validation Schemas (unit)", () => {
  // Mock translation function
  const mockTranslation = (key: string) => {
    const translations: Record<string, string> = {
      emailRequired: "Email is required",
      emailInvalid: "Please enter a valid email",
      passwordRequired: "Password is required",
      passwordMinLength: "Password must be at least 6 characters",
      nameMin: "Name must be at least 2 characters",
    };
    return translations[key] || key;
  };

  describe("createLoginSchema", () => {
    it("should validate correct login credentials", () => {
      const schema = createLoginSchema(mockTranslation);
      const validData = {
        email: "test@example.com",
        password: "password123",
      };

      const result = schema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should reject invalid email format", () => {
      const schema = createLoginSchema(mockTranslation);
      const invalidData = {
        email: "invalid-email",
        password: "password123",
      };

      const result = schema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("valid email");
      }
    });

    it("should reject empty email", () => {
      const schema = createLoginSchema(mockTranslation);
      const invalidData = {
        email: "",
        password: "password123",
      };

      const result = schema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("required");
      }
    });

    it("should reject password shorter than 6 characters", () => {
      const schema = createLoginSchema(mockTranslation);
      const invalidData = {
        email: "test@example.com",
        password: "12345",
      };

      const result = schema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("at least 6");
      }
    });

    it("should reject empty password", () => {
      const schema = createLoginSchema(mockTranslation);
      const invalidData = {
        email: "test@example.com",
        password: "",
      };

      const result = schema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("required");
      }
    });
  });

  describe("createSignupSchema", () => {
    it("should validate correct signup data", () => {
      const schema = createSignupSchema(mockTranslation);
      const validData = {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      };

      const result = schema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should reject name shorter than 2 characters", () => {
      const schema = createSignupSchema(mockTranslation);
      const invalidData = {
        name: "J",
        email: "john@example.com",
        password: "password123",
      };

      const result = schema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("at least 2");
      }
    });

    it("should reject invalid email in signup", () => {
      const schema = createSignupSchema(mockTranslation);
      const invalidData = {
        name: "John Doe",
        email: "not-an-email",
        password: "password123",
      };

      const result = schema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("valid email");
      }
    });
  });

  describe("Schema Memoization", () => {
    it("should create schema without translation function", () => {
      const schema = createLoginSchema();
      const validData = {
        email: "test@example.com",
        password: "password123",
      };

      const result = schema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should use fallback messages when translation is undefined", () => {
      const schema = createLoginSchema();
      const invalidData = {
        email: "",
        password: "",
      };

      const result = schema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        // Should use fallback English messages
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});
