import prisma from '@/lib/db'
import bcrypt from 'bcrypt'
import * as jose from 'jose'

const saltRounds = 10;
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

// POST function to create a user in the database 
export async function POST(request: Request) {
    const { email, password, name } = await request.json()
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name
        }
    })
    const token = await new jose.SignJWT({ id: user.id.toString(), email: user.email, name: user.name }).setProtectedHeader({ alg: "HS256" }).setExpirationTime("72h").sign(secret);
    return Response.json({ token })
}