//import CAMT from "camtts";

importScripts('./build/domparser.js');
importScripts('./build/camt.js');

onmessage = function(e) {
  console.log('Worker: Message received from main script');
  let result = e.data;
  this.console.log(result);

  const parser = CAMT.parse(result);
  this.console.info(parser.groupHeader.messageId);
}