import { formatTime } from "./formatTime";

export const createOutputCharCount = (
  executionTime,
  locationCount,
  episodeCount,
  characterCount
) => {
  let charCountOutput = {
    exercise_name: "Char counter",
    time: formatTime(executionTime),
    in_time: true,
    results: [
      {
        char: "l",
        count: locationCount,
        resource: "location",
      },
      {
        char: "e",
        count: episodeCount,
        resource: "episode",
      },
      {
        char: "c",
        count: characterCount,
        resource: "character",
      },
    ],
  };

  return charCountOutput;
};

export const createOutputEpisodeLocation = (executionTime, results) => {
  let episodeLocationOutput = {
    exercise_name: "Episode locations",
    time: formatTime(executionTime),
    in_time: true,
    results: results,
  };

  return episodeLocationOutput;
};
