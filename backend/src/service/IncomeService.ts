import { Income } from "../data/Dtos";
import { prisma } from "../data/prismaClient";

export class IncomeService {
    async income(data: Income, user_id: string) {
        try {
            
            if(!data.amount || !user_id) {
                throw new Error('not authorized');
            }

            data.user_id =  user_id

            await prisma.income.create({data});

            const startMoney = await prisma.receiveMoney.findMany({
                where: {
                    user_id
                }
            });

            if(startMoney.length == 0) {
                await prisma.receiveMoney.create({
                    data: {
                        balance: Number(data.amount),
                        user_id
                    }
                })

                return "received success!"
            }

            const newBalance = Number(data.amount) + Number(startMoney[startMoney.length - 1]?.balance);

            await prisma.receiveMoney.create({
                data: {
                    balance: newBalance,
                    user_id
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

            const year = new Date().getFullYear()
            const month = new Date().getMonth() + 1

            const startDate = new Date(`${year}-${month}-01`);
            const endDate = new Date(`${year}-${month}-30`);

            const amounts = await prisma.income.findMany({
                where: {
                    date: {
                        gte: startDate,
                        lte: endDate
                    },
                    user_id
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

    async findIncomeForMonth(user_id: string, month: string, year: string) {
        try {
            
            if(!user_id) {
                throw new Error('unauthorized');
            }

            const startDate = new Date(`${year}-${month}-01`);
            const endDate = new Date(`${year}-${month}-30`);

            const listIncomeTransaction = await prisma.income.findMany({
                where: {
                    date: {
                        gte: startDate,
                        lte: endDate
                    },
                    user_id
                }
            })

            const amountFull = listIncomeTransaction.reduce((full, item)=> full + Number(item.amount), 0)

            return {
                amountFull,
                listIncomeTransaction
            };
            
        } catch (error) {
            return error+''
        }
    }
}