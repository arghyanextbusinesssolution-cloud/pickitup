import { readFileSync, writeFileSync } from 'fs';
import { globSync } from 'glob';

// Find all TS/TSX files
const files = globSync('{app,components,services,lib,scripts}/**/*.{ts,tsx,js}', { ignore: 'node_modules/**' });

let totalReplacements = 0;
let filesModified = 0;

for (const file of files) {
  let content = readFileSync(file, 'utf8');

  // We want to replace exact paths to the shipper dashboard
  // Matches: '/dashboard', '/dashboard/shipments', etc. 
  // It should NOT match: '/admin/dashboard', '/carrier/dashboard'
  
  // Quick hack using positive lookbehind/lookahead or simply looking for the string with quotes/backticks
  // 1. Double quotes or single quotes or backticks followed by /dashboard
  // 2. Or href="/dashboard"
  // For safety, let's just use string replace logic on specific known occurrences that we found via grep
  
  let modified = false;
  
  const matches = content.match(/['"`]\/dashboard\/?(.*?)['"`]/g);
  
  if (matches) {
     const newContent = content.replace(/(['"`])\/dashboard(\/|['"`]|(?=\?))/g, '$1/shipper/dashboard$2');
     if (content !== newContent) {
         content = newContent;
         modified = true;
     }
  }

  if (modified) {
    writeFileSync(file, content);
    filesModified++;
    totalReplacements++;
  }
}

console.log(`Replaced ${totalReplacements} dashboard occurrences in ${filesModified} files.`);
