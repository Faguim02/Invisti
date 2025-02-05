import { api } from "../axios/Api";

export class CalculatorService {
    async finalMoney(data: Record<string, number>) {
        try {
            
            const res = await api.post('/calculator/final-money-for-month', data);

            return res.data;

        } catch (error) {
            return {
                message: "erro"
            }
        }
    }

    async finalMoneyMonth(data: Record<string, number>) {
        try {
            
            const res = await api.post('/calculator/final-money', data);

            return res.data;

        } catch (error) {
            return {
                message: "erro"
            }
        }
    }
}