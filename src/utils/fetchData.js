import { BASE_URL } from "../constants/index";
import axios from "axios";

export const fetchData = async (resource) => {
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
