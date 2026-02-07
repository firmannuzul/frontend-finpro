import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      //   name: string;
      email: string;
      role: string;
      accessToken: string;
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      async authorize(user) {
        if (!user) return null;
        return user;
      },
    }),

  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60, // 2 hours
  },
  callbacks: {
    async signIn() {
      return true;
    },
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }: any) {
      if (token.user) session.user = token.user;
      return session;
    },
  },

});

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   trustHost: true,
//   providers: [
//     Credentials({
//       async authorize(user) {
//         if (!user) return null;
//         return user;
//       },
//     }),
//     Google({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       authorization: {
//         params: {
//           prompt: "consent",
//           access_type: "offline",
//           response_type: "code",
//         },
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//   },
//   session: {
//     strategy: "jwt",
//     maxAge: 2 * 60 * 60, // 2 hours
//   },

//   callbacks: {
//     async signIn({ account, profile }) {
//       if (account?.provider === "google") {
//         const email = profile?.email;
//         const verified = profile?.email_verified;

//         if (!email || !verified) return false;
//         return email.endsWith("@example.com");
//       }

//       // credentials / provider lain
//       return true;
//     },

//     async jwt({ token, user }) {
//       if (user) token.user = user;
//       return token;
//     },

//     async session({ session, token }: any) {
//       if (token.user) session.user = token.user;
//       return session;
//     },
//   },
// });
