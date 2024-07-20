// import  { PrismaAdapter } from "@auth/prisma-adapter";
// import {
//   getServerSession,
//   type DefaultSession,
//   type NextAuthOptions,
// } from "next-auth";
// import { type Adapter } from "next-auth/adapters";
// import DiscordProvider from "next-auth/providers/discord";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcrypt";

// import { env } from "~/env";
// import { db } from "~/server/db";

// /**
//  * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
//  * object and keep type safety.
//  *
//  * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
//  */
// declare module "next-auth" {
//   interface Session extends DefaultSession {
//     user: {
//       id: string;
//       // ...other properties
//       // role: UserRole;
//     } & DefaultSession["user"];
//   }

//   // interface User {
//   //   // ...other properties
//   //   // role: UserRole;
//   // }
// }

// /**
//  * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
//  *
//  * @see https://next-auth.js.org/configuration/options
//  */
// export const authOptions: NextAuthOptions = {
//   callbacks: {
//     session: ({ session, user }) => ({
//       ...session,
//       user: {
//         ...session.user,
//         id: user.id,
//       },
//     }),
//   },
//   adapter: PrismaAdapter(db) as Adapter,
//   providers: [
//     DiscordProvider({
//       clientId: env.DISCORD_CLIENT_ID,
//       clientSecret: env.DISCORD_CLIENT_SECRET,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email", placeholder: "john.doe@example.com" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Invalid credentials");
//         }

//         const user = await db.user.findUnique({
//           where: { email: credentials.email },
//         });

//         if (!user) {
//           // If user doesn't exist, create a new one
//           const hashedPassword = await bcrypt.hash(credentials.password, 10);
//           const newUser = await db.user.create({
//             data: {
//               email: credentials.email,
//               password: hashedPassword,
//             },
//           });
//           return newUser;
//         }

//         // If user exists, verify password
//         const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

//         if (!isPasswordValid) {
//           throw new Error("Invalid credentials");
//         }

//         return user;
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/auth/signin",
//     // signOut: '/auth/signout',
//     // error: '/auth/error', // Error code passed in query string as ?error=
//     // verifyRequest: '/auth/verify-request', // (used for check email message)
//     // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
//   },
//   session: {
//     strategy: "jwt",
//   },
//   secret: env.NEXTAUTH_SECRET,
// };

// /**
//  * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
//  *
//  * @see https://next-auth.js.org/configuration/nextjs
//  */
// export const getServerAuthSession = () => getServerSession(authOptions);


import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import { env } from "~/env";
import { db } from "~/server/db";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, token }) => {
      if (token && typeof token.id === 'string') {
        session.user = {
          ...session.user,
          id: token.id,
        };
      }
      return session;
    },
    jwt: ({ token, user }) => {
      if (user && typeof user.id === 'string') {
        token.id = user.id;
      }
      return token;
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "john.doe@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          // If user doesn't exist, create a new one
          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          const newUser = await db.user.create({
            data: {
              email: credentials.email,
              password: hashedPassword,
            },
          });
          return newUser;
        }

        // If user exists, verify password
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        return user; // Ensure the user object is returned correctly
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
     // signOut: '/auth/signout',
//     // error: '/auth/error', // Error code passed in query string as ?error=
//     // verifyRequest: '/auth/verify-request', // (used for check email message)
//     // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  session: {
    strategy: "jwt",
  },
  secret: env.NEXTAUTH_SECRET,
};

export const getServerAuthSession = () => getServerSession(authOptions);

