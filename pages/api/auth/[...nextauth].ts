import NextAuth from "next-auth";
import { compare } from "bcrypt";
import Credentials from "next-auth/providers/credentials";
import prismadb from "@/lib/prismadb";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export default NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        }
      },
      async authorize(creds) {
        if (!creds?.email || !creds?.password) {
          throw new Error("Email and password are required");
        }

        const user = await prismadb.user.findUnique({
          where: {
            email: creds.email,
          }
        });

        if (!user || !user.password) {
          throw new Error("Invalid Email");
        }

        const isCorrectPassword = await compare(creds.password, user.password);

        if (!isCorrectPassword) {
          throw new Error("Incorrect password");
        }

        return user;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  secret: process.env.SECRET,
  adapter: PrismaAdapter(prismadb),
})


