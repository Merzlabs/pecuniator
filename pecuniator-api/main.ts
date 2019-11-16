import CAMT from 'camtts';
import { AccountReport } from 'camtts/dist/types/AccountReport';

class PecuniAPI {
    reports: Array<AccountReport>;

    constructor() {
        this.reports = [];
    }

    load(data: string) {
        this.reports.push(CAMT.parse(data));
    }
}

module.exports = PecuniAPI;
