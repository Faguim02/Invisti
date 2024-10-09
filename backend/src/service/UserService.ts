import { compare, hash } from "bcrypt";
import { UserDto } from "../data/Dtos";
import { prisma } from "../data/prismaClient";
import { sign } from 'jsonwebtoken';

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

    async signIn(data: UserDto) {
        try {
            
            if(!data.email || !data.password) {
                throw new Error('email or password invalide');
            }

            const isEmailExists = await prisma.user.findFirst({where: {email: data.email}});

            if(!isEmailExists) {
                throw new Error('user not found');
            }

            const comparePassord = await compare(data.password, isEmailExists.password);

            if(!comparePassord) {
                throw new Error('user not found');
            }

            const jwtSecret = process.env.SECRET_JWT as string;

            const token = await sign(
                {
                    name: isEmailExists.name,
                    email: isEmailExists.email
                },
                jwtSecret,
                {
                    subject: isEmailExists.id,
                    expiresIn: '30d'
                }
            );

            return {
                jwt: token,
                id: isEmailExists.id,
                name: isEmailExists.name,
                email: isEmailExists.email
            }

        } catch (error) {
            return error+""
        }
    }
}