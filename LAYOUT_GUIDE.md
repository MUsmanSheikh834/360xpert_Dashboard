# Layout System Guide

## Overview

This Next.js boilerplate features a **simplified, robust layout system** with full RTL (Right-to-Left) support. The system supports two layout types:

1. **Website Layout** - Header + Content + Footer
2. **Dashboard Layout** - Header + Sidebar + Content (Footer commented out by default)

## 🎯 Key Features

- ✅ **Simple Configuration** - Just two layout types, no complex options
- ✅ **RTL Support** - Built-in support for Arabic, Urdu, and other RTL languages
- ✅ **Type-Safe** - Full TypeScript support with proper types
- ✅ **Responsive** - Mobile-first design with automatic mobile menu
- ✅ **Collapsible Sidebar** - Dashboard sidebar can collapse for more space
- ✅ **Persistent State** - Layout preferences saved to localStorage
- ✅ **Easy to Use** - Simple API with minimal setup

---

## 📁 File Structure

```
types/
  └── layout.ts              # Layout types and configurations

contexts/
  └── layout-context.tsx     # Layout context and provider

components/layout/
  ├── dynamic-layout.tsx     # Main layout component
  ├── header.tsx             # Header component (RTL aware)
  ├── sidebar.tsx            # Sidebar component (RTL aware)
  ├── mobile-hamburger-menu.tsx
  └── footer/
      └── index.tsx          # Footer component

app/[locale]/
  └── layout.tsx             # Root layout wrapper
```

---

## 🚀 Quick Start

### 1. Set Layout Type in Your Page

```tsx
"use client";

import { useEffect } from "react";
import { useLayout } from "@/contexts/layout-context";
import { DynamicLayout } from "@/components/layout/dynamic-layout";

export default function MyPage() {
  const { setLayoutType } = useLayout();

  useEffect(() => {
    // Set to 'website' or 'dashboard'
    setLayoutType("dashboard");
  }, [setLayoutType]);

  return (
    <DynamicLayout>
      <div>Your page content here</div>
    </DynamicLayout>
  );
}
```

### 2. That's It!

The layout will automatically:

- Show/hide header, sidebar, and footer based on the layout type
- Support RTL languages (Arabic, Urdu, etc.)
- Handle mobile responsiveness
- Save preferences to localStorage

---

## 📖 Layout Types

### Website Layout

**Use Case:** Public-facing pages, landing pages, marketing sites

**Components:**

- ✅ Header (with logo, navigation, auth buttons)
- ✅ Main Content Area
- ✅ Footer (links, social media, etc.)

**Example:**

```tsx
"use client";

import { useEffect } from "react";
import { useLayout } from "@/contexts/layout-context";
import { DynamicLayout } from "@/components/layout/dynamic-layout";

export default function HomePage() {
  const { setLayoutType } = useLayout();

  useEffect(() => {
    setLayoutType("website");
  }, [setLayoutType]);

  return (
    <DynamicLayout>
      <section>
        <h1>Welcome to Our Website</h1>
        <p>Content goes here...</p>
      </section>
    </DynamicLayout>
  );
}
```

**Configuration:**

```typescript
{
  type: "website",
  showHeader: true,
  showSidebar: false,
  showFooter: true,
}
```

---

### Dashboard Layout

**Use Case:** Admin panels, user dashboards, authenticated areas

**Components:**

- ✅ Fixed Header (with user profile, settings)
- ✅ Collapsible Sidebar (navigation menu)
- ✅ Main Content Area
- ⚠️ Footer (commented out by default, uncomment if needed)

**Example:**

```tsx
"use client";

import { useEffect } from "react";
import { useLayout } from "@/contexts/layout-context";
import { DynamicLayout } from "@/components/layout/dynamic-layout";

export default function DashboardPage() {
  const { setLayoutType } = useLayout();

  useEffect(() => {
    setLayoutType("dashboard");
  }, [setLayoutType]);

  return (
    <DynamicLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{/* Dashboard widgets */}</div>
      </div>
    </DynamicLayout>
  );
}
```

**Configuration:**

```typescript
{
  type: "dashboard",
  showHeader: true,
  showSidebar: true,
  showFooter: false, // Set to true if you want footer
}
```

---

## 🎨 Layout API

### useLayout Hook

The `useLayout()` hook provides access to layout state and controls:

```tsx
import { useLayout } from "@/contexts/layout-context";

function MyComponent() {
  const {
    config, // Current layout configuration
    state, // Current layout state
    isMobile, // Boolean: is mobile viewport
    setLayoutType, // Function: set layout type
    toggleSidebar, // Function: toggle sidebar collapse
    toggleMobileMenu, // Function: toggle mobile menu
    closeMobileMenu, // Function: close mobile menu
  } = useLayout();

  // Use them in your component
}
```

