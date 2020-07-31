import CAMT from 'camtts';
import { AccountReport } from 'camtts/dist/types/AccountReport';
import { Pecuniator, PecuniatorEntry, PecuniatorAccount } from './interface';
import { CamtAccount, CamtEntry } from './camt';
import { KlarnaEntry } from './klarna';

export * from './interface';

/**
 * Main entry point of API
 */
export class PecuniAPI implements Pecuniator {
    /**
     * CAMT reports
     */
    reports: Array<AccountReport>;
    transactions: Array<PecuniatorEntry>;

    constructor() {
        this.reports = [];
        this.transactions = [];
    }

    load(data: string|any) {
        // Asume type
        if (typeof data === 'string') {
            this.reports.push(CAMT.parse(data));
        } else {
            if (data.result?.transactions?.length > 0) {
                // Asume Klarna for now
                this.transactions = this.transactions.concat(data.result.transactions.map((elem: any) => new KlarnaEntry(elem)));
            }
        }
    }

    clear() {
        this.reports = [];
        this.transactions = [];
    }

    get accounts(): PecuniatorAccount[] {
        return this.reports.map((elem) => new CamtAccount(elem.report.account));
    }

    get entries(): PecuniatorEntry[] {
        let allEntries: Array<PecuniatorEntry> = [];

        for (const report of this.reports) {
            allEntries = allEntries.concat(report.report.entries.map((elem) => new CamtEntry(elem)));
        }

        // Add additional already parsed entries
        if (this.transactions.length > 0) {
            allEntries = allEntries.concat(this.transactions);
        }

        return allEntries;
    }
}
