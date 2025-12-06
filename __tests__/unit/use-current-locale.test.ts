import { renderHook } from "@testing-library/react";
import { useCurrentLocale } from "@/hooks/use-current-locale";
import { usePathname } from "next/navigation";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("useCurrentLocale (unit)", () => {
  const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should extract 'en' locale from /en/login path", () => {
    mockUsePathname.mockReturnValue("/en/login");
    const { result } = renderHook(() => useCurrentLocale());
    expect(result.current).toBe("en");
  });

  it("should extract 'ur' locale from /ur/signup path", () => {
    mockUsePathname.mockReturnValue("/ur/signup");
    const { result } = renderHook(() => useCurrentLocale());
    expect(result.current).toBe("ur");
  });

  it("should extract 'ar' locale from /ar/forgot path", () => {
    mockUsePathname.mockReturnValue("/ar/forgot");
    const { result } = renderHook(() => useCurrentLocale());
    expect(result.current).toBe("ar");
  });

  it("should extract locale from nested paths", () => {
    mockUsePathname.mockReturnValue("/en/auth/reset");
    const { result } = renderHook(() => useCurrentLocale());
    expect(result.current).toBe("en");
  });

  it("should fallback to 'en' for invalid paths", () => {
    mockUsePathname.mockReturnValue("/invalid/path");
    const { result } = renderHook(() => useCurrentLocale());
    expect(result.current).toBe("en");
  });

  it("should fallback to 'en' for root path", () => {
    mockUsePathname.mockReturnValue("/");
    const { result } = renderHook(() => useCurrentLocale());
    expect(result.current).toBe("en");
  });

  it("should fallback to 'en' when pathname is null", () => {
    mockUsePathname.mockReturnValue(null);
    const { result } = renderHook(() => useCurrentLocale());
    expect(result.current).toBe("en");
  });

  it("should fallback to 'en' for unsupported locale", () => {
    mockUsePathname.mockReturnValue("/fr/login");
    const { result } = renderHook(() => useCurrentLocale());
    expect(result.current).toBe("en");
  });

  it("should handle paths with query parameters", () => {
    mockUsePathname.mockReturnValue("/en/login?redirect=/dashboard");
    const { result } = renderHook(() => useCurrentLocale());
    expect(result.current).toBe("en");
  });

  it("should handle paths with trailing slashes", () => {
    mockUsePathname.mockReturnValue("/ur/signup/");
    const { result } = renderHook(() => useCurrentLocale());
    expect(result.current).toBe("ur");
  });
});
