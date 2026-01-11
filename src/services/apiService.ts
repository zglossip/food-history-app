import { Recipe } from "@/types/Recipe";
import axios from "axios";
import { BACKEND_BASE } from "@/services/constants";
import { IngredientList } from "@/types/IngredientList";
import { InstructionList } from "@/types/InstructionList";
import { useToast } from "@/composables/useToast";

export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string };

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (typeof error.response?.data === "string") {
      return error.response.data;
    }
    return error.message || "Request failed.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Request failed.";
};

const handleError = <T>(error: unknown): ApiResult<T> => {
  const { showToast } = useToast();
  const message = getErrorMessage(error);
  showToast(message);
  return { ok: false, error: message };
};

const get = async <T>(url: string): Promise<ApiResult<T>> => {
  try {
    const response = await axios.get(url);
    return { ok: true, data: response.data as T };
  } catch (error) {
    return handleError<T>(error);
  }
};

const post = async <T, S>(url: string, body: T): Promise<ApiResult<S>> => {
  try {
    const response = await axios.post(url, body);
    return { ok: true, data: response.data as S };
  } catch (error) {
    return handleError<S>(error);
  }
};

const put = async <T, S>(url: string, body: T): Promise<ApiResult<S>> => {
  try {
    const response = await axios.put(url, body);
    return { ok: true, data: response.data as S };
  } catch (error) {
    return handleError<S>(error);
  }
};

export const fetchRecipes = async (
  name: string,
  cuisines: string[],
  courses: string[],
  tags: string[],
): Promise<ApiResult<Recipe[]>> => {
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

  return get<Recipe[]>(url);
};

export const fetchRecipe = async (id: number): Promise<ApiResult<Recipe>> =>
  get<Recipe>(`${BACKEND_BASE}/recipe/${id}`);

export const saveRecipe = async (recipe: Recipe): Promise<ApiResult<null>> =>
  put<Recipe, null>(`${BACKEND_BASE}/recipe/${recipe.id}`, recipe);

export const createRecipe = async (
  recipe: Recipe,
): Promise<ApiResult<Recipe>> =>
  post<Recipe, Recipe>(`${BACKEND_BASE}/recipe`, recipe);

export const fetchIngredients = async (
  id: number,
): Promise<ApiResult<IngredientList>> =>
  get<IngredientList>(`${BACKEND_BASE}/recipe/${id}/ingredients`);

export const saveIngredients = async (
  ingredientList: IngredientList,
): Promise<ApiResult<null>> =>
  put<IngredientList, null>(
    `${BACKEND_BASE}/recipe/${ingredientList.recipeId}/ingredients`,
    ingredientList,
  );

export const fetchInstructions = async (
  id: number,
): Promise<ApiResult<InstructionList>> =>
  get<InstructionList>(`${BACKEND_BASE}/recipe/${id}/instructions`);

export const saveInstructions = async (
  instructionList: InstructionList,
): Promise<ApiResult<null>> =>
  put<InstructionList, null>(
    `${BACKEND_BASE}/recipe/${instructionList.recipeId}/instructions`,
    instructionList,
  );
