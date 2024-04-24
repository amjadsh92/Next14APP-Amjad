"use server"

import { prisma } from "@/auth"
import bcrypt from "bcryptjs"

 export const signUp = async (email, password) => {
  const user = await prisma.userLogin.findUnique({
    where: {
      email
    }
  })

  if (user) {
    return "User with that email already exists."
  }

  const passwordHash = bcrypt.hashSync(password, 10)

  await prisma.userLogin.create({
    data: {
      email,
      passwordHash
    }
  })

  return "Successfully created new user!"
}
