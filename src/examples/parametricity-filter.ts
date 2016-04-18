module Parametricity {
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
    return { combinator: c, filters: [a, b] } // These would be type errors: [], [a], [b, a], [b]
  }

  function setValue<c, o, k, v1, v2>(v2: v2, a: Filter<c, o, k, v1>): Filter<c, o, k, v2> {
    if (a instanceof Array) {
      return [a[0], a[1], v2];
    } else {
      return { 
        combinator: a.combinator, 
        filters: a.filters.map(x => setValue(v2, x)) // Not mapping would be a type error
      };
    }
  }

  type Show<a> = (a: a) => string;

  function show<c, o, k, v>(showC: Show<c>, showO: Show<o>, showK: Show<k>, showV: Show<v>, a: Filter<c,o,k,v>) : string {
    if (a instanceof Array) {
      return showK(a[1]) + showO(a[0]) + showV(a[2]);
    } else {
      return showC(a.combinator) + '(' + a.filters.map(x => show(showC, showO, showK, showV, x)).join(',') + ')';
    }
  }

  // User

  type ComparisonOp = "==" | "!=";
  type MembershipOp = "in" | "!in";
  type Op = ComparisonOp | MembershipOp;
  type CombinatorOp = "all" | "any";
  var any : CombinatorOp = 'any'; // Necessary due to poor type inference...
  var all : CombinatorOp = 'all'; // Necessary due to poor type inference...

  type MyFilter = Filter<CombinatorOp, Op, string, string>

  var a : MyFilter = ['==', 'country', 'US']
  var b : MyFilter = ['==', 'country', 'Argentina']
  var c : MyFilter = ['!=', 'country', 'Iran']

  var r1 : MyFilter = combine_(any, a, b);
  var r2 : MyFilter = combine_(all, r1, c);
  var r3 : MyFilter = setValue('Germany', r2);

  // var bad1 : Op = r2[0] // Type error (with --noImplicitAny)

  export var r4 = JSON.stringify(r3);

  function id<a>(a: a) { return a } // id for all because we happen to be already using strings for everything
  export var r5 = show(id, id, id, id, r3);
}

export = Parametricity;
