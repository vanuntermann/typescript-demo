module SafeConstruction {
  module Lib {
    class FormData<a> {
      // `state` is a hack for enabling almost-but-not-quite phantom types
      constructor(private data: string, private state: a) {}
      getData() { return this.data }
    }
    // `_` is part II of the hack for enabling almost-but-not-quite phantom types
    class Validated { constructor(private _: any) {} }
    class Unvalidated { constructor(private _: any) {} }

    export function formData(data: string): FormData<Unvalidated> {
      return new FormData(data, new Unvalidated('Initial form'));
    }

    export function validate(x: FormData<Unvalidated>): FormData<Validated> | Error {
      if (x.getData() == '') {
        return new Error('Empty string is not a valid code');
      } else {
        return new FormData(x.getData(), new Validated(true));
      }
    }

    export function process(x: FormData<Validated>): string {
      return 'Send money to ' + x.getData();
    }
  }

  export module User {
    let { formData, validate, process } = Lib;
    //let a = formData('');
    let a = formData('Alice');
    let av = validate(a);
    export let r0 : string;

    // We *have* to branch now
    // i.e. type system *statically* forces us to write a *runtime* check.
    if (av instanceof Error) {
      r0 = av.message;
    } else {
      r0 = process(av); // `process(a)` would be a type error: unvalidated form
                        // `process(av)` outside this `else` would also be a type error: non-forked `validated | error` union type
    }
  }
}

export = SafeConstruction;
