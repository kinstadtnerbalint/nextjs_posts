export { default } from "next-auth/middleware"

export const config = { matcher: ["/posts", '/posts/:path*', '/profile/:path*']}