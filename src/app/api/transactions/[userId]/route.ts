import prisma from '@/lib/db'

export async function GET(_rquest: Request, { params }: { params: { userId: number } }) {
    const { userId } = params;
    const userIdFormated = parseInt(userId.toString())
    if (!userId) {
        return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }
    const foundTransactions = await prisma.transactions.findMany({ where: { userId: userIdFormated } })
    let formatedTransactions = []
    for (let transaction of foundTransactions) {
        const stock = await prisma.stocks.findFirst({ where: { id: transaction.stockId } })
        formatedTransactions.push({
            stock: stock?.name,
            price: transaction.price,
            date: transaction.createdAt
        })
    }
    return Response.json(formatedTransactions)
}