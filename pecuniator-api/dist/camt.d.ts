import { Account } from 'camtts/dist/types/Report';
import { Entry } from 'camtts/dist/types/Entry';
import { PecuniatorAccount, PecuniatorEntry } from './interface';
export declare class CamtAccount implements PecuniatorAccount {
    private account;
    constructor(account: Account);
    get currency(): string | null | undefined;
}
export declare class CamtEntry implements PecuniatorEntry {
    private entry;
    constructor(entry: Entry);
    get reference(): string | null | undefined;
    get amount(): number;
    get currency(): string | null | undefined;
    get bookingDate(): string | null | undefined;
    get creditorIBAN(): string | null | undefined;
    get creditorName(): string | null | undefined;
    get creditorUltimateName(): string | null | undefined;
    get debtorIBAN(): string | null | undefined;
    get debtorName(): string | null | undefined;
    get debtorUltimateName(): string | null | undefined;
    get creditordebit(): string | null | undefined;
    get additionalEntryInfo(): string | null | undefined;
    get remittanceInformation(): string[];
    get isCredit(): boolean;
    get isDebit(): boolean;
}
