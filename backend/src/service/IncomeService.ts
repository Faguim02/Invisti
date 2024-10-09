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
}