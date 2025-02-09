export type UserDto = {
    id?: string,
    name: string,
    email: string,
    password?: string,
    date_created?: string,
    last_updated?: string
  
    receive_money?: any,
    income?: any
    expense?: any
  }
  
  export type ReceiveMoney = {
    id?: string,
    balance: number | string
    date?: string
    user_id?: string
  }
  
  export type Income = {
    id?: string,
    amount: number | string,
    description?: string,
    date?: string,
    user_id?: string
  }
  
  export type Expense = {
    id?: string,
    amount: number | string,
    description?: string,
    date?: string,
    user_id?: string
  }

  
  export type IncomeTransactionsForMonthDto = {
    amountFull: number,
    listIncomeTransaction: Income[]
  }
  
  export type ReceiveMoneyTransactionsForMonthDto = {
    amountFull: number,
    listReceiveTransaction: ReceiveMoney[]
  }
  
  export type ExpenseTransactionsForMonthDto = {
    amountFull: number,
    listExpenseTransaction: Expense[]
  }

  export type TransactionsForMonthDto = {
    incomes?: IncomeTransactionsForMonthDto,
    expenses?: ExpenseTransactionsForMonthDto,
    receives?: ReceiveMoneyTransactionsForMonthDto
  }
