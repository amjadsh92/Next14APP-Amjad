import prisma from "@/lib/prisma";
import { Account, AuthOptions, Profile, Session, User } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth";


// I understood how the providers key work, but the rest of the code I didn't get it so much. If we can discuss in the next session the goal of the others key (pages, session, jwt,session, and callbacks) and how they work. Also the handler and exporting it as GET or POST, I didn't get that much. So it would be good to discuss how does the code work here.

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "your@email.com"
        },
        password: {
          label: "Password",
          type: "password"
        }
      },
      authorize: async credentials => {
        if (!credentials) {
          return null
        }

        const { email, password } = credentials

        const user = await prisma.userLogin.findUnique({
          where: {
            email
          }
        })

        if (!user) {
          return null
        }

        const userPassword = user.password

        const isValidPassword = bcrypt.compareSync(password, userPassword)

        if (!isValidPassword) {
          return null
        }

        return user
      }
    })
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout"
  },
  secret: "veryimportantsecret",
  jwt: {
    async encode({ secret, token }) {
      if (!token) {
        throw new Error("No token to encode")
      }
      return jwt.sign(token, secret)
    },
    async decode({ secret, token }) {
      if (!token) {
        throw new Error("No token to decode")
      }
      const decodedToken = jwt.verify(token, secret)
      if (typeof decodedToken === "string") {
        return JSON.parse(decodedToken)
      } else {
        return decodedToken
      }
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60
  },
  callbacks: {
    async session(params) {
      if (params.session.user) {
        params.session.user.email = params.token.email
      }

      return params.session
    },
    async jwt(params) {
      if (params.user) {
        params.token.email = params.user.email
      }

      return params.token
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
