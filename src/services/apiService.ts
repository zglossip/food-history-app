import { Recipe } from "@/types/Recipe";
import axios from "axios";
import { BACKEND_BASE } from "@/services/constants";
import { IngredientList } from "@/types/IngredientList";
import { InstructionList } from "@/types/InstructionList";

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

export const fetchRecipe = async (id: number): Promise<Recipe | null> =>
  get<Recipe | null>(`${BACKEND_BASE}/recipe/${id}`, null);

export const fetchIngredients = async (id: number): Promise<IngredientList> =>
  get<IngredientList>(`${BACKEND_BASE}/recipe/${id}/ingredients`, {recipeId: -1, ingredients: [{name: "ERROR", quantity: -1}]});

export const fetchInstructions = async (id: number): Promise<InstructionList> =>
  get<InstructionList>(`${BACKEND_BASE}/recipe/${id}/instructions`, {recipeId: -1, instructions:  ["ERROR"]});
