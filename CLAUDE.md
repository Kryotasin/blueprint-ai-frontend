# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

## Architecture Overview

### Tech Stack
- **Next.js 15.4.4** with App Router and Turbopack dev mode
- **React 19** with TypeScript
- **Redux Toolkit** for state management
- **Tailwind CSS** with shadcn/ui component system
- **Roboto** font family via Google Fonts
- **Axios** with custom interceptors for API calls

### State Management Architecture
The application uses Redux Toolkit with two main slices:

1. **Auth Slice** (`src/store/authSlice.ts`):
   - Manages authentication state (user, isAuthenticated, loading, error)
   - Actions: loginStart, loginSuccess, loginFailure, logout, clearError

2. **Figma Slice** (`src/store/figmaSlice.ts`):
   - Manages Figma file data and user selections
   - Tracks file tree, selected file/page/component, and component data
   - Hierarchical selection clearing (selecting file clears page/component)

### Authentication Flow
- **Figma OAuth Integration**: Users authenticate via Figma OAuth
- **Session-based**: Uses cookies with `withCredentials: true`
- **Protected Routes**: `AuthWrapper` component handles auth checks and redirects
- **API Integration**: Backend at `localhost:8080/api/v1` with automatic 401 handling

### Key Components
- **AuthWrapper** (`src/components/AuthWrapper.tsx`): Main authentication boundary
- **FigmaTreeView** (`src/components/FigmaTreeView.tsx`): Interactive Figma file structure display
- **StoreProvider** (`src/components/providers/reduxProvider.tsx`): Redux store provider

### API Architecture
- **Axios Instance** (`src/lib/axios.ts`): Configured with base URL and interceptors
- **Service Layer**:
  - `authService` (`src/services/auth.ts`): Authentication operations
  - `figmaService` (`src/services/figma.ts`): Figma API operations with URL parsing

### Type Definitions
Global TypeScript interfaces in `type.d.ts`:
- `User`, `AuthState` for authentication
- `TreeNode`, `FigmaState` for Figma data structures

### File Structure Patterns
- **App Router**: Pages in `src/app/` with route-based organization
- **Components**: Reusable UI components in `src/components/`
- **Services**: API abstraction layer in `src/services/`
- **Store**: Redux slices and configuration in `src/store/`
- **Types**: Global type definitions in root `type.d.ts`

### Design System
- **Color Palette**: Enterprise-friendly neutral grays (won't interfere with colorful content)
- **Typography**: Roboto font family with proper web font loading
- **Spacing**: 4px-based scale (4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96px)
- **Breakpoints**: xs(475px), sm(640px), md(768px), lg(1024px), xl(1280px), 2xl(1536px)
- **Components**: shadcn/ui foundation with CSS variables and Tailwind utilities
- **Utilities**: `cn()` helper function for conditional class merging

### Development Notes
- **Path Aliases**: `@/*` maps to `src/*` in tsconfig.json
- **ESLint**: Next.js core web vitals and TypeScript rules
- **Environment**: Hardcoded localhost URLs should be replaced with environment variables
- **Error Handling**: Uses Redux for state-based error management
- **Styling**: Use Tailwind classes and shadcn/ui components for consistent design

### API Dependencies
Requires backend server running on `localhost:8080` with these endpoints:
- `GET /api/v1/auth/me` - Check authentication status
- `GET /api/v1/auth/figma/login` - Initiate Figma OAuth
- `POST /api/v1/auth/logout` - Logout user
- `GET /api/v1/figma/file/{fileKey}` - Load Figma file data