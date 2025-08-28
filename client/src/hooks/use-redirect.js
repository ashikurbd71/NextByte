"use client"

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export function useRedirect() {
    const router = useRouter()
    const searchParams = useSearchParams()

    // Save current page URL when user is not authenticated
    const saveRedirectUrl = (url) => {
        if (typeof window !== 'undefined') {
            // Don't save login page as redirect URL
            if (!url.includes('/login')) {
                localStorage.setItem('redirectUrl', url)
            }
        }
    }

    // Get saved redirect URL
    const getRedirectUrl = () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('redirectUrl')
        }
        return null
    }

    // Clear saved redirect URL
    const clearRedirectUrl = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('redirectUrl')
        }
    }

    // Redirect to saved URL or default
    const redirectToSavedUrl = (defaultUrl = '/dashboard') => {
        const savedUrl = getRedirectUrl()
        if (savedUrl) {
            clearRedirectUrl()
            router.push(savedUrl)
        } else {
            router.push(defaultUrl)
        }
    }

    // Check if there's a redirect parameter in URL
    const getRedirectFromUrl = () => {
        return searchParams.get('redirect')
    }

    // Save redirect URL from URL parameter
    const saveRedirectFromUrl = () => {
        const redirectParam = getRedirectFromUrl()
        if (redirectParam) {
            saveRedirectUrl(decodeURIComponent(redirectParam))
        }
    }

    return {
        saveRedirectUrl,
        getRedirectUrl,
        clearRedirectUrl,
        redirectToSavedUrl,
        getRedirectFromUrl,
        saveRedirectFromUrl
    }
}
