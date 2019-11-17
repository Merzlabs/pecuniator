import CAMT from 'camtts';
import { AccountReport } from 'camtts/dist/types/AccountReport';
import { Account as CAMTAccount } from 'camtts/dist/types/Report';


class Account implements PecuniatorAccount {

    constructor(private account: CAMTAccount) { }

    get currency() {
        return this.account.currency ?? '';
    }
}

class PecuniAPI implements Pecuniator {
    reports: Array<AccountReport>;

    constructor() {
        this.reports = [];
    }

    load(data: string) {
        this.reports.push(CAMT.parse(data));
    }

    get accounts() {
        return this.reports.map((elem) => new Account(elem.report.account));
    }
}

module.exports = PecuniAPI;
