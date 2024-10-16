import Cookies from "ts-cookies";
import { Expense } from "../data/Dtos";
import { api } from "../axios/Api";
import StatusCode from "./StatusCode/StatusCode";

export class ExpenseService {
    async expenseMoney(data: Expense) {
        try {
            
            const access_token = Cookies.get('access_token');
            
            if (!access_token) {
                throw new Error('não autorizado')
            }

            const response = await api.post('/expense', data, {
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

    async findAllExpense() {
        try {
            
            const access_token = Cookies.get('access_token');
            
            if (!access_token) {
                throw new Error('não autorizado')
            }

            const response = await api.get('/expense', {
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

    async findExpenseForMonth(month: string, year: string) {
        try {
            
            const access_token = Cookies.get('access_token');
            
            if (!access_token) {
                throw new Error('não autorizado')
            }

            const response = await api.get(`/expense/${month}/${year}`, {
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