import PecuniAPI from '../main.browser';

import * as fs from 'fs';
import * as path from 'path';
import { PecuniatorEntry } from '../interface';

describe('PecuniAPI - Klarna', () => {
    let api: PecuniAPI;
    let entries: Array<PecuniatorEntry>;

    beforeEach(() => {
        const jsonString = fs.readFileSync(path.resolve(__dirname, 'klarna-transaction.json'), 'utf-8');
        api = new PecuniAPI();
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
            expect(entry.debtorIBAN).toEqual('DE44500105175407324931');
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
