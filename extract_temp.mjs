import AdmZip from 'adm-zip';
import fs from 'fs';

const zipPath = 'attached_assets/site_1759421832518.zip';
const extractTo = 'attached_assets/site_completo';

if (!fs.existsSync(extractTo)) {
  fs.mkdirSync(extractTo, { recursive: true });
}

const zip = new AdmZip(zipPath);
zip.extractAllTo(extractTo, true);

console.log(`Extracted to ${extractTo}`);

const entries = zip.getEntries();
console.log(`\nTotal files: ${entries.length}`);
console.log('\nFirst 30 files:');
entries.slice(0, 30).forEach(entry => {
  console.log(`  ${entry.entryName}`);
});
