"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const camtts_1 = require("camtts");
class Account {
    constructor(account) {
        this.account = account;
    }
    get currency() {
        var _a;
        return _a = this.account.currency, (_a !== null && _a !== void 0 ? _a : '');
    }
}
class PecuniAPI {
    constructor() {
        this.reports = [];
    }
    load(data) {
        this.reports.push(camtts_1.default.parse(data));
    }
    get accounts() {
        return this.reports.map((elem) => new Account(elem.report.account));
    }
}
module.exports = PecuniAPI;
