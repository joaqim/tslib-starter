/** @jest-environment jsdom */
import { render } from "@testing-library/react";
import GameEngine from "./GameEngine";
import { useReducer } from "react";

const Sys1 = (entities: any, payload: any) => {
  console.log({ entities, payload });
};

test("GameEngine", () => {
  render(
    <GameEngine entities={{ box1: { x: 200, y: 200 } }} systems={[Sys1]} />
  );
});
