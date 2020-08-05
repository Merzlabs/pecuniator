import PecuniAPI from '../main.browser';

import * as fs from 'fs';
import * as path from 'path';
import { PecuniatorEntry } from '../interface';

describe('PecuniAPI - CAMT', () => {
    let camt: string;
    let api: PecuniAPI;
    let entries: Array<PecuniatorEntry>;

    beforeEach(() => {
        camt = fs.readFileSync(path.resolve(__dirname, 'test.xml'), 'utf-8');
        api = new PecuniAPI();
        api.load(camt);
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
            expect(entries.length).toEqual(3);
        });

        it('Entry[0] should be valid', () => {
            const entry = entries[0];
            expect(entry).toBeDefined();
            expect(entry.reference).toBeUndefined();
            expect(entry.currency).toEqual('EUR');
            expect(entry.amount).toEqual(4.02);
            expect(entry.creditordebit).toEqual('DBIT');
            expect(entry.bookingDate).toEqual('2019-11-08');
            expect(entry.additionalEntryInfo).toEqual('TRANSFER');

            // Transaction parties
            expect(entry.debitorIBAN).toEqual('DE86999999999999999999');
            expect(entry.creditorIBAN).toEqual('HR9123912345670329373');

            expect(entry.creditorName).toEqual('Creditor Name');
            expect(entry.creditorUltimateName).toEqual('Ultimate Creditor Name');
            expect(entry.debtorName).toEqual('Debtor Name');
            expect(entry.debtorUltimateName).toEqual('Ultimate Debtor Name');

            expect(entry.isDebit).toEqual(true);
            expect(entry.isCredit).toEqual(false);

            // Verwendungszweck
            expect(entry.remittanceInformation).toEqual(['COUNT        1']);
        });
    });
});
