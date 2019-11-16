importScripts('./build/domparser_bundle.js');

var DOMParser = xmldom.DOMParser;

onmessage = function(e) {
  console.log('Worker: Message received from main script');
  let result = e.data;
  this.console.log(result);

  const testParser = new DOMParser()
  this.console.log(testParser);
  const doc = testParser.parseFromString("<xml><test>HI</test></xml>");
  this.console.log(testParser);
  this.console.log(doc.getElementsByTagName("test")[0].textContent);
}