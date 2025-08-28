"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Check if user is logged in on app load
        const checkAuth = () => {
            try {
                const authToken = localStorage.getItem("authToken")
                const userData = localStorage.getItem("userData")

                if (authToken && userData) {
                    setUser(JSON.parse(userData))
                }
            } catch (error) {
                console.error("Error checking auth:", error)
                // Clear invalid data
                localStorage.removeItem("authToken")
                localStorage.removeItem("userData")
            } finally {
                setLoading(false)
            }
        }

        checkAuth()
    }, [])

    // Listen for localStorage changes to sync user data across tabs/windows
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === "userData" && e.newValue) {
                try {
                    const newUserData = JSON.parse(e.newValue)
                    setUser(newUserData)
                } catch (error) {
                    console.error("Error parsing user data from storage:", error)
                }
            }
        }

        window.addEventListener("storage", handleStorageChange)
        return () => window.removeEventListener("storage", handleStorageChange)
    }, [])

    const login = (userData, token, redirectUrl = null) => {
        localStorage.setItem("authToken", token)
        localStorage.setItem("userData", JSON.stringify(userData))
        setUser(userData)

        // Handle redirect after successful login
        if (redirectUrl) {
            // Clear the redirect URL from localStorage
            localStorage.removeItem('redirectUrl')
            router.push(redirectUrl)
        } else {
            // Check if there's a saved redirect URL
            const savedRedirectUrl = localStorage.getItem('redirectUrl')
            if (savedRedirectUrl) {
                localStorage.removeItem('redirectUrl')
                router.push(savedRedirectUrl)
            } else {
                router.push('/dashboard')
            }
        }
    }

    const logout = () => {
        localStorage.removeItem("authToken")
        localStorage.removeItem("userData")
        setUser(null)
        router.push("/")
    }

    const updateUser = (userData) => {
        // Ensure we're updating with the complete user object
        const updatedUserData = typeof userData === 'object' ? userData : { ...user, ...userData }
        localStorage.setItem("userData", JSON.stringify(updatedUserData))
        setUser(updatedUserData)

        // Trigger a custom event to notify other components
        window.dispatchEvent(new CustomEvent('userDataUpdated', { detail: updatedUserData }))
    }

    const value = {
        user,
        loading,
        login,
        logout,
        updateUser,
        isAuthenticated: !!user
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
