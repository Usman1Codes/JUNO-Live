import { NextResponse, type NextRequest } from "next/server"

export default function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl
    
    // Check mock login state
    const roleCookie = req.cookies.get("juno_mock_role")?.value
    const isLoggedIn = !!roleCookie
    
    const isDashboard = pathname.startsWith("/dashboard")
    const isSupplier = pathname.startsWith("/supplier")
    const isOnboarding = pathname === "/onboarding"
    const isAuthPage = pathname === "/login" || pathname === "/signup"

    // Simple auth protection
    if ((isDashboard || isSupplier || isOnboarding) && !isLoggedIn) {
        return NextResponse.redirect(new URL("/login", req.nextUrl))
    }

    // Role-based routing
    if (isLoggedIn) {
        if (isAuthPage) {
            // Redirect to appropriate dashboard based on role
            if (roleCookie === "SUPPLIER") {
                return NextResponse.redirect(new URL("/supplier", req.nextUrl))
            }
            if (roleCookie === "ADMIN") {
                return NextResponse.redirect(new URL("/admin", req.nextUrl))
            }
            return NextResponse.redirect(new URL("/dashboard", req.nextUrl))
        }

        // Prevent suppliers from accessing vendor dashboard
        if (isDashboard && roleCookie === "SUPPLIER") {
            return NextResponse.redirect(new URL("/supplier", req.nextUrl))
        }

        // Prevent vendors from accessing supplier dashboard
        if (isSupplier && roleCookie === "VENDOR") {
            return NextResponse.redirect(new URL("/dashboard", req.nextUrl))
        }
        
        // Prevent vendors and suppliers from accessing admin
        if (pathname.startsWith("/admin") && roleCookie !== "ADMIN") {
             if (roleCookie === "SUPPLIER") return NextResponse.redirect(new URL("/supplier", req.nextUrl))
             return NextResponse.redirect(new URL("/dashboard", req.nextUrl))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/admin/:path*", "/dashboard/:path*", "/supplier/:path*", "/onboarding", "/login", "/signup"],
}
