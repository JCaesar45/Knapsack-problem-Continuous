# Aurum Revenue Atlas

Aurum Revenue Atlas is a luxury allocation console for operators who want one clear move: deploy limited budget where projected return is densest.

## Product structure

```text
aurum-revenue-atlas/
├── index.html
├── api/
│   ├── main.py
│   └── requirements.txt
├── src/
│   ├── types.ts
│   └── java/
│       └── ContinuousKnapsackOptimizer.java
└── README.md
```

## Frontend

Open `index.html` in a browser.

The page is self-contained. HTML, CSS, and JavaScript are combined in one file.

## Backend API

```bash
cd api
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

On Windows, activate the virtual environment with:

```bash
.venv\Scripts\activate
```

The API will be available at:

```text
http://127.0.0.1:8000
```

Optimization endpoint:

```text
POST /api/optimize
```

Example request:

```bash
curl -X POST http://127.0.0.1:8000/api/optimize \
  -H "Content-Type: application/json" \
  -d '{"items":[{"name":"Direct Atelier","weight":3,"value":95},{"name":"Heritage Email","weight":3.6,"value":90}],"capacity":4}'
```

## TypeScript module

Use `src/types.ts` as a typed client or local optimizer.

```ts
import { optimizeLocal } from "./types";

const result = optimizeLocal(
  [
    { name: "Direct Atelier", weight: 3.0, value: 95.0 },
    { name: "Heritage Email", weight: 3.6, value: 90.0 }
  ],
  4.0
);

console.log(result.total_value);
```

## Java module

Compile and run the Java implementation:

```bash
javac src/java/ContinuousKnapsackOptimizer.java
java -cp src/java ContinuousKnapsackOptimizer
```

## Operating logic

The optimizer sorts offers by value divided by weight. It takes full positions while capacity remains. The final position may be taken fractionally. This matches continuous allocation problems where items can be divided without losing proportional value.


## Sources

Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2009). *Introduction to algorithms* (3rd ed.). MIT Press.

Ecma International. (n.d.). *ECMAScript*. Retrieved August 9, 2026, from https://tc39.es/ecma262/

Microsoft. (n.d.). *TypeScript*. Retrieved August 9, 2026, from https://www.typescriptlang.org/

Mozilla Developer Network. (n.d.). *CSS*. Retrieved August 9, 2026, from https://developer.mozilla.org/en-US/docs/Web/CSS

Mozilla Developer Network. (n.d.). *JavaScript*. Retrieved August 9, 2026, from https://developer.mozilla.org/en-US/docs/Web/JavaScript

Oracle. (n.d.). *Java SE documentation*. Retrieved August 9, 2026, from https://docs.oracle.com/en/java/

Ramírez, S. (n.d.). *FastAPI*. Retrieved August 9, 2026, from https://fastapi.tiangolo.com/

WHATWG. (n.d.). *HTML Living Standard*. Retrieved August 9, 2026, from https://html.spec.whatwg.org/
