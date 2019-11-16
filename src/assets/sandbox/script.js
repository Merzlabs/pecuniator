console.log('Script data', data);
const result = data.camtData;

/** @type {import('./node_modules/camtts/dist/types/AccountReport').AccountReport} */
const parser = CAMT.parse(result);
this.console.info("Script", parser.groupHeader.messageId);
this.postMessage("Date: " + parser.groupHeader.creationDateTime);