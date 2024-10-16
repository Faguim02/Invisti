import { api } from "../axios/Api";
import { UserDto } from "../data/Dtos";
import Cookies from "cookies-ts";

export class UserService {

    private cookies = new Cookies()
    
    async signUp(data: UserDto): Promise<{message: any, success: boolean}> {
        try {
            
            const response  = await api.post('/signUp', data);

            if(response.data !== "account created") {
                return {
                    message: response.data,
                    success: false
                }
            }

            return {
                message: response.data,
                success: true
            }

        } catch (error) {
            
            console.log(error)
            
            return {
                message: error+'',
                success: false
            };

        }
    }

    async signIn(data: UserDto): Promise<{message: any, success: boolean}> {
        try {
            
            const response = await api.post('/signIn', data);

            const token: any = response.data;

            if(!token.jwt) {
                throw new Error(response.data+'')
            }

            this.cookies.set('access_token', token.jwt)

            return {
                message: response.data,
                success: true
            };

        } catch (error) {

            console.log(error)
            
            return {
                message: error+'',
                success: false
            };

        }
    }
}