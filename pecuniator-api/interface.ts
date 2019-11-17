// Public API must be declared here for intellisense in editor

interface PecuniatorAccount {
    /**
     * Accounts currency
     */
    currency: string;
}

interface Pecuniator {
    accounts: Array<PecuniatorAccount>;
}
