import axios from "axios";

export const fetchCharacter = (url) => {
  return axios.get(url);
};