### Types

```typescript
// Layout Type
type LayoutType = "website" | "dashboard";

// Layout Config
interface LayoutConfig {
  type: LayoutType;
  showHeader: boolean;
  showSidebar: boolean;
  showFooter: boolean;
}

// Layout State
interface LayoutState {
  sidebarCollapsed: boolean;
  mobileMenuOpen: boolean;
}
```

---

## 🌍 RTL Support

### Automatic RTL

The layout system automatically detects RTL direction from the `<html dir="rtl">` attribute set by Next.js based on locale.

**In your root layout:**

```tsx
<html lang={locale} dir={locale === "ur" ? "rtl" : "ltr"}>
```

### RTL Features

1. **Sidebar Position** - Automatically flips to the right side
2. **Text Alignment** - Uses logical properties (`start`/`end` instead of `left`/`right`)
3. **Icons** - Chevrons and arrows rotate automatically
4. **Spacing** - Uses `ms-*` (margin-inline-start) instead of `ml-*`
5. **Borders** - Uses `border-e` (border-inline-end) instead of `border-r`

### Supported Languages

- ✅ English (LTR)
- ✅ Urdu (RTL)
- ✅ Arabic (RTL)
- ✅ Any other LTR/RTL language

---

## 📱 Responsive Behavior

### Desktop (≥768px)

- **Website:** Header at top, content below, footer at bottom
- **Dashboard:** Fixed header, fixed sidebar, scrollable content

### Mobile (<768px)

- **Website:** Same as desktop but more compact
- **Dashboard:** Header with hamburger menu, sidebar becomes mobile drawer

### Mobile Menu

The mobile menu automatically:

- Opens when hamburger icon is clicked
- Closes when navigating to a new page
- Closes when clicking outside (backdrop)
- Closes when viewport becomes desktop size

---

## 🔧 Advanced Customization

### Enable Footer in Dashboard

To enable the footer in dashboard layout:

**Option 1: Globally (in types/layout.ts)**

```typescript
dashboard: {
  type: "dashboard",
  showHeader: true,
  showSidebar: true,
  showFooter: true, // Change to true
},
```

**Option 2: In dynamic-layout.tsx**

```tsx
{
  /* Footer - Uncomment when needed */
}
{
  config.showFooter && <Footer />;
}
```

### Customize Sidebar Width

Edit `/types/layout.ts`:

```typescript
export const SIDEBAR_WIDTH = "w-72"; // Change from w-64 to w-72
export const SIDEBAR_COLLAPSED_WIDTH = "w-20"; // Change from w-16
```

### Customize Header Height

Edit `/types/layout.ts`:

```typescript
export const HEADER_HEIGHT = "h-20"; // Change from h-16
```

### Add Custom Styling

Pass `className` prop to `DynamicLayout`:

```tsx
<DynamicLayout className="bg-gray-50 dark:bg-gray-900">{/* Content */}</DynamicLayout>
```

---

## 🎯 Real-World Examples

### Example 1: Landing Page

```tsx
"use client";

import { useEffect } from "react";
import { useLayout } from "@/contexts/layout-context";
import { DynamicLayout } from "@/components/layout/dynamic-layout";

export default function LandingPage() {
  const { setLayoutType } = useLayout();

  useEffect(() => {
    setLayoutType("website");
  }, [setLayoutType]);

  return (
    <DynamicLayout>
      <Hero />
      <Features />
      <Pricing />
      <CTA />
    </DynamicLayout>
  );
}
```

### Example 2: Admin Dashboard

```tsx
"use client";

import { useEffect } from "react";
import { useLayout } from "@/contexts/layout-context";
import { DynamicLayout } from "@/components/layout/dynamic-layout";
import { StatsCards } from "./components/stats-cards";
import { RecentActivity } from "./components/recent-activity";

export default function AdminDashboard() {
  const { setLayoutType } = useLayout();

  useEffect(() => {
    setLayoutType("dashboard");
  }, [setLayoutType]);

  return (
    <DynamicLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <StatsCards />
        <RecentActivity />
      </div>
    </DynamicLayout>
  );
}
```

### Example 3: Mixed Layout (Both Website and Dashboard)

```tsx
"use client";

import { useEffect } from "react";
import { useLayout } from "@/contexts/layout-context";
import { DynamicLayout } from "@/components/layout/dynamic-layout";
import { useAuth } from "@/hooks/use-auth";

export default function HybridPage() {
  const { setLayoutType } = useLayout();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Show dashboard for authenticated users, website for guests
    setLayoutType(isAuthenticated ? "dashboard" : "website");
  }, [setLayoutType, isAuthenticated]);

  return (
    <DynamicLayout>{isAuthenticated ? <DashboardContent /> : <PublicContent />}</DynamicLayout>
  );
}
```

