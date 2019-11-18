interface PecuniatorAccount {
    /**
     * Accounts currency
     */
    currency: string;
}
interface Entry {
    refrence: string;
    ammount: {
        value: string;
        currency: string;
    };
    creditordebit: string;
    bookingDate: string;
    debitorIBAN: string;
    creditorIBAN: string;
}
interface Pecuniator {
    accounts: Array<PecuniatorAccount>;
}
