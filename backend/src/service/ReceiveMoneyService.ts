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

            const money = await prisma.receiveMoney.findFirst({
                where: {
                    user_id
                }
            });

            return money;

        } catch (error) {
            return error+""
        }
    }
}