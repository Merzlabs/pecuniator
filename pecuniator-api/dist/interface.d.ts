interface PecuniatorAccount {
    /**
     * Accounts currency short name like (EUR)
     */
    currency: string | null | undefined;
}
interface PecuniatorEntry {
    reference: string | null | undefined;
    amount: number | null | undefined;
    creditordebit: string | null | undefined;
    bookingDate: string | null | undefined;
    creditorIBAN: string | null | undefined;
    /**
     * Party to which amount of money is due / Einreicher der Lastschrift
     */
    creditorName: string | null | undefined;
    /**
     * Ultimate party to which an amount of money is due. / Konto des Lastschrifteinreichers
     */
    creditorUltimateName: string | null | undefined;
    debtorIBAN: string | null | undefined;
    /**
     * Debtor / Zahler
     */
    debtorName: string | null | undefined;
    /**
     * Ultimate debtor different from creditor / Abweichender Zahler
     */
    debtorUltimateName: string | null | undefined;
    /**
     * Currency short name (like EUR)
     */
    currency: string | null | undefined;
    additionalEntryInfo: string | null | undefined;
    /**
     * Subject / Verwendungszweck
     */
    remittanceInformation: string[] | null | undefined;
    isCredit: boolean;
    isDebit: boolean;
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
export { Pecuniator, PecuniatorEntry, PecuniatorAccount };
