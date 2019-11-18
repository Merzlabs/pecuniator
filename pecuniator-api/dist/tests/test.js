"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = __importDefault(require("../main"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
describe('PecuniAPI', () => {
    let camt;
    beforeAll(() => {
        camt = fs.readFileSync(path.resolve(__dirname, 'test.xml'), 'utf-8');
    });
    it('parse should work', () => {
        const api = new main_1.default();
        api.load(camt);
        expect(api.accounts).toBeDefined();
    });
});
