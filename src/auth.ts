import { cookies } from "next/headers";

export type Role = "ADMIN" | "VENDOR" | "SUPPLIER";

const mockUsers: Record<Role, any> = {
    ADMIN: { id: "admin-123", email: "admin@junohub.com", role: "ADMIN", name: "Admin User" },
    VENDOR: { id: "vendor-123", email: "vendor@store.com", role: "VENDOR", name: "Vendor User" },
    SUPPLIER: { id: "supplier-123", email: "supplier@brand.com", role: "SUPPLIER", name: "Supplier User" },
};

export const auth = async () => {
    const cookieStore = await cookies();
    const roleCookie = cookieStore.get("juno_mock_role")?.value as Role | undefined;
    
    // Default to VENDOR if no cookie is set, or return null if we want to force login
    if (!roleCookie) return null;

    return {
        user: mockUsers[roleCookie] || mockUsers.VENDOR,
    };
};

export const signIn = async () => {};
export const signOut = async () => {};
