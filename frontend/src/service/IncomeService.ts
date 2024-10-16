import Cookies from "ts-cookies";
import { Income } from "../data/Dtos";
import { api } from "../axios/Api";
import StatusCode from "./StatusCode/StatusCode";

export class IncomeService {
    async incomeMoney(data: Income) {
        try {
            
            const access_token = Cookies.get('access_token');
            
            if (!access_token) {
                throw new Error('não autorizado')
            }

            const response = await api.post('/income', data, {
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

    async findAllIncome() {
        try {
            
            const access_token = Cookies.get('access_token');
            
            if (!access_token) {
                throw new Error('não autorizado')
            }

            const response = await api.get('/income', {
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

    async findIncomeForMonth(month: string, year: string) {
        try {
            
            const access_token = Cookies.get('access_token');
            
            if (!access_token) {
                throw new Error('não autorizado')
            }

            const response = await api.get(`/income/${month}/${year}`, {
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