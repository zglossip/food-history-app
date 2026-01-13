import { Recipe } from "@/types/Recipe";
import axios from "axios";
import { BACKEND_BASE } from "@/services/constants";
import { IngredientList } from "@/types/IngredientList";
import { InstructionList } from "@/types/InstructionList";
import { useToast } from "@/composables/useToast";

export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string };

const parseUploaded = (value: string | null): Date | null => {
  if (!value) {
    return null;
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const mapRecipe = (recipe: Recipe & { uploaded: string | null }): Recipe => ({
  ...recipe,
  uploaded: parseUploaded(recipe.uploaded),
});

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

  const result = await get<Array<Recipe & { uploaded: string | null }>>(url);
  if (!result.ok) {
    return result;
  }
  return { ok: true, data: result.data.map(mapRecipe) };
};

export const fetchRecipe = async (id: number): Promise<ApiResult<Recipe>> => {
  const result = await get<Recipe & { uploaded: string | null }>(
    `${BACKEND_BASE}/recipe/${id}`,
  );
  if (!result.ok) {
    return result;
  }
  return { ok: true, data: mapRecipe(result.data) };
};

export const saveRecipe = async (recipe: Recipe): Promise<ApiResult<null>> =>
  put<Recipe, null>(`${BACKEND_BASE}/recipe/${recipe.id}`, recipe);

export const createRecipe = async (
  recipe: Recipe,
): Promise<ApiResult<Recipe>> => {
  const result = await post<Recipe, Recipe & { uploaded: string | null }>(
    `${BACKEND_BASE}/recipe`,
    recipe,
  );
  if (!result.ok) {
    return result;
  }
  return { ok: true, data: mapRecipe(result.data) };
};

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
