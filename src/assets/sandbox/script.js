//import CAMT from "camtts";

importScripts('./build/domparser.js');
importScripts('./build/camt.js');

onmessage = function(e) {
  console.log('Worker: Message received from main script');
  const result = e.data;

  /** @type {import('./node_modules/camtts/dist/types/AccountReport').AccountReport} */
  const parser = CAMT.parse(result);
  this.console.info(parser.groupHeader.messageId);
  this.postMessage(parser.groupHeader.messageId);
}