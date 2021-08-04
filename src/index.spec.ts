import * as lib from "./index";

import GameEngine from "./GameEngine";

describe("Modules are exported", function () {
  it("ExampleClass is exported", function () {
    expect(lib.GameEngine).toEqual(GameEngine);
    expect(lib.GameEngine).not.toBeNull();
    expect(lib.GameEngine).not.toBeUndefined();
  });
});
