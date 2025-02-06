import "@testing-library/jest-dom"

import { describe, it, expect } from 'vitest';
import { FormatMoneyService } from '../../../src/service/FormatMoneyService';

describe('FormatMoneyService', () => {
    it('should format number as money string', () => {
        const service = new FormatMoneyService();
        const result = service.formatMoney(1234567.89);
        expect(result).toBe('1.234.567,89');
    });

    it('should format zero as money string', () => {
        const service = new FormatMoneyService();
        const result = service.formatMoney(0);
        expect(result).toBe('0,00');
    });

    it('should format negative number as money string', () => {
        const service = new FormatMoneyService();
        const result = service.formatMoney(-1234.56);
        expect(result).toBe('-1.234,56');
    });
});

