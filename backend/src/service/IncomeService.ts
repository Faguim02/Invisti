import { Income } from "../data/Dtos";
import { prisma } from "../data/prismaClient";

export class IncomeService {
    async income(data: Income, user_id: string) {
        try {
            
            if(!data.amount || !user_id) {
                throw new Error('not authorized');
            }

            await prisma.income.create({data});

            const startMoney = await prisma.receiveMoney.findFirst({
                where: {
                    user_id
                }
            });

            const newBalance = Number(data.amount) + Number(startMoney?.balance);

            await prisma.receiveMoney.create({
                data: {
                    balance: newBalance
                }
            });

            return 'received success!';

        } catch (error) {
            return error+""
        }
    }

    async findAllIncome(user_id: string) {
        try {
            
            if(!user_id) {
                throw new Error('unauthorized');
            }

            const amounts = await prisma.income.findMany({
                where: {
                    user_id
                }
            });

            return amounts;

        } catch (error) {
            return error+""
        }
    }

    async findIncomeForMonth(user_id: string, month: string, year: string) {
        try {
            
            if(!user_id) {
                throw new Error('unauthorized');
            }

            const startDate = new Date(`${year}-${month}-01`);
            const endDate = new Date(`${year}-${month}-30`);

            const money = await prisma.income.findMany({
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
            return error+''
        }
    }
}