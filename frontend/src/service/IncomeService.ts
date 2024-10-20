import Cookies from "ts-cookies";
import { Income } from "../data/Dtos";
import { api } from "../axios/Api";

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

            return response.data;

        } catch (error) {
            return error
        }
    }
}