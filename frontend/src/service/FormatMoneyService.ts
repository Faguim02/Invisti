export class FormatMoneyService {
    public formatMoney(number: number): string {
        return number.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }
}