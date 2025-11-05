# Next.js Enterprise Starter Kit

A production-ready Next.js 15 starter template with **simplified layout system**, comprehensive form handling, real-time features, and enterprise-grade architecture. Built with TypeScript, Tailwind CSS 4, and modern React patterns.

## Key Features

- **Simplified Layout System**: Two layout types (Website & Dashboard) with full RTL support
- **Advanced Form Builder**: Type-safe forms with 20+ field types and dynamic validation
- **Real-time Dashboard**: Live updates with Socket.IO and WebSocket support
- **Enterprise Authentication**: Complete auth flow with role-based access control and protected routes
- **Modern UI Components**: 50+ shadcn/ui components with custom theming
- **Scroll-to-Top Button**: Smooth scrolling navigation button with RTL support across all pages
- **State Management**: Redux Toolkit with persistence and React Query integration
- **Testing Suite**: Unit, integration, and E2E testing setup
- **Performance Optimized**: Server components, lazy loading, and bundle optimization
- **Storybook Integration**: Isolated component development with client-side logging via Pino
- **Local Socket.IO Testing**: Dedicated Express.js test server for real-time feature validation
- **RTL Ready**: Full support for Arabic, Urdu, and other RTL languages

## Tech Stack

<p align="left">
  <a href="https://nextjs.org" target="_blank"><img alt="Next.js" src="https://img.shields.io/badge/Next.js-15.5.4-black?logo=next.js&logoColor=white"></a>
  <a href="https://react.dev" target="_blank"><img alt="React" src="https://img.shields.io/badge/React-18-20232A?logo=react&logoColor=61DAFB"></a>
  <a href="https://www.typescriptlang.org/" target="_blank"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white"></a>
  <a href="https://tailwindcss.com" target="_blank"><img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind%20CSS-4.1.9-06B6D4?logo=tailwindcss&logoColor=white"></a>
  <a href="https://ui.shadcn.com" target="_blank"><img alt="shadcn/ui" src="https://img.shields.io/badge/shadcn%2Fui-Components-000000"></a>
  <a href="https://www.radix-ui.com/" target="_blank"><img alt="Radix UI" src="https://img.shields.io/badge/Radix%20UI-Primitives-161618?logo=radixui&logoColor=white"></a>
  <a href="https://redux-toolkit.js.org/" target="_blank"><img alt="Redux Toolkit" src="https://img.shields.io/badge/Redux%20Toolkit-Store-764ABC?logo=redux&logoColor=white"></a>
  <a href="https://tanstack.com/query/latest" target="_blank"><img alt="React Query" src="https://img.shields.io/badge/TanStack%20Query-React-FF4154?logo=reactquery&logoColor=white"></a>
  <a href="https://zod.dev" target="_blank"><img alt="Zod" src="https://img.shields.io/badge/Zod-Validation-3E67B1"></a>
  <a href="https://react-hook-form.com" target="_blank"><img alt="React Hook Form" src="https://img.shields.io/badge/React%20Hook%20Form-Forms-EC5990?logo=reacthookform&logoColor=white"></a>
  <a href="https://axios-http.com" target="_blank"><img alt="Axios" src="https://img.shields.io/badge/Axios-HTTP%20Client-5A29E4?logo=axios&logoColor=white"></a>
  <a href="https://socket.io" target="_blank"><img alt="Socket.IO" src="https://img.shields.io/badge/Socket.IO-Realtime-010101?logo=socketdotio&logoColor=white"></a>
  <a href="https://sonner.emilkowal.ski" target="_blank"><img alt="Sonner" src="https://img.shields.io/badge/Sonner-Toasts-000000"></a>
  <a href="https://storybook.js.org" target="_blank"><img alt="Storybook" src="https://img.shields.io/badge/Storybook-7-EBAC2B?logo=storybook&logoColor=black"></a>
  <a href="https://getpino.io" target="_blank"><img alt="Pino" src="https://img.shields.io/badge/Pino-Logging-5A29E4?logo=node.js&logoColor=white"></a>
</p>

## Core Architecture

### Simplified Layout System

**Two layout types for maximum simplicity:**

- **Website Layout**: Header + Content + Footer (for public pages, landing pages)
- **Dashboard Layout**: Header + Sidebar + Content (for admin panels, user dashboards)

**Key features:**

- ✅ Full RTL support (Arabic, Urdu, etc.)
- ✅ Responsive mobile-first design
- ✅ Collapsible sidebar with smooth transitions
- ✅ Mobile hamburger menu
- ✅ Type-safe with TypeScript
- ✅ Persistent state in localStorage
- ✅ Simple API: just call `setLayoutType("website")` or `setLayoutType("dashboard")`

**Quick example:**

