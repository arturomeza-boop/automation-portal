import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookiesToSet: any[]) => {
  cookiesToSet.forEach((c: any) =>
    res.cookies.set(c.name, c.value, c.options)
  );
},
    }
  );

  const { data } = await supabase.auth.getUser();
  const isAuth = !!data.user;

  const path = req.nextUrl.pathname;

  const protectedPrefixes = ["/dashboard", "/requests", "/projects", "/admin"];
  const isProtected = protectedPrefixes.some((p) => path.startsWith(p));

  if (isProtected && !isAuth) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (path === "/" ) {
    const url = req.nextUrl.clone();
    url.pathname = isAuth ? "/dashboard" : "/login";
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/requests/:path*", "/projects/:path*", "/admin/:path*"],
};
