import Cookies from "ts-cookies";
import { api } from "../axios/Api";
import { ReceiveMoney } from "../data/Dtos";
import StatusCode from "./StatusCode/StatusCode";

export class ReceiveMoneyService {
    async insertFirstMoney(data: ReceiveMoney) {
        try {

            const access_token = Cookies.get('access_token');
            
            if (!access_token) {
                throw new Error('não autorizado')
            }

            const response = await api.post('/money', data, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })

            const statusCode = StatusCode(response.status, "Receita");

            if(statusCode.status != "success") {
                throw new Error(statusCode.message)
            }

            return response.data;

        } catch (error) {
            return error
        }
    }

    async findAllMoney() {

        try {
            const access_token = Cookies.get('access_token');
            
            if (!access_token) {
                throw new Error('não autorizado')
            }

            const response = await api.get('/current', {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })

            const statusCode = StatusCode(response.status, "Receita");

            if(statusCode.status != "success") {
                throw new Error(statusCode.message)
            }

            return response.data;
        } catch (error) {
            return error;
        }

    }

    async findMoneyForMonth(month: string, year: string) {
        try {
            
            const access_token = Cookies.get('access_token');
            
            if (!access_token) {
                throw new Error('não autorizado')
            }

            const response = await api.get(`/current/${month}/${year}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })

            const statusCode = StatusCode(response.status, "Receita");

            if(statusCode.status != "success") {
                throw new Error(statusCode.message)
            }

            return response.data;

        } catch (error) {
            return error
        }
    }

}