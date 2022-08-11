import React, { useState, useEffect, useRef } from "react";
import { fetchDataAll } from "./api/fetchDataAll";
import { extractNames } from "./utils/extractNames";
import { countLetter } from "./utils/countLetter";
import { fetchCharacter } from "./api/fetchCharacter";

function App() {
  const resultRef = useRef();

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

    console.log("Location char count:", locationCharCounter);
    console.log("Episode char count:", episodeCharCounter);
    console.log("Character char count:", characterCharCounter);
    console.log("tardó", executionTime, "milisegundos");
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

      const res = await Promise.all(charactersData);

      const originsArray = res.map((character) => {
        return character.data.origin.name;
      });

      let episodeJSON = {
        name: episode.name,
        episode: episode.episode,
        locations: [...new Set(originsArray)],
      };

      results[index] = episodeJSON;
    });

    const endTime = performance.now();
    const executionTime = endTime - startTime;

    console.log("results", results);
    console.log("tardó", executionTime, "milisegundos");
  };

  return (
    <>
      <form>
        <button onClick={handleCharCount}>Execute Char Counter</button>
        <button onClick={handleEpisodeLocations}>
          Execute Episode Locations
        </button>
        <p ref={resultRef}></p>
      </form>
      <p></p>
    </>
  );
}

export default App;
