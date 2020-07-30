import { AccountReport } from 'camtts/dist/types/AccountReport';
import { Pecuniator, PecuniatorEntry, PecuniatorAccount } from './interface';
/**
 * Main entry point of API
 */
export declare class PecuniAPI implements Pecuniator {
    /**
     * CAMT reports
     */
    reports: Array<AccountReport>;
    transactions: Array<PecuniatorEntry>;
    constructor();
    load(data: string | any): void;
    clear(): void;
    get accounts(): PecuniatorAccount[];
    get entries(): PecuniatorEntry[];
}
