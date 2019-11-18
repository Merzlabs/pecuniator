"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const camtts_1 = __importDefault(require("camtts"));
class Account {
    constructor(account) {
        this.account = account;
    }
    get currency() {
        var _a;
        return _a = this.account.currency, (_a !== null && _a !== void 0 ? _a : '');
    }
}
/**
 * Main entry point of API
 */
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
