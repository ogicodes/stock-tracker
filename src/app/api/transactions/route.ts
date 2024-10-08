import prisma from '@/lib/db'


export async function POST(request: Request) {
    const { userId, stockId, stockPrice, amount } = await request.json()
    if (!userId || !stockId || !stockPrice || !amount) {
        return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }
    const foundStock = await prisma.stocks.findFirst({ where: { name: stockId } })
    if (!foundStock) {
        const creadtedStock = await prisma.stocks.create({
            data: {
                price: stockPrice,
                name: stockId,
                userId
            }
        })
        const createdTransaction = await prisma.transactions.create({
            data: {
                price: amount,
                stockId: creadtedStock.id,
                userId
            }
        })
        return Response.json(createdTransaction)
    }
    else {
        const createdTransaction = await prisma.transactions.create({
            data: {
                price: amount,
                stockId: foundStock.id,
                userId
            }
        })
        return Response.json(createdTransaction)
    }
}