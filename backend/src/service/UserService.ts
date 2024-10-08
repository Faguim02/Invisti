import { hash } from "bcrypt";
import { UserDto } from "../data/Dtos";
import { prisma } from "../data/prismaClient";

export class UserService {

    async signUp(data: UserDto) {
        try {
            
            if(!data.email || !data.password) {
                throw new Error('email or password invalide');
            }

            const isEmailExists = await prisma.user.findFirst({
                where: {
                    email: data.email
                }
            });

            if(isEmailExists || !data.password) {
                throw new Error('pleace, create a new email, this email existent');
            }

            const passwordHash = await hash(data.password, 8);

            await prisma.user.create({data: {
                name: data.name,
                email: data.email,
                password: passwordHash
            }});

            return "account created";

        } catch (error) {
            return error+""
        }
    }
}