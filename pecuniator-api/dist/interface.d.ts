interface PecuniatorAccount {
    /**
     * Accounts currency
     */
    currency: string;
}
interface Pecuniator {
    accounts: Array<PecuniatorAccount>;
}
