import { Ingredient } from "@/types/Ingredient";
import axios from "axios";

const get = async <T, K>(url: string, d: K): Promise<T | K> => {
  return axios
    .get(url)
    .then((response) => response.data as T)
    .catch((error) => {
      //TODO Toast error
      console.log(error);
      return d;
    });
};

export const fetchIngredients = async (
  ingredientUrl: string
): Promise<Ingredient[]> => get<Ingredient[], Ingredient[]>(ingredientUrl, []);

export const fetchInstructions = async (
  instructionUrl: string
): Promise<string[]> => get<string[], string[]>(instructionUrl, []);
