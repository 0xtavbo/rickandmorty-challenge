import { BASE_URL } from "../constants/index";
import axios from "axios";

export const fetchDataAll = async (resource) => {
  let currentPage = 1;
  let lastPage = 1;
  let results = [];

  while (currentPage <= lastPage) {
    let END_POINT = `${BASE_URL}/${resource}?page=${currentPage}`;

    try {
      const response = await axios.get(END_POINT);

      results.push(response.data.results);
      lastPage = response.data.info.pages;
      currentPage += 1;
    } catch (err) {
      console.log(err);
    }
  }

  // return flat array for better manipulation
  return results.flat();
};
