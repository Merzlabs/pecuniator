try {
  importScripts('./node_modules/@merzlabs/pecuniator-api/dist/main.js');
} catch(e) {
  console.error('Import failed', e);
}

onmessage = function(e) {
  const data = e.data;
  console.log('Worker: Message received from main script', data);
  const Pecuniator = new PecuniAPI()
  Pecuniator.load(data.camtData);

  eval(data.script);
}