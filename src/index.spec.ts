import * as lib from "./index";
import { SayHello } from "./SayHello";

describe("Modules are exported", function () {
  it("SayHello is exported", function () {
    expect(lib.SayHello).toEqual(SayHello);
    expect(lib.SayHello).not.toBeNull();
    expect(lib.SayHello).not.toBeUndefined();
  });
});
