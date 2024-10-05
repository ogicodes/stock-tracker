import prisma from '@/lib/db'
import bcrypt from 'bcrypt'


export async function POST(request: Request) {
    const { email, password } = await request.json()
    const foundUser = await prisma.user.findFirst({
        where: {
            email
        }
    })
    if (!foundUser) {
        return Response.json({ error: 'User not found' }, { status: 404 })
    }
    const isMatch = await bcrypt.compare(password, foundUser.password)
    if (!isMatch) {
        return Response.json({ error: 'Invalid password' }, { status: 401 })
    }
    return Response.json(foundUser)
}