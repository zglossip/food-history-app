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

const post = async <T, S>(url: string, d: S, body: T): Promise<S> => {
  return axios
    .post(url, body)
    .then((response) => response.data as S)
    .catch((error) => {
      //TODO Toast error
      console.log(error);
      return d;
    });
};

const put = async <T, S>(url: string, d: S, body: T): Promise<S> => {
  return axios
    .put(url, body)
    .then((response) => response.data as S)
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

export const saveRecipe = async (recipe: Recipe): Promise<null> =>
  put<Recipe, null>(`${BACKEND_BASE}/recipe/${recipe.id}`, null, recipe);

export const createRecipe = async (recipe: Recipe): Promise<Recipe | null> =>
  post<Recipe, Recipe | null>(`${BACKEND_BASE}/recipe`, null, recipe);

export const fetchIngredients = async (id: number): Promise<IngredientList> =>
  get<IngredientList>(`${BACKEND_BASE}/recipe/${id}/ingredients`, {
    recipeId: -1,
    ingredients: [{ name: "ERROR", quantity: -1 }],
  });

export const saveIngredients = async (
  ingredientList: IngredientList,
): Promise<null> =>
  put<IngredientList, null>(
    `${BACKEND_BASE}/recipe/${ingredientList.recipeId}/ingredients`,
    null,
    ingredientList,
  );

export const fetchInstructions = async (id: number): Promise<InstructionList> =>
  get<InstructionList>(`${BACKEND_BASE}/recipe/${id}/instructions`, {
    recipeId: -1,
    instructions: ["ERROR"],
  });

export const saveInstructions = async (
  instructionList: InstructionList,
): Promise<null> =>
  put<InstructionList, null>(
    `${BACKEND_BASE}/recipe/${instructionList.recipeId}/instructions`,
    null,
    instructionList,
  );
