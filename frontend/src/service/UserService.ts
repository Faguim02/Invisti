import { api } from "../axios/Api";
import { UserDto } from "../data/Dtos";
import StatusCode from "./StatusCode/StatusCode";

export class UserService {
    
    async signUp(data: UserDto) {
        try {
            
            const req  = await api.post('/signUp', data);

            const statusCode = StatusCode(req.status, "Usuario")

            if(statusCode.status != "success") {
                throw new Error(statusCode.message)
            }

            return req.data

        } catch (error) {
            
            return error;

        }
    }

    async signIn(data: UserDto) {
        try {
            
            const req = await api.post('/signIn', data);

            const statusCode = StatusCode(req.status, "Login")

            if(statusCode.status != "success") {
                throw new Error(statusCode.message)
            }

            return req.data

        } catch (error) {
            
            return error;

        }
    }
}