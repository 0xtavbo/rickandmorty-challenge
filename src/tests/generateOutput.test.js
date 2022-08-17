import {
  createOutputCharCount,
  createOutputEpisodeLocation,
} from "../utils/generateOutput";

describe("Generate output function", () => {
  test("it should generate output object for char count", () => {
    const inputTime = 1808;
    const locationCount = 5;
    const episodeCount = 15;
    const characterCount = 1236;

    const outputObject = {
      exercise_name: "Char counter",
      time: "1s 808.000000ms",
      in_time: true,
      results: [
        {
          char: "l",
          count: 5,
          resource: "location",
        },
        {
          char: "e",
          count: 15,
          resource: "episode",
        },
        {
          char: "c",
          count: 1236,
          resource: "character",
        },
      ],
    };

    expect(
      createOutputCharCount(
        inputTime,
        locationCount,
        episodeCount,
        characterCount
      )
    ).toEqual(outputObject);
  });

  test("it should generate output object for episode locations", () => {
    const inputTime = 3555;
    const inputResults = [
      {
        name: "Episode 1",
        episode: "S01E01",
        locations: ["unkown"],
      },
      {
        name: "Episode 2",
        episode: "S01E02",
        locations: ["santiago"],
      },
      {
        name: "Episode 3",
        episode: "S01E03",
        locations: ["buenos aires"],
      },
    ];

    const outputObject = {
      exercise_name: "Episode locations",
      time: "3s 555.000000ms",
      in_time: true,
      results: [
        {
          name: "Episode 1",
          episode: "S01E01",
          locations: ["unkown"],
        },
        {
          name: "Episode 2",
          episode: "S01E02",
          locations: ["santiago"],
        },
        {
          name: "Episode 3",
          episode: "S01E03",
          locations: ["buenos aires"],
        },
      ],
    };

    expect(createOutputEpisodeLocation(inputTime, inputResults)).toEqual(
      outputObject
    );
  });
});
