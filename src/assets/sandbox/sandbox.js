try {
  importScripts('./node_modules/@merzlabs/pecuniator-api/dist/main.browser.js');
} catch(e) {
  console.error('Import failed', e);
}

//Block XHR, fetch, importScripts in sandbox
(function () {
  XMLHttpRequest.prototype.open = () => {
    throw new Error("XHR not allowed");
  };

  fetch = async () => {
    throw new Error("fetch not allowed");
  };

  importScripts = () => {
    throw new Error("Imports not allowed");
  };
}) ();

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