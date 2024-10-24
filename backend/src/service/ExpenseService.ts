import { Expense } from "../data/Dtos";
import { prisma } from "../data/prismaClient";

export class ExpenseService {
    async expenseMoney(data: Expense, user_id: string) {
        try {
            
            if(!data.amount || !user_id) {
                throw new Error('unautorized!');
            }

            data.user_id = user_id;
            
            await prisma.expense.create({data});

            const receive = await prisma.receiveMoney.findMany({where: {user_id}});

            if(receive.length == 0) {
                await prisma.receiveMoney.create({
                    data: {
                        balance: Number(data.amount),
                        user_id
                    }
                })

                return "expense success!";
            }

            await prisma.receiveMoney.create({
                data: {
                    balance: Number(receive[receive.length -1]?.balance) - Number(data.amount),
                    user_id
                }
            })

            return "expense success!";

        } catch (error) {
            return error+""
        }
    }

    async findAllExpense(user_id: string) {
        try {
            
            if(!user_id) {
                throw new Error('unautorized!');
            }

            const year = new Date().getFullYear()
            const month = new Date().getMonth() + 1

            const startDate = new Date(`${year}-${month}-01`);
            const endDate = new Date(`${year}-${month}-30`);

            const amounts = await prisma.expense.findMany({
                where: {
                    user_id,
                    date: {
                        gte: startDate,
                        lte: endDate
                    },
                }
            });

            if(amounts.length == 0) {
                return {
                    amount: 0,
                    id: user_id
                }
            }

            const amountFull = amounts.reduce((full, item)=> full + Number(item.amount), 0)

            return {
                id: user_id,
                amount: amountFull
            };

        } catch (error) {
            return error+""
        }
    }

    async findExpenseForMonth(user_id: string, month: string, year: string) {
        try {
            
            if(!user_id) {
                throw new Error('unauthorized');
            }

            const startDate = new Date(`${year}-${month}-01`);
            const endDate = new Date(`${year}-${month}-30`);

            const money = await prisma.expense.findMany({
                where: {
                    date: {
                        gte: startDate,
                        lte: endDate
                    },
                    user_id
                }
            })

            return money;

        } catch (error) {
            return error+"";
        }
    }
}