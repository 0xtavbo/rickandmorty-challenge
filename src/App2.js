import React, { useState, useEffect } from "react";
import { BASE_URL } from "./constants/index";
import axios from "axios";

function App() {
  let locationResults = [];
  let currentPage = 1;
  let lastPage = null;

  const LOCATION_ENDPOINT = `${BASE_URL}/location?page=${currentPage}`;

  const handleExecute = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(LOCATION_ENDPOINT);

      locationResults.push(response.data.results);
      lastPage = response.data.info.pages;
    } catch (err) {
      console.log(err);
    }

    currentPage += 1;

    console.log("before while lastPage", lastPage);

    while (currentPage <= lastPage) {
      console.log("currentPage", currentPage, "- lastPage", lastPage);

      try {
        const response = await axios.get(
          `${BASE_URL}/location?page=${currentPage}`
        );

        locationResults.push(response.data.results);
      } catch (err) {
        console.log(err);
      }
      currentPage += 1;
    }

    let finalResult = locationResults.flat();

    let locationNames = finalResult.map((location) => {
      return location.name;
    });

    console.log("final currentPage", currentPage);
    console.log("finalResult", finalResult);
    console.log("names", locationNames);

    countLetter(locationNames, "l");
  };

  const countLetter = (array, letter) => {
    let letterCount = 0;

    array
      .join("")
      .split("")
      .forEach(function (char) {
        if (char.toLowerCase() === letter) letterCount++;
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
