"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// This is the implementation of the interface with use of the CAMT parser
class CamtAccount {
    constructor(account) {
        this.account = account;
    }
    get currency() {
        return this.account.currency;
    }
}
exports.CamtAccount = CamtAccount;
class CamtEntry {
    constructor(entry) {
        this.entry = entry;
    }
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
        return this.entry.entryDetails.remittanceInformation.unstructured;
    }
}
exports.CamtEntry = CamtEntry;