```tsx
"use client";
import { useEffect } from "react";
import { useLayout } from "@/contexts/layout-context";
import { DynamicLayout } from "@/components/layout/dynamic-layout";

export default function MyPage() {
  const { setLayoutType } = useLayout();

  useEffect(() => {
    setLayoutType("dashboard"); // or "website"
  }, [setLayoutType]);

  return <DynamicLayout>{/* Your content */}</DynamicLayout>;
}
```

📖 **Documentation:**

- Full Guide: [LAYOUT_GUIDE.md](./LAYOUT_GUIDE.md)
- Quick Reference: [LAYOUT_QUICK_REF.md](./LAYOUT_QUICK_REF.md)

### Advanced Form System

- **BaseForm Component**: Universal form component with automatic validation
- **Field Registry**: 20+ pre-built field components with consistent API
- **Schema-Driven**: Zod validation schemas with TypeScript inference
- **Conditional Logic**: Dynamic field visibility based on form state
- **Nested Structures**: Support for sections and repeatable field groups

### State Management Architecture

- **Redux Toolkit**: Centralized state with slices for UI, Auth, and App data
- **Redux Persist**: Automatic state persistence with selective hydration
- **React Query**: Server state management with caching and synchronization
- **Context Providers**: Layout and error contexts for component communication

### Real-time Infrastructure

- **Socket.IO Integration**: Bidirectional real-time communication
- **WebSocket Support**: Native WebSocket implementation for high-frequency updates
- **Event Management**: Typed event handlers with automatic cleanup
- **Connection Management**: Automatic reconnection and error recovery

### API & Networking

- **Axios Client**: Pre-configured HTTP client with interceptors
- **Request/Response Middleware**: Authentication, error handling, and logging
- **Type-Safe Endpoints**: Generated TypeScript interfaces for API responses
- **Error Normalization**: Consistent error handling across the application

### Authentication & Route Protection

- **Complete Auth Flow**: Login, signup, forgot password, OTP verification, and reset password
- **Protected Routes**: All routes including root (`/`) and home pages (`/en/`, `/ur/`) are protected by default
- **Middleware-Based Protection**: Next.js middleware handles authentication checks before page loads
- **Cookie-Based Sessions**: Secure authentication using HTTP-only cookies
- **Automatic Redirects**: Unauthenticated users redirected to login; authenticated users skip auth pages
- **Multi-Step Flows**: OTP and password reset pages protected with flow state validation

**Route Protection Logic:**

- `/` → Redirects to `/en/login` (unauthenticated) or `/en/` (authenticated)
- `/en/`, `/ur/` → Protected home pages requiring authentication
- `/en/dashboard`, `/en/profile` → Protected application routes
- `/en/login`, `/en/signup` → Public auth pages (redirect to home if already authenticated)

### UI Enhancement Features

#### Scroll-to-Top Button

A globally available scroll-to-top button with smooth animations and RTL support:

**Features:**

- **Smart Visibility**: Appears after scrolling 300px down the page
- **Smooth Animation**: Fade-in/fade-out with scale effect on hover
- **RTL Support**: Automatically positions on left side for RTL languages (Urdu)
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Customizable**: Configurable trigger threshold and smooth scrolling behavior
- **Global Availability**: Included in root layout, works on all pages

**Usage:**

```typescript
// Default configuration (already integrated globally)
<ScrollToTop />

// Custom configuration
<ScrollToTop
  showAfter={500}  // Show after scrolling 500px
  smooth={true}    // Enable smooth scrolling
  className="custom-class"
/>
```

**Styling:**

- Positioned fixed at bottom-right (bottom-left in RTL mode)
- Circular button with shadow effects
- Smooth transitions for all interactions
- Responsive sizing for mobile devices

### Logging System

- **Client-Side Logging**: Pino configured exclusively for browser environments (no server-side integration to avoid bundle bloat)
- **Structured Output**: JSON-formatted logs with timestamps, levels (debug, info, warn, error), and context
- **Performance Focus**: Lightweight, fast logging without impacting runtime performance
- **Integration**: Easily extensible for remote logging services like Sentry or LogRocket

### Prerequisites

- Node.js 18+ and pnpm (recommended) or npm
- Git for version control

### Installation

1. Clone the repository:

   ```
   git clone <https://github.com/zahidrahimoon/next-starter.git>
   cd nextjs-starter
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:
   Copy `.env.example` to `.env.local` and fill in required values (e.g., `NEXT_PUBLIC_API_URL`).

4. Run the development server:
   ```
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the landing page.

## Development Setup

### Storybook

Storybook is configured for isolated component development and documentation. It includes Pino logging strictly for the client/browser environment to capture component interactions without server-side overhead.

