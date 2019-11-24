import CAMT from 'camtts';
import { AccountReport } from 'camtts/dist/types/AccountReport';
import { Account } from 'camtts/dist/types/Report';
import { Entry } from 'camtts/dist/types/Entry';
import { Pecuniator, PecuniatorEntry, PecuniatorAccount } from './interface';

export class PAccount implements PecuniatorAccount {

    constructor(private account: Account) { }

    get currency() {
        return this.account.currency;
    }
}

export class PEntry implements PecuniatorEntry {

    constructor(private entry: Entry) {}

    get reference() {
        return this.entry.reference;
    }

    get amount() {
        return this.entry.amount.value;
    }

    get currency() {
        return this.entry.amount.currency;
    }

    get bookingDate() {
        return this.entry.bookindDate.date;
    }

    get creditorIBAN() {
        return this.entry.entryDetails.transactionDetails.relatedParties.creditorAccount.id.iban;
    }

    get debitorIBAN() {
        return this.entry.entryDetails.transactionDetails.relatedParties.debitorAccount.id.iban;
    }

    get creditordebit() {
        return this.entry.creditdebitIndicator;
    }

    get additionalEntryInfo() {
        return this.entry.additionalEntryInfo;
    }
}

/**
 * Main entry point of API
 */
export class PecuniAPI implements Pecuniator {
    reports: Array<AccountReport>;

    constructor() {
        this.reports = [];
    }

    load(data: string) {
        this.reports.push(CAMT.parse(data));
    }

    clear() {
        this.reports = [];
    }

    get accounts() {
        return this.reports.map((elem) => new PAccount(elem.report.account));
    }

    get entries() {
        let allEntries: Array<PEntry> = [];

        for (const report of this.reports) {
            allEntries = allEntries.concat(report.report.entries.map((elem) => new PEntry(elem)));
        }

        return allEntries;
    }
}
