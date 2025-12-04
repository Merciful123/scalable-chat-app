import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const url = req.nextUrl;

    // Determine environment
    const host = req.headers.get("host") || "";
    const proto = req.headers.get("x-forwarded-proto") || "";

    const isLocalhost = host.includes("localhost") || host.includes("127.0.0.1");

    /**
     *  Force HTTPS ONLY on production (Render)
     * Localhost MUST remain HTTP, otherwise Chrome throws:
     * ERR_SSL_PROTOCOL_ERROR
     */
    if (!isLocalhost && proto !== "http") {
      url.protocol = "https:";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Require authentication
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};
