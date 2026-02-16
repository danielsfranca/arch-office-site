import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protect Admin Dashboard
    if (pathname.startsWith("/admin-dashboard")) {
        const adminSession = request.cookies.get("admin_session");
        if (!adminSession) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    // Protect Client Dashboard
    if (pathname.startsWith("/client-dashboard")) {
        const clientSession = request.cookies.get("client_session");
        // Also allow admins to view client dashboard if needed? Or keep separate.
        // For now, strict: client needs client_session.
        if (!clientSession) {
            // Optional: Redirect admins to admin dashboard if they try to access client dash?
            // For now, just redirect to login if no session.
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    return NextResponse.next();
}

// Configure paths to match
export const config = {
    matcher: ["/admin-dashboard/:path*", "/client-dashboard/:path*"],
};
