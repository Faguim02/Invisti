type DateSelectType = {
    month: string,
    year: number
}

export class DateSelectService {

    private covertMonthTextInNumber(month: string): number {
        switch (month) {
            case "jan":
                return 1
                break;
            case "fev":
                return 2
                break;
            case "mar":
                return 3
                break;
            case "abr":
                return 4
                break;
            case "mai":
                return 5
                break;
            case "jun":
                return 6
                break;
            case "jul":
                return 7
                break;
            case "ago":
                return 8
                break;
            case "set":
                return 9
                break;
            case "out":
                return 10;
                break;
            case "nov":
                return 11
                break;
            case "dez":
                return 12
                break;        
            default:
                return 0
                break;
        }
    }

    private covertMonthNumberInText(month: number): string {
        switch (month) {
            case 1:
                return "jan"
                break;
            case 2:
                return "fev"
                break;
            case 3:
                return "mar"
                break;
            case 4:
                return "abr"
                break;
            case 5:
                return "mai"
                break;
            case 6:
                return "jun"
                break;
            case 7:
                return "jul"
                break;
            case 8:
                return "ago"
                break;
            case 9:
                return "set"
                break;
            case 10:
                return "out";
                break;
            case 11:
                return "nov"
                break;
            case 12:
                return "dez"
                break;        
            default:
                return ""
                break;
        }
    }

    nextMonth(month: string, year: number): DateSelectType {
        let monthNumber = this.covertMonthTextInNumber(month)
        let yearNumber = year

        if(monthNumber < 12) {
            monthNumber++
        } else {
            monthNumber = 1
            yearNumber++
        }

        const monthTxt = this.covertMonthNumberInText(monthNumber)
        return {
            month: monthTxt,
            year: yearNumber
        }
    }

    backMonth(month: string, year: number): DateSelectType {
        let monthNumber = this.covertMonthTextInNumber(month)
        let yearNumber = year

        if(monthNumber > 1) {
            monthNumber--
        } else {
            monthNumber = 12
            yearNumber--
        }

        const monthTxt = this.covertMonthNumberInText(monthNumber)
        return {
            month: monthTxt,
            year: yearNumber
        }
    }
}