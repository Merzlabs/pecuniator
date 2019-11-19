try {
  importScripts('./node_modules/@merzlabs/pecuniator-api/dist/main.browser.js');
} catch(e) {
  console.error('Import failed', e);
}

onmessage = function(e) {
  const data = e.data;
  const api = new PecuniAPI()
  api.load(data.camtData);

  try {
    eval(data.script);
  } catch (e) {
    this.console.error("Sandbox error", e);
    this.postMessage("Error: " + e.toString());
  }
}