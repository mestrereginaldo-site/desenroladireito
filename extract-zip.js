const AdmZip = require('adm-zip');
const zip = new AdmZip('attached_assets/DesenrolaDireito_1759418792712.zip');
zip.extractAllTo('attached_assets/', true);
console.log('Extracted successfully');
