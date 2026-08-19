const PYTHON_KEYWORDS = [
  "if",
  "else",
  "for",
  "while",
];

function toPythonLine(sourceLine) {
  let line = sourceLine.replace(/\r/g, "");
  const leading = line.match(/^\s*/)?.[0] || "";
  let body = line.trim();

  if (!body) return "";
  if (body === "}") return "";

  body = body
    .replace(/}\s*else\s*{/g, "else:")
    .replace(/^else\s*{/g, "else:")
    .replace(/^else\s+if\s*\((.*)\)\s*{/g, "elif $1:")
    .replace(/^if\s*\((.*)\)\s*{/g, "if $1:")
    .replace(/^if\s*\((.*)\)$/g, "if $1:")
    .replace(/^while\s*\((.*)\)\s*{/g, "while $1:")
    .replace(/^while\s*\((.*)\)$/g, "while $1:")
    .replace(/^for\s*\(int\s+(\w+)\s*=\s*0;\s*\1\s*<\s*n;\s*\1\+\+\)\s*{/g, "for $1 in range(n):")
    .replace(/^for\s*\(int\s+(\w+)\s*=\s*(.*);\s*\1\s*<\s*(.*);\s*\1\+\+\)\s*{/g, "for $1 in range($2, $3):")
    .replace(/^for\s*\(int\s+(\w+)\s*=\s*(.*);\s*\1\s*>=\s*(.*);\s*\1--\)\s*{/g, "for $1 in range($2, $3 - 1, -1):")
    .replace(/^for\s*\(const\s+(\w+)\s+of\s+(.*)\)\s*{/g, "for $1 in $2:")
    .replace(/^for\s*\((\w+)\s+of\s+(.*)\)\s*{/g, "for $1 in $2:")
    .replace(/^for\s*\((\w+)\s+in\s+(.*)\)\s*{/g, "for $1 in $2:")
    .replace(/\bnullptr\b|\bNULL\b/g, "None")
    .replace(/\btrue\b/g, "True")
    .replace(/\bfalse\b/g, "False")
    .replace(/\bint\s+/g, "")
    .replace(/\bfloat\s+/g, "")
    .replace(/\bdouble\s+/g, "")
    .replace(/\bbool\s+/g, "")
    .replace(/\bvoid\s+/g, "")
    .replace(/\bNode\*\s+/g, "")
    .replace(/\bconst\s+/g, "")
    .replace(/->/g, ".")
    .replace(/&&/g, " and ")
    .replace(/\|\|/g, " or ")
    .replace(/!==/g, "!=")
    .replace(/===/g, "==")
    .replace(/!/g, "not ")
    .replace(/\.length\b/g, "__LEN__")
    .replace(/\bMath\.floor\b/g, "int")
    .replace(/\bfloor\b/g, "int")
    .replace(/\bswap\(([^,]+),\s*([^\)]+)\)/g, "$1, $2 = $2, $1")
    .replace(/\bqueue\.push\(/g, "queue.append(")
    .replace(/\bqueue\.shift\(\)/g, "queue.pop(0)")
    .replace(/\bstack\.push\(/g, "stack.append(")
    .replace(/\bstack\.pop\(\)/g, "stack.pop()")
    .replace(/\bheap\.push\(/g, "heap.append(")
    .replace(/\bheap\.pop\(\)/g, "heap.pop()")
    .replace(/\bvisited\.add\(/g, "visited.add(")
    .replace(/\bvisited\.has\(/g, "visited.__contains__(")
    .replace(/;$/g, "")
    .replace(/\s*{\s*$/g, ":")
    .replace(/^return;$/g, "return")
    .replace(/^return\s+/g, "return ");

  body = body.replace(/__LEN__/g, "__LEN__");
  body = body.replace(/([A-Za-z_][\w\.]*)__LEN__/g, "len($1)");

  if (body.endsWith("}")) body = body.slice(0, -1).trim();

  const indent = leading.length;
  return " ".repeat(indent) + body;
}

function toJavaLine(sourceLine) {
  return sourceLine
    .replace(/\r/g, "")
    .replace(/\bnullptr\b|\bNULL\b/g, "null")
    .replace(/->/g, ".")
    .replace(/\btrue\b/g, "true")
    .replace(/\bfalse\b/g, "false")
    .replace(/\bcout\s*<<\s*([^;]+);?/g, "System.out.println($1);")
    .replace(/\bstd::/g, "")
    .replace(/\bvector<int>\b/g, "int[]")
    .replace(/\bvector<\s*Integer\s*>/g, "int[]");
}

export function getCodeForLanguage(code, language) {
  if (!Array.isArray(code)) return [];
  if (language === "C++") return code;
  if (language === "Java") return code.map(toJavaLine);
  if (language === "Python") return code.map(toPythonLine);
  return code;
}

export const LANGUAGES = ["C++", "Java", "Python"];
