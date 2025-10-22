import AdmZip from 'adm-zip';
import fs from 'fs';
import path from 'path';

const zipPath = 'attached_assets/site_1759421832518.zip';
const extractTo = 'attached_assets/site_completo';

if (!fs.existsSync(extractTo)) {
  fs.mkdirSync(extractTo, { recursive: true });
}

const zip = new AdmZip(zipPath);
const entries = zip.getEntries();

console.log(`Total files in ZIP: ${entries.length}`);

let extracted = 0;
let skipped = 0;

entries.forEach(entry => {
  // Skip node_modules and other large directories
  if (entry.entryName.includes('node_modules/') || 
      entry.entryName.includes('.git/') ||
      entry.entryName.includes('dist/')) {
    skipped++;
    return;
  }
  
  // Extract only relevant files
  if (!entry.isDirectory) {
    const targetPath = path.join(extractTo, entry.entryName);
    const targetDir = path.dirname(targetPath);
    
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    fs.writeFileSync(targetPath, entry.getData());
    extracted++;
  }
});

console.log(`Extracted: ${extracted} files`);
console.log(`Skipped: ${skipped} files (mostly node_modules)`);
