import * as lib from "./index";

import { ExampleClass } from "./ExampleClass";

describe("Modules are exported", function () {
  it("ExampleClass is exported", function () {
    expect(lib.ExampleClass).toEqual(ExampleClass);
    expect(lib.ExampleClass).not.toBeNull();
    expect(lib.ExampleClass).not.toBeUndefined();
  });
});
