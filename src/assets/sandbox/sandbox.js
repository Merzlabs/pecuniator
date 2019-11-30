try {
  importScripts('./node_modules/@merzlabs/pecuniator-api/dist/main.browser.js');
} catch(e) {
  console.error('Import failed', e);
}

onmessage = function(e) {
  const data = e.data;
  const api = new PecuniAPI.default()
  
  const files = data.camtData;
  if (!files || files.length === 0) {
    this.postMessage({ error: 'Error: No files!'})
    return;
  }

  for(const file of files) {
    api.load(file.content);
  }

  try {
    eval(data.script);
  } catch (e) {
    this.console.error('Sandbox error', e);
    this.postMessage({ error: e.toString()});
  }
}