interface PecuniatorAccount {
    /**
     * Accounts currency
     */
    currency: string | null | undefined;
}
interface PecuniatorEntry {
    reference: string | null | undefined;
    amount: string | null | undefined;
    creditordebit: string | null | undefined;
    bookingDate: string | null | undefined;
    debitorIBAN: string | null | undefined;
    creditorIBAN: string | null | undefined;
    currency: string | null | undefined;
    additionalEntryInfo: string | null | undefined;
}
interface Pecuniator {
    accounts: Array<PecuniatorAccount>;
    /**
     * These are the transactions
     */
    entries: Array<PecuniatorEntry>;
}
export { Pecuniator, PecuniatorEntry, PecuniatorAccount };
