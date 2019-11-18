"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const camtts_1 = __importDefault(require("camtts"));
class PAccount {
    constructor(account) {
        this.account = account;
    }
    get currency() {
        return this.account.currency;
    }
}
class PEntry {
    constructor(entry) {
        this.entry = entry;
    }
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
class PecuniAPI {
    constructor() {
        this.reports = [];
    }
    load(data) {
        this.reports.push(camtts_1.default.parse(data));
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
module.exports = PecuniAPI;
