import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import Credentials from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs';
//import { saltAndHashPassword } from "@/utils/password"

export const prisma = new PrismaClient()
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {
        label: "Email",
        type: "text",},
        password: { 
        label: "Password",
        type: "password"},
      },
      authorize: async (credentials) => {
      
        const {email, password} = credentials;

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
      },
    }),
  ],

  secret: process.env.AUTH_SECRET,


})