"use server";

import z from "zod";
import { hashPassword } from "../auth";
import { prisma } from "../prisma";
import { RegisterSchema, RegisterSchemaType } from "../schemas";

export async function registerUser(data: RegisterSchemaType) {
  const validationResult = RegisterSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      error: "Invalid data provided",
      issues: z.treeifyError(validationResult.error),
    };
  }

  const { email, password, name } = validationResult.data;

  try {
    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) {
      return {
        success: false,
        message: "An account already exists.",
      };
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        role: "user",
        password: hashedPassword,
      },
    });

    const userWithoutPassword = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };

    return {
      success: true,
      user: userWithoutPassword,
    };
  } catch (e) {
    console.error("Registration Server Action Error", e);

    return {
      success: false,
      error: "Could not create account. Please try again later.",
    };
  }
}
