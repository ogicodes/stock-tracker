"use server"

import { cookies } from "next/headers";
import * as jose from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export default async function getUserId() {
    const token = cookies().get("token")?.value;
  const { payload } = await jose.jwtVerify(token!, secret, {});
  const { id } = payload as { id: string };
  return id;
}