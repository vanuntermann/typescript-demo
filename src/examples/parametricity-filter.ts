// Library

type Simple<op, key, value> = [op, key, value];
type Compound<combinator, op, key, value> = { combinator: combinator, filters: Filter<combinator, op, key, value>[] }
type Filter<combinator, op, key, value> = Simple<op, key, value> | Compound<combinator, op, key, value>

function combine<c, op, k, v>(c: c, a: Filter<c, op, k, v>, b: Filter<c, op, k, v>): Filter<c, op, k, v> {
  return { combinator: c, filters: [a, b] }
}

// User

type ComparisonOp = "==" | "!=";
type MembershipOp = "in" | "!in";
type Op = ComparisonOp | MembershipOp;
type CombinatorOp = "all" | "any";

var x : Filter<CombinatorOp, Op, string, string> = ['==', 'country', 'US']
var y : Filter<CombinatorOp, Op, string, string> = ['==', 'country', 'Argentina']
var op : CombinatorOp = 'any'; // Necessary due to poor type inference...

var r : Filter<CombinatorOp, Op, string, string> = combine(op, x, y);

var z : Op = r[0]; // Type-checks. Ugh.

