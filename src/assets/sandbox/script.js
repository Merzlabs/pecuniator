/** @type {Pecuniator} */
const pecuniator = api;

//Your data is available with the `pecuniator` variable. Use autocomplete for assitance
const acc = pecuniator.accounts[0];

this.console.info('Script', acc.currency);
const firstTransaction = pecuniator.entries[0];

if (!firstTransaction) {
    this.postMessage({ error: 'No transaction' })
} else {
    this.postMessage({ text: firstTransaction.amount + firstTransaction.currency + ' from ' + firstTransaction.creditorIBAN });
}

this.postMessage({ textAppend: '.' });