import * as PB from './examples/parametricity';
import * as PF from './examples/parametricity-filter';
import * as SC from './examples/safe-construction-type-driven-style';

[
  PB.r0,
  PF.r4,
  PF.r5,
  SC.User.r0
].forEach(r => console.log(r));
