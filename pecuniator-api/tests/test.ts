import PecuniAPI from '../main';

import * as fs from 'fs';
import * as path from 'path';

describe('PecuniAPI', () => {
    let camt: string;

    beforeAll(() => {
        camt = fs.readFileSync(path.resolve(__dirname, 'test.xml'), 'utf-8');
    });

    it('parse should work', () => {
        const api = new PecuniAPI();
        api.load(camt);
        expect(api.accounts).toBeDefined();
    });
});
