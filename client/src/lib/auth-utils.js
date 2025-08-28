/**
 * Utility functions for authentication and redirect handling
 */

/**
 * Generate a login URL with redirect parameter
 * @param {string} redirectUrl - The URL to redirect to after login
 * @returns {string} - Login URL with redirect parameter
 */
export function getLoginUrl(redirectUrl = null) {
    if (!redirectUrl) {
        return '/login'
    }

    // Encode the redirect URL to be safe in query parameters
    const encodedRedirect = encodeURIComponent(redirectUrl)
    return `/login?redirect=${encodedRedirect}`
}

/**
 * Check if user is authenticated (client-side)
 * @returns {boolean} - True if user is authenticated
 */
export function isAuthenticated() {
    if (typeof window === 'undefined') {
        return false
    }

    const authToken = localStorage.getItem('authToken')
    const userData = localStorage.getItem('userData')

    return !!(authToken && userData)
}

/**
 * Get current user data from localStorage
 * @returns {object|null} - User data or null if not authenticated
 */
export function getCurrentUser() {
    if (typeof window === 'undefined') {
        return null
    }

    try {
        const userData = localStorage.getItem('userData')
        return userData ? JSON.parse(userData) : null
    } catch (error) {
        console.error('Error parsing user data:', error)
        return null
    }
}

/**
 * Clear all authentication data
 */
export function clearAuthData() {
    if (typeof window === 'undefined') {
        return
    }

    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
    localStorage.removeItem('redirectUrl')
}

/**
 * Save redirect URL for after login
 * @param {string} url - The URL to redirect to after login
 */
export function saveRedirectUrl(url) {
    if (typeof window === 'undefined') {
        return
    }

    // Don't save login page as redirect URL
    if (!url.includes('/login')) {
        localStorage.setItem('redirectUrl', url)
    }
}

/**
 * Get saved redirect URL
 * @returns {string|null} - Saved redirect URL or null
 */
export function getRedirectUrl() {
    if (typeof window === 'undefined') {
        return null
    }

    return localStorage.getItem('redirectUrl')
}

/**
 * Clear saved redirect URL
 */
export function clearRedirectUrl() {
    if (typeof window === 'undefined') {
        return
    }

    localStorage.removeItem('redirectUrl')
}
