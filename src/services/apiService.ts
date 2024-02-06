import { Ingredient } from "@/types/Ingredient";
import { Recipe } from "@/types/Recipe";
import axios from "axios";
import { BACKEND_BASE } from "@/services/constants";

const get = async <T>(url: string, d: T): Promise<T> => {
  return axios
    .get(url)
    .then((response) => response.data as T)
    .catch((error) => {
      //TODO Toast error
      console.log(error);
      return d;
    });
};

export const fetchRecipes = async (
  name: string,
  cuisines: string[],
  courses: string[],
  tags: string[],
): Promise<Recipe[]> => {
  let url = BACKEND_BASE + "/recipe?";

  if (name) {
    url += `name=${name}&`;
  }

  if (courses.length) {
    courses.forEach((c: string) => (url += `course=${c}&`));
  }

  if (cuisines.length) {
    cuisines.forEach((c: string) => (url += `cuisine=${c}&`));
  }

  if (tags.length) {
    tags.forEach((t: string) => (url += `tag=${t}&`));
  }

  return get<Recipe[]>(url, []);
};

export const fetchIngredients = async (
  ingredientUrl: string,
): Promise<Ingredient[]> => get<Ingredient[]>(ingredientUrl, []);

export const fetchInstructions = async (
  instructionUrl: string,
): Promise<string[]> => get<string[]>(instructionUrl, []);
