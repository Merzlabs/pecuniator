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
const main_1 = __importDefault(require("../main"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
describe('PecuniAPI', () => {
    let camt;
    let api;
    let entries;
    beforeAll(() => {
        camt = fs.readFileSync(path.resolve(__dirname, 'test.xml'), 'utf-8');
        api = new main_1.default();
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
