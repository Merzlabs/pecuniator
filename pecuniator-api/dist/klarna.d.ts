import { PecuniatorAccount, PecuniatorEntry } from './interface';
export declare class KlarnaAccount implements PecuniatorAccount {
    private account;
    constructor(account: any);
    get currency(): any;
}
export declare class KlarnaEntry implements PecuniatorEntry {
    private entry;
    constructor(entry: any);
    get reference(): any;
    get amount(): number;
    get currency(): any;
    get bookingDate(): any;
    get creditorIBAN(): any;
    get creditorName(): any;
    get creditorUltimateName(): any;
    get debitorIBAN(): any;
    get debtorName(): any;
    get debtorUltimateName(): any;
    get creditordebit(): "CRDT" | "DBIT" | undefined;
    get additionalEntryInfo(): any;
    get remittanceInformation(): any[];
    get isCredit(): boolean;
    get isDebit(): boolean;
}
