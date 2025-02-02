import financialCalculatorService from '../../src/service/financialCalculatorService';

describe('Financial Calculator Service', () => {
  it('should calculate the monthly payment', () => {
    const monthlyPayment = new financialCalculatorService().simulateFinalMoney(1000, 15, 12);
    expect(monthlyPayment).toBe(1120);
  });

  it('should calculate the final money', () => {
    const finalMoney = new financialCalculatorService().calculateMonthlyContribution(1000, 15, 12);
    expect(finalMoney).toBe(93.31);
  });

  it('should calculate the time invested', () => {
    const timeInvested = new financialCalculatorService().calculateTimeInvested(1000, 100, 15);
    expect(timeInvested).toBe(10);
  });
});