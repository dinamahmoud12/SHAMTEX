const fs = require('fs');
const parser = require('@babel/parser');
const code = fs.readFileSync('app/components/Products.tsx', 'utf8');
try {
  parser.parse(code, { sourceType: 'module', plugins: ['typescript', 'jsx'] });
  console.log('parsed successfully');
} catch (err) {
  console.error(err.message);
  if (err.loc) {
    const lines = code.split(/\r?\n/);
    console.error('loc', err.loc, lines[err.loc.line - 1]);
  }
}
