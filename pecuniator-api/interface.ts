// Public API must be declared here for intellisense in editor
// External imports are not allowed!!

interface PecuniatorAccount {
    /**
     * Accounts currency short name like (EUR)
     */
    currency: string|null|undefined;
}

interface PecuniatorEntry {
    reference: string | null | undefined;
    amount: string | null | undefined;
    creditordebit: string | null | undefined;
    bookingDate: string | null | undefined;
    debitorIBAN: string | null | undefined;
    creditorIBAN: string | null | undefined;
    /**
     * Currency short name (like EUR)
     */
    currency: string | null | undefined;
    additionalEntryInfo: string | null | undefined;
}

interface Pecuniator {
    /**
     * Array with all accounts from all imported files
     */
    accounts: Array<PecuniatorAccount>;

    /**
     * These are the transactions from all imported files
     */
    entries: Array<PecuniatorEntry>;
}

export {Pecuniator, PecuniatorEntry, PecuniatorAccount};
