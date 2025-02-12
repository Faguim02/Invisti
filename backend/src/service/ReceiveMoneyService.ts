import { ReceiveMoney } from "../data/Dtos";
import { prisma } from "../data/prismaClient";

export class ReceiveMoneyService {
    async insertFirstMoney(data: ReceiveMoney, user_id: string): Promise<boolean | string> {
        try {
            
            if(!data.balance || !user_id) {
                throw new Error('not authorized');
            }

            await prisma.receiveMoney.create({
                data: {
                    balance: data.balance,
                    user_id
                }
            });

            return true;

        } catch (error) {
            return error+"";
        }
    }

    async findAllMoney(user_id: string) {
        try {
            
            if(!user_id!) {
                throw new Error('not authorized');
            }

            const money = await prisma.receiveMoney.findMany({
                where: {
                    user_id
                }
            });

            if(money.length == 0) {
                return {
                    balance: 0,
                    id: user_id
                }
            }

            return money[money.length -1];

        } catch (error) {
            return error+""
        }
    }

    async findMoneyForMonth(user_id: string, month: string, year: string) {
        try {
            
            if(!user_id || !month) {
                throw new Error('not Authorized');
            }

            const startDate = new Date(`${year}-${month}-01`);
            const endDate = new Date(`${year}-${month}-30`);

            const listReceiveTransaction = await prisma.receiveMoney.findMany({
                where: {
                    date: {
                        gte: startDate,
                        lte: endDate
                    },
                    user_id
                }
            })

            const fullAmount = listReceiveTransaction.reduce((full, item)=> full + Number(item.balance), 0)

            return {listReceiveTransaction, fullAmount};

        } catch (error) {
            return error+""
        }
    }
}