### Example 4: Programmatic Sidebar Toggle

```tsx
"use client";

import { useLayout } from "@/contexts/layout-context";
import { Button } from "@/components/ui/button/button";

export default function MyDashboard() {
  const { state, toggleSidebar } = useLayout();

  return (
    <DynamicLayout>
      <div className="space-y-4">
        <Button onClick={toggleSidebar}>
          {state.sidebarCollapsed ? "Expand" : "Collapse"} Sidebar
        </Button>

        <div className="prose">
          <h1>Dashboard Content</h1>
          <p>Sidebar is {state.sidebarCollapsed ? "collapsed" : "expanded"}</p>
        </div>
      </div>
    </DynamicLayout>
  );
}
```

---

## 🐛 Troubleshooting

### Issue: Layout not applying

**Solution:** Make sure you're calling `setLayoutType()` in a `useEffect`:

```tsx
useEffect(() => {
  setLayoutType("dashboard");
}, [setLayoutType]);
```

### Issue: Sidebar not showing

**Solution:** Check that:

1. Layout type is set to `"dashboard"`
2. You're on desktop viewport (≥768px)
3. `showSidebar` is `true` in config

### Issue: RTL not working

**Solution:** Ensure your root layout sets the `dir` attribute:

```tsx
<html lang={locale} dir={locale === "ur" ? "rtl" : "ltr"}>
```

### Issue: Mobile menu not closing

**Solution:** The mobile menu should close automatically. If not, check:

1. `isMobile` is correctly detecting viewport
2. `closeMobileMenu()` is being called

### Issue: Footer not showing in dashboard

**Solution:** Footer is commented out by default in dashboard. Uncomment in `dynamic-layout.tsx`:

```tsx
{
  config.showFooter && <Footer />;
}
```

---

## 📝 Best Practices

1. **Set Layout Type Early** - Call `setLayoutType()` in `useEffect` at the top level of your page
2. **One Layout Per Page** - Don't change layout type multiple times in the same page
3. **Use DynamicLayout** - Always wrap your content in `<DynamicLayout>`
4. **Leverage RTL** - Use logical properties (`start`/`end`) instead of directional (`left`/`right`)
5. **Test Both Layouts** - Test your content in both website and dashboard layouts
6. **Mobile First** - Design for mobile, then enhance for desktop

---

## 🔄 Migration from Old System

If you have old code using the previous complex layout system:

### Before (Old System)

```tsx
const { applyPreset, updateConfig } = useLayout();

useEffect(() => {
  applyPreset("minimal");
  updateConfig({
    content: { maxWidth: "full", padding: "none", centered: false },
    footer: { enabled: true, fixed: false, variant: "simple", showOnMobile: true },
  });
}, [applyPreset, updateConfig]);
```

### After (New System)

```tsx
const { setLayoutType } = useLayout();

useEffect(() => {
  setLayoutType("website");
}, [setLayoutType]);
```

**That's it!** Much simpler and easier to understand.

---

## 📚 Additional Resources

- **TypeScript Types**: See `/types/layout.ts` for all type definitions
- **Context Provider**: See `/contexts/layout-context.tsx` for implementation
- **Layout Component**: See `/components/layout/dynamic-layout.tsx` for rendering logic
- **Header Component**: See `/components/layout/header.tsx` for RTL examples
- **Sidebar Component**: See `/components/layout/sidebar.tsx` for RTL examples

---

## 🤝 Contributing

If you want to extend the layout system:

1. **Add new layout type** - Edit `types/layout.ts` and add to `LayoutType` union
2. **Update config** - Add configuration in `LAYOUT_CONFIGS` object
3. **Update component** - Handle new type in `dynamic-layout.tsx`
4. **Update docs** - Document the new layout type here

---

## 📄 License

This layout system is part of the Next.js Boilerplate created by Muhammad Zahid.

---

## 💡 Summary

- **Two Layouts**: Website (public) and Dashboard (admin)
- **RTL Support**: Full support for Arabic, Urdu, and other RTL languages
- **Simple API**: Just call `setLayoutType("website")` or `setLayoutType("dashboard")`
- **Type-Safe**: Full TypeScript support
- **Responsive**: Automatic mobile menu and responsive behavior
- **Easy to Use**: Minimal configuration, maximum flexibility

**Questions?** Check the code in `/types/layout.ts`, `/contexts/layout-context.tsx`, and `/components/layout/dynamic-layout.tsx` for more details.

---

**Happy Coding! 🚀**
