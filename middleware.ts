import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

async function verifyToken(token: string | undefined) {
  if (!token) return false;

  try {
    // Convert the secret key to Uint8Array
    const secretKey = new TextEncoder().encode(
      process.env.JWT_SECRET as string
    );

    // Verify the token
    await jwtVerify(token, secretKey, {
      algorithms: ["HS256"],
    });
    return true; // Token is valid
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return false; // Token verification failed
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const isVerified = await verifyToken(token); // **Await here to ensure verification is complete**

  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/docs")) {
    if (!isVerified) {
      return NextResponse.redirect(new URL("/login", request.url)); // Redirect if token is invalid
    }
  }

  if (pathname.startsWith("/login")) {
    if (isVerified) {
      return NextResponse.redirect(new URL("/dashboard", request.url)); // Redirect if already authenticated
    }
  }

  if (pathname.startsWith("/logout")) {
    const response = NextResponse.redirect(new URL("/login", request.url));

    // Expire the token cookie
    response.cookies.set("token", "", { maxAge: 0, path: "/" });

    return response;
  }

  return NextResponse.next(); // Allow access if token is valid
}

// Middleware will apply to all paths
export const config = {
  matcher: "/:path*",
};
