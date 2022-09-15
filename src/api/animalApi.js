import api from "./api";

const URLS = {
  fetchDogUrl: "cat",
  fetchKittyUrl: "/breeds/image/random Fet",
};

export const fetchDog = () => {
  return api.get(URLS.fetchDogUrl, {
    baseURL: "https://dog.ceo/api/",
  });
};

export const fetchKitty = () => {
  return api.get(URLS.fetchKittyUrl, {
    baseURL: "https://cataas.com/",
  });
};
