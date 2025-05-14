const fs = require('fs');
const path = require('path');
const parse = require('csv-parse/sync').parse;

const csvPath = path.join(__dirname, 'land_datav2.csv');
const tsPath = path.join(__dirname, 'landData.ts');

const csv = fs.readFileSync(csvPath, 'utf-8');
const records = parse(csv, { columns: true, skip_empty_lines: true });

const items = records.map((row, idx) => {
  let exceptionType = row['小規模宅地等の特例']?.trim() || '';
  let note = undefined;
  if (exceptionType.includes('*')) {
    const [main, ...rest] = exceptionType.split('*');
    exceptionType = main.trim();
    note = rest.join('*').replace(/^[\s\*]+/, '').replace(/0・0/, '0㎡・0%').trim();
  }
  return {
    id: idx + 1,
    landLeaseType: row['土地貸借']?.trim() || '',
    buildingOwner: row['建物所有者']?.trim() || '',
    buildingUser: row['建物使用者']?.trim() || '',
    buildingLeaseType: row['建物貸借']?.trim() || '',
    usageType: row['使用区分']?.trim() || '',
    exceptionType,
    limitArea: row['限度面積']?.trim() || '',
    reductionRate: row['減額割合']?.trim() || '',
    ...(note ? { note } : {})
  };
});

const header = `import { LandDataItem } from './interfaces';\n\nexport const landData: LandDataItem[] = [\n`;
const body = items.map(item => {
  const fields = Object.entries(item).map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join(', ');
  return `  { ${fields} },`;
}).join('\n');
const footer = '\n];\n';

fs.writeFileSync(tsPath, header + body + footer, 'utf-8');
console.log('landData.ts updated!'); 