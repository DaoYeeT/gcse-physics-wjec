const FUNCS: Record<string, (x: number) => number> = {
  sin: Math.sin, cos: Math.cos, tan: Math.tan,
  asin: Math.asin, acos: Math.acos, atan: Math.atan,
  sqrt: Math.sqrt, log: (x) => Math.log10(x), ln: Math.log, exp: Math.exp,
  abs: Math.abs,
};

const CONSTS: Record<string, number> = { pi: Math.PI, e: Math.E };

export function calc(input: string): number {
  let i = 0;
  const s = input.replace(/\s+/g, '');

  function peek(): string { return s[i]; }
  function consume(c: string) {
    if (s[i] !== c) throw new Error(`expected ${c} at ${i}, got ${s[i] ?? 'EOF'}`);
    i++;
  }

  function parseExpr(): number {
    let left = parseTerm();
    while (peek() === '+' || peek() === '-') {
      const op = s[i++];
      const right = parseTerm();
      left = op === '+' ? left + right : left - right;
    }
    return left;
  }
  function parseTerm(): number {
    let left = parseFactor();
    while (peek() === '*' || peek() === '/') {
      const op = s[i++];
      const right = parseFactor();
      left = op === '*' ? left * right : left / right;
    }
    return left;
  }
  function parseFactor(): number {
    let base = parseUnary();
    if (peek() === '^') {
      i++;
      const exp = parseFactor();
      base = Math.pow(base, exp);
    }
    return base;
  }
  function parseUnary(): number {
    if (peek() === '-') { i++; return -parseUnary(); }
    if (peek() === '+') { i++; return parseUnary(); }
    return parseAtom();
  }
  function parseAtom(): number {
    if (peek() === '(') { i++; const v = parseExpr(); consume(')'); return v; }
    if (/[a-z]/i.test(peek() ?? '')) {
      let name = '';
      while (/[a-z]/i.test(s[i] ?? '')) name += s[i++];
      if (peek() === '(') {
        i++; const arg = parseExpr(); consume(')');
        const fn = FUNCS[name.toLowerCase()];
        if (!fn) throw new Error(`unknown function ${name}`);
        return fn(arg);
      }
      const c = CONSTS[name.toLowerCase()];
      if (c === undefined) throw new Error(`unknown identifier ${name}`);
      return c;
    }
    let num = '';
    while (/[0-9.]/.test(s[i] ?? '')) num += s[i++];
    if (!num) throw new Error(`unexpected ${s[i] ?? 'EOF'} at ${i}`);
    return parseFloat(num);
  }

  const result = parseExpr();
  if (i !== s.length) throw new Error(`trailing input at ${i}: '${s.slice(i)}'`);
  return result;
}
