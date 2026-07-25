"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Shield, ShoppingBag, Truck } from "lucide-react"
import Image from "next/image"

function MockSignupForm() {
    const router = useRouter()

    const handleSignup = (role: "ADMIN" | "VENDOR" | "SUPPLIER") => {
        // Set the mock role cookie
        document.cookie = `juno_mock_role=${role}; path=/; max-age=86400; samesite=lax`
        
        // Redirect to the appropriate dashboard
        if (role === "ADMIN") {
            router.push("/admin")
        } else if (role === "VENDOR") {
            router.push("/dashboard")
        } else {
            router.push("/supplier")
        }
    }

    return (
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/10 text-center">
            <div className="inline-flex items-center justify-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-white/10 flex items-center justify-center backdrop-blur-sm overflow-hidden shadow-lg shadow-indigo-500/20">
                    <Image
                        src="/logo.png"
                        alt="JUNO Logo"
                        width={56}
                        height={56}
                        className="object-cover"
                    />
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-white">Sign Up (Mock Demo)</h1>
            </div>
            
            <p className="text-slate-400 text-sm mb-8">
                This is a frontend-only demo. Select a role below to instantly create a mock account and view its dashboard.
            </p>

            <div className="flex flex-col gap-4">
                <button
                    onClick={() => handleSignup("ADMIN")}
                    className="w-full h-14 bg-white/10 hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-500/50 text-white font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer"
                >
                    <Shield className="w-5 h-5 text-indigo-400" />
                    Sign up as Admin
                </button>

                <button
                    onClick={() => handleSignup("VENDOR")}
                    className="w-full h-14 bg-white/10 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/50 text-white font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer"
                >
                    <ShoppingBag className="w-5 h-5 text-emerald-400" />
                    Sign up as Vendor
                </button>

                <button
                    onClick={() => handleSignup("SUPPLIER")}
                    className="w-full h-14 bg-white/10 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/50 text-white font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer"
                >
                    <Truck className="w-5 h-5 text-blue-400" />
                    Sign up as Supplier
                </button>
            </div>
        </div>
    )
}

export default function SignupPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 md:p-6 relative overflow-hidden auth-glass-dark">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md relative z-10"
            >
                <MockSignupForm />
            </motion.div>
        </div>
    )
}
