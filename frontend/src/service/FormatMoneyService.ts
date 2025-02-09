export class FormatMoneyService {
    public formatMoney(number: number): string {
        return number.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    
    public formatDate(dateString: string): string {
        const date = new Date(dateString)
        const monthList = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
        const day = `0${date.getDate()}`.slice(-2);
        const month = monthList[date.getMonth()];
        const year = date.getFullYear();

        return `${day} ${month} ${year}`
    }
}