import { Account } from 'camtts/dist/types/Report';
import { Entry } from 'camtts/dist/types/Entry';
import { PecuniatorAccount, PecuniatorEntry } from './interface';

// This is the implementation of the interface with use of the CAMT parser

export class CamtAccount implements PecuniatorAccount {

    constructor(private account: Account) { }

    get currency() {
        return this.account.currency;
    }
}

export class CamtEntry implements PecuniatorEntry {

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

    get debtorIBAN() {
        return this.entry.entryDetails.transactionDetails.relatedParties.debtorAccount.id.iban;
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

    get isCredit() {
        return this.entry.creditdebitIndicator === 'CRDT';
    }

    get isDebit() {
        return this.entry.creditdebitIndicator === 'DBIT';
    }
}
