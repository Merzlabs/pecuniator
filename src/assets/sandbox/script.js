console.log('Script data', data);

/** @type {Pecuniator} */
const pecuniator = api;

//Your data is available with the `pecuniator` variable. Use autocomplete for assitance
const acc = pecuniator.accounts[0];

this.console.info("Script", acc.currency);
this.postMessage("Nothing");