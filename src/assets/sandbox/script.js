/** @type {Pecuniator} */
const pecuniator = api;
/**
Your data is available with the `pecuniator` variable. Use autocomplete for assistance
You can find documentaion for all available objects here: https://docs.pecuniator.com/modules/_interface_.html
**/
const acc = pecuniator.accounts[0];
this.console.info('Script', acc.currency);
const firstTransaction = pecuniator.entries[0];

const categories = { //Add you categories here with id, title and search query.
    saving: {
        remittanceInformation: ["DEPOT"],
        amount: 0,
        title: "Savings"    
    },
    fuel: {
        creditorName: ["Tank"],
        amount: 0,
        title: "Tank"   
    },
    insu: {
        remittanceInformation: ["Versicherung"],
        amount: 0,
        title: "Insurance"   
    },
    online: {
        creditorName: ["Paypal"],
        amount: 0,
        title: "Online"   
    },
    cell: {
        creditorName: ["Drillisch", "Telekom"],
        amount: 0,
        title: "Cellphone"   
    },
};
if (!firstTransaction) {
    this.postMessage({ error: 'No transaction' })
} else {
    for (const entry of pecuniator.entries) {
        entry.found = []
        checkCategories(entry);         
    }

    for(const name in categories) {
        const cat = categories[name];
        this.postMessage({ textAppend: `|| ${cat.title} - ${cat.amount}€ ||` });
    }
}
/** @type {PecuniatorEntry} */
function checkCategories(tmp) {
    /** @type {PecuniatorEntry} */
    const entry = tmp;
    for(const catname in categories) {
        const cat = categories[catname];
        for(const check in cat) {
            if(check !== "amount" && check !== "title" && typeof entry[check] !== "undefined") {
                if (typeof entry[check] === "string"){
                    entry[check] = [entry[check]];
                }
                for (const test of cat[check]) {
                    if (!entry.found.includes(catname) && entry[check].toString().toLowerCase().includes(test.toLowerCase())) {
                        cat.amount += new Number(entry.amount);
                        entry.found.push(catname);
                    }
                }
            }
        }
    }
}