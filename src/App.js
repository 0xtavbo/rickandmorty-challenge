import React from "react";
import { fetchDataAll } from "./api/fetchDataAll";
import { fetchCharacter } from "./api/fetchCharacter";
import { extractNames } from "./utils/extractNames";
import { countLetter } from "./utils/countLetter";
import {
  createOutputCharCount,
  createOutputEpisodeLocation,
} from "./utils/generateOutput";

function App() {
  const outputArray = [];

  const handleCharCount = async (e) => {
    e.preventDefault();

    const startTime = performance.now();

    let locationData = await fetchDataAll("location");
    let locationNames = extractNames(locationData);
    let locationCharCounter = countLetter(locationNames, "l");

    let episodeData = await fetchDataAll("episode");
    let episodeNames = extractNames(episodeData);
    let episodeCharCounter = countLetter(episodeNames, "e");

    let characterData = await fetchDataAll("character");
    let characterNames = extractNames(characterData);
    let characterCharCounter = countLetter(characterNames, "c");

    const endTime = performance.now();
    const executionTime = endTime - startTime;

    const charCountOutput = createOutputCharCount(
      executionTime,
      locationCharCounter,
      episodeCharCounter,
      characterCharCounter
    );

    outputArray.push(charCountOutput);
  };

  const handleEpisodeLocations = async (e) => {
    e.preventDefault();

    let results = [];

    const startTime = performance.now();

    let episodeData = await fetchDataAll("episode");

    episodeData.forEach(async (episode, index) => {
      const charactersData = episode.characters.map((character) =>
        fetchCharacter(character)
      );
      const response = await Promise.all(charactersData);

      const originsArray = response.map((character) => {
        return character.data.origin.name;
      });

      let episodeResult = {
        name: episode.name,
        episode: episode.episode,
        locations: [...new Set(originsArray)],
      };

      results[index] = episodeResult;
    });

    const endTime = performance.now();
    const executionTime = endTime - startTime;

    const episodeLocationOutput = createOutputEpisodeLocation(
      executionTime,
      results
    );

    outputArray.push(episodeLocationOutput);
  };

  return (
    <>
      <form>
        <button onClick={handleCharCount}>Execute Char Counter</button>
        <button onClick={handleEpisodeLocations}>
          Execute Episode Locations
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            console.log(outputArray);
          }}
        >
          Show output
        </button>
      </form>
    </>
  );
}

export default App;
