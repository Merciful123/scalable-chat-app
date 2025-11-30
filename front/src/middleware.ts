// export {default} from "next-auth/middleware";


// export const config = {
//     matcher: ["/dashboard"],
// }

import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Optional: log or custom logic
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Only allow logged-in users
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};
