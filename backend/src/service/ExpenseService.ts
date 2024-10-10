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

            const receive = await prisma.receiveMoney.findFirst({where: {user_id}});

            await prisma.receiveMoney.create({
                data: {
                    balance: Number(receive?.balance) - Number(data.amount),
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

            return await prisma.expense.findMany({where: {user_id}});

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