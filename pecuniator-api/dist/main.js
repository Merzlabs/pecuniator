"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const camtts_1 = __importDefault(require("camtts"));
const camt_1 = require("./camt");
const klarna_1 = require("./klarna");
/**
 * Main entry point of API
 */
class PecuniAPI {
    constructor() {
        this.reports = [];
        this.transactions = [];
    }
    load(data) {
        var _a, _b;
        // Asume type
        if (typeof data === 'string') {
            this.reports.push(camtts_1.default.parse(data));
        }
        else {
            if (((_b = (_a = data.result) === null || _a === void 0 ? void 0 : _a.transactions) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                // Asume Klarna for now
                this.transactions = this.transactions.concat(data.result.transactions.map((elem) => new klarna_1.KlarnaEntry(elem)));
            }
        }
    }
    clear() {
        this.reports = [];
    }
    get accounts() {
        return this.reports.map((elem) => new camt_1.CamtAccount(elem.report.account));
    }
    get entries() {
        let allEntries = [];
        for (const report of this.reports) {
            allEntries = allEntries.concat(report.report.entries.map((elem) => new camt_1.CamtEntry(elem)));
        }
        // Add additional already parsed entries
        if (this.transactions.length > 0) {
            allEntries = allEntries.concat(this.transactions);
        }
        return allEntries;
    }
}
exports.PecuniAPI = PecuniAPI;
