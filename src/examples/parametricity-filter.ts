// Library

type Simple<op, key, value> = [op, key, value];
type Compound<combinator, op, key, value> = { combinator: combinator, filters: Filter<combinator, op, key, value>[] }
type Filter<combinator, op, key, value> = Simple<op, key, value> | Compound<combinator, op, key, value>

function combine<c, op, k, v>(c: c, a: Filter<c, op, k, v>, b: Filter<c, op, k, v>): Filter<c, op, k, v> {
  return { combinator: c, filters: [a, b] }
}

// Stronger
// Exploits fact that `{ combinator: c, filters: [typeof a, typeof b]}` structurally type-checks as a Filter<c, op, k, v>
function combine_< c, o, k, v1, v2>(c: c, a: Filter<c, o, k, v1>, b: Filter<c, o, k, v2>): { combinator: c, filters: [typeof a, typeof b]} {
  return { combinator: c, filters: [a, b] } // Any of these are type errors: [], [a], [b, a], [b]
}

// User

type ComparisonOp = "==" | "!=";
type MembershipOp = "in" | "!in";
type Op = ComparisonOp | MembershipOp;
type CombinatorOp = "all" | "any";

var a : Filter<CombinatorOp, Op, string, string> = ['==', 'country', 'US']
var b : Filter<CombinatorOp, Op, string, string> = ['==', 'country', 'Argentina']
var c : Filter<CombinatorOp, Op, string, string> = ['!=', 'country', 'Iran']
var any : CombinatorOp = 'any'; // Necessary due to poor type inference...

var r1 : Filter<CombinatorOp, Op, string, string> = combine_(any, a, b);
var all : CombinatorOp = 'all'; // Necessary due to poor type inference...
var r2 : Filter<CombinatorOp, Op, string, string> = combine_(all, r1, c);

var r3 : Op = r2[0]; // Type-checks. Ugh.

console.log(JSON.stringify(r2));
