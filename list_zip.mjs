import AdmZip from 'adm-zip';

const zipPath = 'attached_assets/site_1759421832518.zip';
const zip = new AdmZip(zipPath);
const entries = zip.getEntries();

console.log(`Total files in ZIP: ${entries.length}\n`);

// Group by type
const byType = {};
entries.forEach(entry => {
  const ext = entry.entryName.split('.').pop();
  byType[ext] = (byType[ext] || 0) + 1;
});

console.log('File types:');
Object.entries(byType).sort((a,b) => b[1] - a[1]).forEach(([ext, count]) => {
  console.log(`  .${ext}: ${count} files`);
});

console.log('\nFirst 50 files:');
entries.slice(0, 50).forEach((entry, i) => {
  console.log(`${i+1}. ${entry.entryName}`);
});
