import { AccountReport } from 'camtts/dist/types/AccountReport';
import { Account as CAMTAccount } from 'camtts/dist/types/Report';
declare class Account implements PecuniatorAccount {
    private account;
    constructor(account: CAMTAccount);
    get currency(): string;
}
/**
 * Main entry point of API
 */
declare class PecuniAPI implements Pecuniator {
    reports: Array<AccountReport>;
    constructor();
    load(data: string): void;
    get accounts(): Account[];
}
export = PecuniAPI;
