"use server";

import { cookies } from "next/headers";

const VALID_USERNAME = "Fiza";
const VALID_PASSWORD = "pass1234";

export async function signIn(username: string, password: string) {

  if (username !== VALID_USERNAME || password !== VALID_PASSWORD) {
    return { success: false, message: "Invalid username or password" };
  }

  (await cookies()).set({
    name: "isAuthenticated",
    value: "true",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Secure in production
    path: "/", // Available for all pages
    maxAge: 60 * 60 * 24, 
    sameSite: "strict", 
  });

  return { success: true };
}



export async function logout() {

  (await cookies()).delete("isAuthenticated");

  return { success: true };
}