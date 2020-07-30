import CAMT from 'camtts';
import { AccountReport } from 'camtts/dist/types/AccountReport';
import { Account } from 'camtts/dist/types/Report';
import { Entry } from 'camtts/dist/types/Entry';
import { Pecuniator, PecuniatorEntry, PecuniatorAccount } from './interface';

// This is the implementation of the interface with use of the CAMT parser

class PAccount implements PecuniatorAccount {

    constructor(private account: Account) { }

    get currency() {
        return this.account.currency;
    }
}

class PEntry implements PecuniatorEntry {

    constructor(private entry: Entry) {}

    get reference() {
        return this.entry.reference;
    }

    get amount() {
        if (this.entry.amount.value) {
            return parseFloat(this.entry.amount.value);
        }
        return 0;
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

    get creditorName() {
        return this.entry.entryDetails.transactionDetails.relatedParties.creditor.name;
    }

    get creditorUltimateName() {
        return this.entry.entryDetails.transactionDetails.relatedParties.ultimateCreditor.name;
    }

    get debitorIBAN() {
        return this.entry.entryDetails.transactionDetails.relatedParties.debitorAccount.id.iban;
    }

    get debtorName() {
        return this.entry.entryDetails.transactionDetails.relatedParties.debtor.name;
    }

    get debtorUltimateName() {
        return this.entry.entryDetails.transactionDetails.relatedParties.ultimateDebtor.name;
    }

    get creditordebit() {
        return this.entry.creditdebitIndicator;
    }

    get additionalEntryInfo() {
        return this.entry.additionalEntryInfo;
    }

    get remittanceInformation() {
        return this.entry.entryDetails.remittanceInformation.unstructured as string[];
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

    get accounts(): PecuniatorAccount[] {
        return this.reports.map((elem) => new PAccount(elem.report.account));
    }

    get entries(): PecuniatorEntry[] {
        let allEntries: Array<PEntry> = [];

        for (const report of this.reports) {
            allEntries = allEntries.concat(report.report.entries.map((elem) => new PEntry(elem)));
        }

        return allEntries;
    }
}
