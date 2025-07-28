import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/", // homepage is accessible without signing in
  "/sign-in(.*)", // sign-in routes
  "/sign-up(.*)", // sign-up routes
  "/api/webhooks(.*)", // webhook routes
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)", // ignore static files and internals
    "/(api|trpc)(.*)",        // always match API routes
  ],
};