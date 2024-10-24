type DateSelectType = {
    month: string,
    year: number
}

export class DateSelectService {

    isDateSelectedExist(month: number, year: number) {
        const yearActual = new Date().getFullYear()
        const monthActual = new Date().getMonth() + 1

        if(year == yearActual) {
            if(month > monthActual) {
                return false
            }
        }

        return true
    }

    covertMonthTextInNumber(month: string): number {

        const monthList = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

        return monthList.indexOf(month) + 1;
    }

    private covertMonthNumberInText(month: number): string {
        const monthList = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

        return monthList[month - 1]
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