import prisma from '@/lib/db'
import bcrypt from 'bcrypt'

const saltRounds = 10;

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
    return Response.json(user)
}