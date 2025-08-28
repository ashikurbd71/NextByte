# Authentication & Redirect System

This directory contains components and utilities for handling authentication and automatic redirects in the NextByte application.

## Overview

The authentication system provides:

- Automatic redirect to login page for unauthenticated users
- Redirect back to the original page after successful login
- Support for URL parameters to specify redirect destinations
- Persistent redirect URLs across browser sessions

## Components

### ProtectedRoute

A component that wraps content and automatically redirects unauthenticated users to the login page.

```jsx
import { ProtectedRoute } from "@/components/auth/protected-route";

function MyProtectedPage() {
  return (
    <ProtectedRoute>
      <div>This content is only visible to authenticated users</div>
    </ProtectedRoute>
  );
}
```

### withAuth (Higher-Order Component)

A higher-order component that can wrap any page component to add authentication protection.

```jsx
import { withAuth } from "@/components/auth/with-auth";

function MyPage() {
  return <div>Protected content</div>;
}

export default withAuth(MyPage, {
  redirectTo: "/login",
  showLoading: true,
});
```

## Hooks

### useRedirect

A custom hook that provides utilities for managing redirect URLs.

```jsx
import { useRedirect } from "@/hooks/use-redirect";

function MyComponent() {
  const {
    saveRedirectUrl,
    getRedirectUrl,
    clearRedirectUrl,
    redirectToSavedUrl,
  } = useRedirect();

  // Save current page URL before redirecting to login
  const handleLoginClick = () => {
    saveRedirectUrl(window.location.pathname);
    router.push("/login");
  };

  // Redirect to saved URL after login
  const handleAfterLogin = () => {
    redirectToSavedUrl("/dashboard"); // fallback to dashboard
  };
}
```

## Utilities

### auth-utils.js

Utility functions for authentication and redirect handling.

```jsx
import {
  getLoginUrl,
  isAuthenticated,
  getCurrentUser,
  saveRedirectUrl,
} from "@/lib/auth-utils";

// Generate login URL with redirect parameter
const loginUrl = getLoginUrl("/dashboard");

// Check if user is authenticated
const authenticated = isAuthenticated();

// Get current user data
const user = getCurrentUser();

// Save redirect URL
saveRedirectUrl("/some-protected-page");
```

## How It Works

### 1. Unauthenticated User Access

When an unauthenticated user tries to access a protected page:

1. The `ProtectedRoute` or `withAuth` component detects the user is not authenticated
2. The current page URL is saved to localStorage using `saveRedirectUrl()`
3. The user is redirected to the login page

### 2. Login Process

During the login process:

1. The login page checks for redirect parameters in the URL
2. If found, the redirect URL is saved to localStorage
3. After successful login, the auth context automatically redirects to the saved URL

### 3. Post-Login Redirect

After successful login:

1. The auth context checks for a saved redirect URL in localStorage
2. If found, the user is redirected to that URL and the saved URL is cleared
3. If no saved URL exists, the user is redirected to the dashboard

## Usage Examples

### Protecting a Page

```jsx
// Using ProtectedRoute
function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

// Using withAuth HOC
function ProfilePage() {
  return <ProfileContent />;
}

export default withAuth(ProfilePage);
```

### Manual Redirect Handling

```jsx
function CoursePage() {
  const { saveRedirectUrl } = useRedirect();
  const router = useRouter();

  const handleEnrollClick = () => {
    if (!isAuthenticated()) {
      saveRedirectUrl("/course/123");
      router.push("/login");
    } else {
      // Proceed with enrollment
      enrollInCourse();
    }
  };
}
```

### Login with Redirect Parameter

```jsx
// Navigate to login with redirect parameter
router.push("/login?redirect=" + encodeURIComponent("/course/123"));

// Or use the utility function
router.push(getLoginUrl("/course/123"));
```

## Configuration

The redirect system can be configured through the auth context:

```jsx
// In auth-context.js
const login = (userData, token, redirectUrl = null) => {
  // ... login logic

  if (redirectUrl) {
    router.push(redirectUrl);
  } else {
    const savedRedirectUrl = localStorage.getItem("redirectUrl");
    if (savedRedirectUrl) {
      localStorage.removeItem("redirectUrl");
      router.push(savedRedirectUrl);
    } else {
      router.push("/dashboard"); // default redirect
    }
  }
};
```

## Security Considerations

- Redirect URLs are validated to prevent open redirects
- Login page URLs are never saved as redirect destinations
- All redirect URLs are cleared after successful login
- URL parameters are properly encoded/decoded

## Browser Compatibility

The system uses localStorage for persistence, which is supported in all modern browsers. For older browsers, the system gracefully falls back to default redirects.
