"use client"

import { useEffect, useState } from "react"

export function useSession() {
    const [session, setSession] = useState<{ user: any } | null>(null)
    const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading")

    useEffect(() => {
        const getCookie = (name: string) => {
            const value = `; ${document.cookie}`
            const parts = value.split(`; ${name}=`)
            if (parts.length === 2) return parts.pop()?.split(";").shift()
            return null
        }

        const role = getCookie("juno_mock_role") || "VENDOR"
        
        const mockUsers: Record<string, any> = {
            ADMIN: { id: "admin-123", email: "admin@junohub.com", role: "ADMIN", name: "Admin User" },
            VENDOR: { id: "vendor-123", email: "vendor@store.com", role: "VENDOR", name: "Vendor User" },
            SUPPLIER: { id: "supplier-123", email: "supplier@brand.com", role: "SUPPLIER", name: "Supplier User" },
        }

        setSession({ user: mockUsers[role] })
        setStatus("authenticated")
    }, [])

    const update = async () => {}

    return { data: session, status, update }
}
