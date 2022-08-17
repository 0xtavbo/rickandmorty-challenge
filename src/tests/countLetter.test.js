import { countLetter } from "../utils/countLetter";

describe("Count letter function", () => {
  test("it should count specific letter in array", () => {
    const inputArray = ["Hola", "chipax!"];

    expect(countLetter(inputArray, "h")).toEqual(2);
  });
});
