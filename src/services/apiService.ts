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
  recipeId: number
): Promise<Ingredient[]> => {
  return get<Ingredient[], Ingredient[]>("", []);
};
export function mockImplementation(arg0: () => void) {
  throw new Error("Function not implemented.");
}
