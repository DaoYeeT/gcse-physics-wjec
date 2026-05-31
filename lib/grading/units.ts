const SUPERSCRIPT_DIGITS: Record<string, string> = {
  '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4',
  '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9',
  '⁻': '-', '⁺': '+',
};

const SUPERSCRIPT_RE = /[⁰¹²³⁴-⁹⁻⁺]/g;

const SYMBOL_MAP: Record<string, string> = {
  'Ω': 'ohm', 'ohms': 'ohm',
};

export function normalizeUnit(raw: string): string {
  let s = raw.trim();
  if (!s) return '';
  s = s.replace(SUPERSCRIPT_RE, (c) => SUPERSCRIPT_DIGITS[c] ?? c);
  s = s.replace(/\s*\/\s*([a-zA-Z]+)(\d+)?/g, (_m, base, exp) => ` ${base}^-${exp ?? '1'}`);
  s = s.replace(/([a-zA-Z])(-?\d+)/g, '$1^$2');
  s = s.replace(/^([a-zA-Z])([a-zA-Z])(?=\^|$)/, '$1 $2');
  s = s.replace(/\s+/g, ' ').trim();
  for (const [from, to] of Object.entries(SYMBOL_MAP)) s = s.split(from).join(to);
  return s;
}

export function unitsEqual(a: string, b: string): boolean {
  return normalizeUnit(a) === normalizeUnit(b);
}
