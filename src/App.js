import React, { useState, useEffect } from "react";
import { fetchData } from "./utils/fetchData";
import { extractNames } from "./utils/extractNames";

function App() {
  const handleCharCount = async (e) => {
    e.preventDefault();

    const startTime = performance.now();

    let locationData = await fetchData("location");
    let locationNames = extractNames(locationData);
    let locationCharCounter = countLetter(locationNames, "l");
    let episodeData = await fetchData("episode");
    let episodeNames = extractNames(episodeData);
    let episodeCharCounter = countLetter(episodeNames, "e");
    let characterData = await fetchData("character");
    let characterNames = extractNames(characterData);
    let characterCharCounter = countLetter(characterNames, "c");
    const endTime = performance.now();

    const executionTime = endTime - startTime;

    console.log("Location char count:", locationCharCounter);
    console.log("Episode char count:", episodeCharCounter);
    console.log("Character char count:", characterCharCounter);
    console.log("tardó", executionTime, "milisegundos");
  };

  const countLetter = (array, letter) => {
    let letterCount = 0;

    array
      .join("")
      .split("")
      .forEach(function (character) {
        if (character.toLowerCase() === letter) letterCount++;
      });

    return letterCount;
  };

  const handleConsoleLog = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form>
        <button onClick={handleCharCount}>Execute CharCounter</button>
        <button onClick={handleConsoleLog}>Console Log</button>
      </form>
      <p></p>
    </>
  );
}

export default App;
