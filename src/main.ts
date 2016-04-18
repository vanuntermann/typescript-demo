import * as PB from './examples/parametricity';
import * as PF from './examples/parametricity-filter';
import * as SC from './examples/safe-construction-type-driven-style';

[
  PB.r0,
  PF.log,
  PF.pretty,
  PF.encoded,
  SC.User.r0
].forEach(r => console.log(r + "\n"));
