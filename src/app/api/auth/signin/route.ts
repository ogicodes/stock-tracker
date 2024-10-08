import prisma from "@/lib/db";
import bcrypt from "bcrypt";
import * as jose from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

// POST function to sign in a user
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const foundUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!foundUser) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return Response.json({ error: "Invalid password" }, { status: 401 });
    }
    console.log(foundUser);
    const token = await new jose.SignJWT({
      id: foundUser.id.toString(),
      email: foundUser.email,
      name: foundUser.name,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("72h")
      .sign(secret);
    return Response.json({ token });
  } catch (error) {
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
