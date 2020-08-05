"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_browser_1 = __importDefault(require("../main.browser"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
describe('PecuniAPI - Klarna', () => {
    let api;
    let entries;
    beforeEach(() => {
        const jsonString = fs.readFileSync(path.resolve(__dirname, 'klarna-transaction.json'), 'utf-8');
        api = new main_browser_1.default();
        api.load(JSON.parse(jsonString));
    });
    it('parse should work', () => {
        expect(api.accounts).toBeDefined();
    });
    it('clear should work', () => {
        api.clear();
        expect(api.accounts.length).toEqual(0);
    });
    describe('api should have a entries', () => {
        beforeEach(() => {
            entries = api.entries;
        });
        it('Entries should exist all', () => {
            expect(entries.length).toEqual(1);
        });
        it('Entry[0] should be valid', () => {
            const entry = entries[0];
            expect(entry).toBeDefined();
            expect(entry.reference).toEqual('Flight 123');
            expect(entry.currency).toEqual('EUR');
            expect(entry.amount).toEqual(12345);
            expect(entry.creditordebit).toEqual('DBIT');
            expect(entry.bookingDate).toEqual('2018-10-23');
            expect(entry.additionalEntryInfo).toEqual('TRANSFER');
            // Transaction parties
            expect(entry.debitorIBAN).toEqual('DE44500105175407324931');
            expect(entry.creditorIBAN).toEqual('DE44500105175407324931');
            expect(entry.creditorName).toEqual('Max Mustermann');
            expect(entry.creditorUltimateName).toEqual('Max Mustermann');
            expect(entry.debtorName).toEqual('Max Mustermann');
            expect(entry.debtorUltimateName).toEqual('Max Mustermann');
            expect(entry.isDebit).toEqual(true);
            expect(entry.isCredit).toEqual(false);
            // Verwendungszweck
            expect(entry.remittanceInformation).toEqual(['Flight 123']);
        });
    });
});
