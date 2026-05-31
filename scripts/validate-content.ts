import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SpecSchema, QuestionBankSchema } from '../lib/content/schema';

const here = import.meta.dirname ?? dirname(fileURLToPath(import.meta.url));
const root = join(here, '..', 'content');

function check(file: string, schema: { parse: (x: unknown) => unknown }) {
  const data = JSON.parse(readFileSync(join(root, file), 'utf-8'));
  try {
    schema.parse(data);
    console.log(`OK: ${file}`);
  } catch (e) {
    console.error(`FAIL: ${file}`);
    console.error(e);
    process.exit(1);
  }
}

check('spec.json', SpecSchema);
check('questions.json', QuestionBankSchema);
console.log('All content valid.');
