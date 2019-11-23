import PecuniAPI from '../main.browser';

import * as fs from 'fs';
import * as path from 'path';
import { PecuniatorEntry } from '../interface';

describe('PecuniAPI', () => {
    let camt: string;
    let api: PecuniAPI;
    let entries: Array<PecuniatorEntry>;

    beforeAll(() => {
        camt = fs.readFileSync(path.resolve(__dirname, 'test.xml'), 'utf-8');
        api = new PecuniAPI();
        api.load(camt);
    });

    it('parse should work', () => {
        expect(api.accounts).toBeDefined();
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
            expect(entry.amount).toEqual('4.02');
            expect(entry.creditordebit).toEqual('DBIT');
            expect(entry.bookingDate).toEqual('2019-11-08');
            expect(entry.additionalEntryInfo).toEqual('TRANSFER');

            // Transaction parties
            expect(entry.debitorIBAN).toEqual('DE86999999999999999999');
            expect(entry.creditorIBAN).toEqual('HR9123912345670329373');
        });
    });
});
