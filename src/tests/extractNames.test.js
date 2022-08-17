import { extractNames } from "../utils/extractNames";

describe("Extract names function", () => {
  test("it should return array of name attributes of input array", () => {
    const inputArray = [
      { id: 1, name: "pikachu" },
      { id: 2, name: "bulbasaur" },
      { id: 3, name: "charmander" },
    ];

    const outputArray = ["pikachu", "bulbasaur", "charmander"];

    expect(extractNames(inputArray)).toEqual(outputArray);
  });
});