1. Start Storybook:
   ```
   npm run storybook
   ```
   Open [http://localhost:6006](http://localhost:6006) to browse stories.

### Testing Real-time Features (Socket.IO & WebSocket)

To validate Socket.IO and WebSocket initialization, set up a local Express.js test server. This allows end-to-end testing of real-time events without deploying a full backend.

1. Create a new directory for the test server (e.g., `socket-test-server`):

   ```
   mkdir socket-test-server
   cd socket-test-server
   npm init -y
   npm install express socket.io
   ```

2. Create `server.js` with the following code:

   ```javascript
   // server.js
   import express from "express";
   import http from "http";
   import { Server } from "socket.io";

   const app = express();
   const server = http.createServer(app);

   // Create Socket.IO server with settings matching client config
   const io = new Server(server, {
     cors: {
       origin: "*", // Allow all origins for production deployment
       methods: ["GET", "POST"],
       credentials: true,
     },
     transports: ["websocket", "polling"], // Match client transports
     pingInterval: 25000, // Match client pingInterval
     pingTimeout: 5000, // Match client pingTimeout
     // Note: Reconnection options are client-side only
   });

   // --- SOCKET EVENTS ---
   io.on("connection", (socket) => {
     console.log("✅ Client connected:", socket.id);

     // Test ping-pong from server
     socket.emit("welcome", {
       message: "Hello from Socket.IO server!",
       id: socket.id,
       timestamp: new Date().toISOString(),
     });

     // Listen for messages (optional)
     socket.on("message", (data) => {
       console.log("📩 Message received:", data);
       // Echo it back for testing
       socket.emit("message", { echo: data, receivedAt: new Date().toISOString() });
     });

     // Handle disconnection
     socket.on("disconnect", (reason) => {
       console.log("❌ Client disconnected:", socket.id, "Reason:", reason);
     });
   });

   // --- EXPRESS TEST ROUTE ---
   app.get("/", (req, res) => {
     res.send("Socket.IO Test Server is running ✅");
   });

   // --- START SERVER ---
   const PORT = process.env.PORT || 4000;
   server.listen(PORT, () => {
     console.log(`🚀 Socket.IO server running on http://localhost:${PORT}`);
   });
   ```

3. Add a start script to `package.json`:

   ```json
   "scripts": {
     "start": "node server.js"
   }
   ```

4. Run the test server:

   ```
   npm start
   ```

   - Verify the route: Open [http://localhost:4000](http://localhost:4000) – should display "Socket.IO Test Server is running ✅".
   - Test Socket.IO: In the Next.js app (running on localhost:3000), navigate to the dashboard. Open browser dev tools (Console/Network tabs).
     - On connection: Expect a "welcome" event with server message.
     - Send a test message: Use the dashboard's real-time chat or metrics component to emit a "message" event.
     - Verify echo: Server should log the message and emit back an echo response.
     - Check WebSocket: In Network tab, confirm WebSocket upgrade (ws://localhost:4000/socket.io/?...).
     - Disconnect: Close/reload the tab – server console should log disconnection.

5. Client Configuration Matching:
   - Update `socket/config.ts` if needed to point to `http://localhost:4000`.
   - Transports: websocket first, fallback to polling.
   - Ping settings: Match server (interval: 25s, timeout: 5s) for stable connections.

**Troubleshooting**:

- CORS errors: Ensure `origin: "*"` in server config.
- Connection fails: Check firewall/proxy; test with `curl http://localhost:4000`.
- No events: Verify client emits match server listeners (e.g., "message").

For production, replace with a scalable backend (e.g., integrate Socket.IO into your API server).

## Theming & UI

- **next-themes** integration with system preference detection
- **3 Built-in Themes**: Light, Dark, and Ocean (custom palette)
- **CSS Variables**: Tailwind v4 CSS variables for consistent theming
- **Theme Toggle**: Accessible theme switcher in header/sidebar
- **Semantic Tokens**: All components use design tokens (bg-background, text-foreground, etc.)

### UI Component Library (50+ Components)

Built on **shadcn/ui** and **Radix UI** primitives for accessibility and customization:

### Recent Updates & New Features

#### 🔒 Enhanced Route Protection (Latest)

- **Root Route Protection**: The root path (`/`) now requires authentication
- **Home Page Protection**: All locale-specific home routes (`/en/`, `/ur/`) are protected
- **Smart Redirects**: Unauthenticated users automatically redirected to login page
- **Auth Flow Validation**: OTP and reset password pages validate flow state
- **Seamless UX**: Authenticated users bypass auth pages and access protected content directly

#### 🚀 Global Scroll-to-Top Button (Latest)

- **Always Available**: Integrated into root layout, works on all pages
- **Smooth Animations**: Fade-in/out with hover scale effects
- **Smart Visibility**: Only appears after scrolling 300px down
- **RTL Compatible**: Automatically adjusts position for Urdu (RTL) layouts
- **Accessible**: Full keyboard navigation and ARIA labels
- **Customizable**: Configurable trigger threshold and scroll behavior

