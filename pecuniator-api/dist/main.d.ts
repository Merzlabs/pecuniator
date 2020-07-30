import { AccountReport } from 'camtts/dist/types/AccountReport';
import { Pecuniator, PecuniatorEntry, PecuniatorAccount } from './interface';
/**
 * Main entry point of API
 */
export declare class PecuniAPI implements Pecuniator {
    reports: Array<AccountReport>;
    constructor();
    load(data: string): void;
    clear(): void;
    get accounts(): PecuniatorAccount[];
    get entries(): PecuniatorEntry[];
}
