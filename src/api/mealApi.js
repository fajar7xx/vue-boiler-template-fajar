import api from "./api";
import { requiredParam } from "@/helpers/requiredParam";

const URLS = {
  getMeals: "search.php",
};

export const searchMeals = (query, config = requiredParam("config")) => {
  return api.get(URLS.getMeals, {
    baseURL: "https://www.themealdb.com/api/json/v1/1/",
    ...config,
    params: {
      s: query,
    },
  });
};
