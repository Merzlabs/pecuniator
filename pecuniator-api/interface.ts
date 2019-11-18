// Public API must be declared here for intellisense in editor
// External imports are not allowed!!

interface PecuniatorAccount {
    /**
     * Accounts currency
     */
    currency: string;
}

interface Entry {
    refrence: string;
    ammount: {value: string, currency: string};
    creditordebit: string;
    bookingDate: string;
    debitorIBAN: string;
    creditorIBAN: string;
}

interface Pecuniator {
    accounts: Array<PecuniatorAccount>;

    /**
     * These are the transactions
     */
    //entries: Array<Entry>;
}
