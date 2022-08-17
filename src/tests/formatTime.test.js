import { formatTime } from "../utils/formatTime";

describe("Format time function", () => {
  test("it should format time (more than 1000ms)", () => {
    const inputTime = 1808;

    const outputTime = "1s 808.000000ms";

    expect(formatTime(inputTime)).toEqual(outputTime);
  });

  test("it should format time (less than 1000ms)", () => {
    const inputTime = 365;

    const outputTime = "0s 365.000000ms";

    expect(formatTime(inputTime)).toEqual(outputTime);
  });
});
