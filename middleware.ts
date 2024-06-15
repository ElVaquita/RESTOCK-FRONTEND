import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

if (!secret) {
  console.error("JWT_SECRET is not defined");
  process.exit(1); // Termina el proceso si JWT_SECRET no está definido
}

// Middleware function
export async function middleware(request: NextRequest) {
  console.log("Middleware funcionando")
  // Retrieve token from request cookies
  const accessToken = request.cookies.get('accessToken')?.value;

  if (!accessToken) {
    console.log("No token, redirecting to login");
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    const { payload } = await jwtVerify(accessToken, secret);

    // Make a request to get the user role
    const role = payload.role;
    console.log("User role:", role);

    const path = request.nextUrl.pathname;
    console.log("Requested path:", path);

    // Handle role-based redirection
    if (
      role === undefined
    ) {
      console.log("Role not found, redirecting to login");
      return NextResponse.redirect(
        new URL('/', request.url)
      );
    }

    if (path.startsWith("/user") && role === "admin") {
      console.log("Admin trying to access user page, redirecting to login");
      return NextResponse.redirect(
        new URL('/', request.url)
      );
    }

    if (path.startsWith("/admin") && role === "mesero") {
      console.log("User trying to access admin page, redirecting to login");
      return NextResponse.redirect(
        new URL('/', request.url)
      );
    }

    console.log("Role and path matched, proceeding to next");
    return NextResponse.next();
  } catch (error) {
    console.error("Error fetching user role:", error);
    return NextResponse.redirect(
      new URL('/', request.url)
    );
  }
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};