**Implementation Details:**

```typescript
// Component: components/shared/scroll-to-top.tsx
// Integrated in: app/[locale]/layout.tsx
// Styling: app/globals.css (RTL support included)
```

### Styling Architecture

- **Tailwind CSS 4**: Latest version with improved performance
- **CSS-in-JS**: No runtime CSS generation, all static
- **Design System**: Consistent spacing, typography, and color scales
- **Responsive**: Mobile-first approach with breakpoint utilities
- **Animations**: Tailwind animations with custom keyframes

### Dynamic Layout System

The layout system provides complete control over application structure:

```typescript
// Layout configuration example
const layoutConfig: LayoutConfig = {
  header: {
    enabled: true,
    fixed: false,
    height: "md",
    showLogo: true,
    showNavigation: true,
    showUserMenu: true,
    collapsible: true,
  },
  sidebar: {
    enabled: true,
    position: "left",
    variant: "fixed", // 'drawer' | 'overlay'
    width: "md", // 'sm' | 'lg' | 'xl'
    collapsible: true,
    defaultCollapsed: false,
    showOnMobile: false,
  },
  // ... more configuration
};
```

**Key Features:**

- **Responsive Breakpoints**: Different configurations for mobile/desktop
- **Multiple Variants**: Fixed sidebar, drawer, or overlay modes
- **State Persistence**: Layout preferences saved automatically
- **Smooth Transitions**: CSS transitions for all layout changes
- **Mobile Optimization**: Touch-friendly mobile navigation

### Testing Suite

**Complete testing setup:**

- **Unit Tests**: Jest + Testing Library for components
- **Integration Tests**: API integration testing
- **E2E Tests**: Authentication and critical user flows
- **Coverage**: Comprehensive coverage reporting

Run tests:

```
pnpm test
pnpm test:watch
pnpm test:coverage
```

## Project Structure

```
next-starter/
├── app/                          # Next.js 15 app directory
│   ├── [locale]/                 # Internationalized routes
│   │   ├── layout.tsx           # Root layout with ScrollToTop integration
│   │   ├── page.tsx             # Protected home page
│   │   ├── (auth)/              # Authentication routes
│   │   │   ├── login/           # Login page (public)
│   │   │   ├── signup/          # Signup page (public)
│   │   │   ├── forgot/          # Forgot password (public)
│   │   │   ├── otp/             # OTP verification (flow-protected)
│   │   │   └── reset/           # Password reset (flow-protected)
│   │   ├── dashboard/           # Protected dashboard
│   │   └── home/                # Home page content
│   └── globals.css              # Global styles with ScrollToTop CSS
│
├── components/
│   ├── shared/                  # Shared UI components
│   │   ├── scroll-to-top.tsx   # Global scroll-to-top button (NEW)
│   │   ├── data-table.tsx      # Reusable data table
│   │   ├── error-boundary.tsx  # Error handling
│   │   └── ...                  # Other shared components
│   ├── layout/                  # Layout components
│   │   ├── header.tsx          # Application header
│   │   ├── sidebar.tsx         # Dynamic sidebar
│   │   └── footer/             # Footer components
│   ├── form/                    # Form system
│   │   ├── base-form.tsx       # Universal form component
│   │   └── fields/             # 20+ field types
│   └── ui/                      # shadcn/ui components
│
├── middleware.ts                # Auth & routing middleware (UPDATED)
├── i18n/                        # Internationalization
│   ├── routing.ts              # Route definitions
│   ├── navigation.ts           # i18n navigation helpers
│   └── messages/               # Translation files
│
├── lib/
│   ├── auth/                   # Authentication utilities
│   ├── axios/                  # API client configuration
│   └── utils.ts                # Shared utilities
│
├── hooks/                      # Custom React hooks
│   ├── use-auth.ts            # Authentication hook
│   ├── use-sidebar.tsx        # Sidebar state management
│   └── ...
│
├── store/                      # Redux state management
│   ├── index.ts               # Store configuration
│   └── slices/                # Redux slices
│
├── socket/                     # Real-time functionality
│   ├── socket.io.ts           # Socket.IO configuration
│   └── websocket.ts           # WebSocket implementation
│
├── types/                      # TypeScript definitions
└── validations/                # Zod schemas
```

### Key Files for New Features

- **Route Protection**: `middleware.ts` - Authentication checks and redirects
- **Scroll-to-Top**: `components/shared/scroll-to-top.tsx` - Global scroll button
- **Layout Integration**: `app/[locale]/layout.tsx` - ScrollToTop component integration
- **Styles**: `app/globals.css` - RTL support and animations for scroll button

```

```
