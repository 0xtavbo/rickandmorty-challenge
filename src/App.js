import React, { useState, useEffect } from "react";
import { BASE_URL } from "./constants/index";
import axios from "axios";

function App() {
  let locationResults = [];
  let episodeResults = [];
  let characterResults = [];

  const fetchData = async (resource) => {
    let currentPage = 1;
    let lastPage = null;
    let results = [];

    let END_POINT = `${BASE_URL}/${resource}?page=${currentPage}`;

    // get number of pages for specified resource (location, episode or character)
    // and push first page data into results array
    try {
      const response = await axios.get(END_POINT);

      lastPage = response.data.info.pages;
      results.push(response.data.results);
      currentPage += 1;
    } catch (err) {
      console.log(err);
    }

    while (currentPage <= lastPage) {
      END_POINT = `${BASE_URL}/${resource}?page=${currentPage}`;

      try {
        const response = await axios.get(END_POINT);

        results.push(response.data.results);
        currentPage += 1;
      } catch (err) {
        console.log(err);
      }
    }

    // return flat array for better manipulation
    return results.flat();
  };

  const handleExecute = async (e) => {
    e.preventDefault();

    let locationData = await fetchData("location");
    let locationNames = extractNames(locationData);
    let locationCharCounter = countLetter(locationNames, "l");
    console.log(
      "Location - L (case insensitive) char count:",
      locationCharCounter
    );

    let episodeData = await fetchData("episode");
    let episodeNames = extractNames(episodeData);
    let episodeCharCounter = countLetter(episodeNames, "e");
    console.log(
      "Episode - E (case insensitive) char count:",
      episodeCharCounter
    );

    let characterData = await fetchData("character");
    let characterNames = extractNames(characterData);
    let characterCharCounter = countLetter(characterNames, "c");
    console.log(
      "Character - C (case insensitive) char count:",
      locationCharCounter
    );
  };

  const extractNames = (array) => {
    return array.map((item) => {
      return item.name;
    });
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
        <button onClick={handleExecute}>Execute Location CharCounter</button>
        <button onClick={handleConsoleLog}>Console Log</button>
      </form>
      <p></p>
    </>
  );
}

export default App;
