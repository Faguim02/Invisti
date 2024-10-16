import { api } from "../axios/Api";
import { UserDto } from "../data/Dtos";
import StatusCode from "./StatusCode/StatusCode";
import Cookies from "cookies-ts";

export class UserService {

    private cookies = new Cookies()
    
    async signUp(data: UserDto) {
        try {
            
            const response  = await api.post('/signUp', data);

            const statusCode = StatusCode(response.status, "Usuario")

            if(statusCode.status != "success") {
                throw new Error(statusCode.message)
            }

            return response.data

        } catch (error) {
            
            return error;

        }
    }

    async signIn(data: UserDto) {
        try {
            
            const response = await api.post('/signIn', data);

            const statusCode = StatusCode(response.status, "Login")

            if(statusCode.status != "success") {
                throw new Error(statusCode.message)
            }

            const token: any = response.data;

            this.cookies.set('access_token', token.jwt)

            return response.data;

        } catch (error) {
            
            return error;

        }
    }
}