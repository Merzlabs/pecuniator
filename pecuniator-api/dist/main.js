"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const camtts_1 = __importDefault(require("camtts"));
// This is the implementation of the interface with use of the CAMT parser
class PAccount {
    constructor(account) {
        this.account = account;
    }
    get currency() {
        return this.account.currency;
    }
}
exports.PAccount = PAccount;
class PEntry {
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
exports.PEntry = PEntry;
/**
 * Main entry point of API
 */
class PecuniAPI {
    constructor() {
        this.reports = [];
    }
    load(data) {
        this.reports.push(camtts_1.default.parse(data));
    }
    clear() {
        this.reports = [];
    }
    get accounts() {
        return this.reports.map((elem) => new PAccount(elem.report.account));
    }
    get entries() {
        let allEntries = [];
        for (const report of this.reports) {
            allEntries = allEntries.concat(report.report.entries.map((elem) => new PEntry(elem)));
        }
        return allEntries;
    }
}
exports.PecuniAPI = PecuniAPI;
