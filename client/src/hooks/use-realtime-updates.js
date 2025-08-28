import { useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'

/**
 * Custom hook for handling real-time user data updates
 * This hook ensures that components stay in sync with the latest user data
 */
export function useRealtimeUpdates() {
    const { user, updateUser } = useAuth()

    useEffect(() => {
        // Listen for custom user data update events
        const handleUserDataUpdate = (event) => {
            const updatedUserData = event.detail
            if (updatedUserData && updatedUserData !== user) {
                updateUser(updatedUserData)
            }
        }

        // Listen for localStorage changes (for cross-tab synchronization)
        const handleStorageChange = (e) => {
            if (e.key === 'userData' && e.newValue) {
                try {
                    const newUserData = JSON.parse(e.newValue)
                    if (newUserData !== user) {
                        updateUser(newUserData)
                    }
                } catch (error) {
                    console.error('Error parsing user data from storage:', error)
                }
            }
        }

        // Add event listeners
        window.addEventListener('userDataUpdated', handleUserDataUpdate)
        window.addEventListener('storage', handleStorageChange)

        // Cleanup event listeners
        return () => {
            window.removeEventListener('userDataUpdated', handleUserDataUpdate)
            window.removeEventListener('storage', handleStorageChange)
        }
    }, [user, updateUser])

    return { user }
}

/**
 * Hook for components that need to react to user data changes
 * This is useful for components that display user information
 */
export function useUserDataSync() {
    const { user } = useAuth()

    useEffect(() => {
        // This effect will run whenever user data changes
        // Components can use this to trigger additional updates or side effects
        if (user) {
            // // You can add any additional logic here that should run when user data changes
            // console.log('User data updated:', user)
        }
    }, [user])

    return { user }
}
