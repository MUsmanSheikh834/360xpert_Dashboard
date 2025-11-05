# Layout System - Quick Reference

## 🚀 Quick Start

### Set Website Layout

```tsx
"use client";
import { useEffect } from "react";
import { useLayout } from "@/contexts/layout-context";
import { DynamicLayout } from "@/components/layout/dynamic-layout";

export default function MyPage() {
  const { setLayoutType } = useLayout();

  useEffect(() => {
    setLayoutType("website");
  }, [setLayoutType]);

  return <DynamicLayout>{/* Your content */}</DynamicLayout>;
}
```

### Set Dashboard Layout

```tsx
useEffect(() => {
  setLayoutType("dashboard");
}, [setLayoutType]);
```

## 📋 Layout Types

| Type        | Header | Sidebar | Footer       | Use Case                 |
| ----------- | ------ | ------- | ------------ | ------------------------ |
| `website`   | ✅     | ❌      | ✅           | Landing pages, marketing |
| `dashboard` | ✅     | ✅      | ⚠️ Commented | Admin, user dashboards   |

## 🎯 Hook API

```tsx
const {
  config, // LayoutConfig: current layout
  state, // LayoutState: runtime state
  isMobile, // boolean: mobile viewport
  setLayoutType, // (type) => void: change layout
  toggleSidebar, // () => void: collapse/expand
  toggleMobileMenu, // () => void: open/close menu
  closeMobileMenu, // () => void: close menu
} = useLayout();
```

## 🌍 RTL Support

✅ **Automatic!** Just set `dir` on `<html>`:

```tsx
<html dir={locale === "ur" ? "rtl" : "ltr"}>
```

## 🎨 Customization

### Enable Dashboard Footer

In `/components/layout/dynamic-layout.tsx`:

```tsx
{
  /* Footer - Uncomment when needed */
}
{
  config.showFooter && <Footer />;
}
```

### Change Sidebar Width

In `/types/layout.ts`:

```tsx
export const SIDEBAR_WIDTH = "w-72"; // default: w-64
```

### Change Header Height

In `/types/layout.ts`:

```tsx
export const HEADER_HEIGHT = "h-20"; // default: h-16
```

## 💡 Pro Tips

1. **Always use `useEffect`** for `setLayoutType()`
2. **Set layout type once** per page (at the top level)
3. **Wrap content in `<DynamicLayout>`** for proper rendering
4. **Use logical properties** (`start`/`end`) for RTL support
5. **Test on mobile** - layout automatically adapts

## 🐛 Common Issues

| Issue                       | Solution                                |
| --------------------------- | --------------------------------------- |
| Layout not applying         | Call `setLayoutType()` in `useEffect`   |
| Sidebar not visible         | Check: dashboard type, desktop viewport |
| RTL not working             | Set `dir="rtl"` on `<html>` element     |
| Footer missing in dashboard | Uncomment in `dynamic-layout.tsx`       |

## 📖 Full Documentation

See [LAYOUT_GUIDE.md](./LAYOUT_GUIDE.md) for complete documentation with examples.

## 🗂️ File Locations

- **Types**: `/types/layout.ts`
- **Context**: `/contexts/layout-context.tsx`
- **Component**: `/components/layout/dynamic-layout.tsx`
- **Header**: `/components/layout/header.tsx`
- **Sidebar**: `/components/layout/sidebar.tsx`
- **Footer**: `/components/layout/footer/index.tsx`

---

**That's it! Simple, powerful, and RTL-ready. 🎉**
