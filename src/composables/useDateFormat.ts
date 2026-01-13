import { computed, type Ref } from "vue";
import { Recipe } from "@/types/Recipe";

const formatDate = (value: Date): string => {
  const month = `${value.getMonth() + 1}`.padStart(2, "0");
  const day = `${value.getDate()}`.padStart(2, "0");
  const year = value.getFullYear();
  return `${month}/${day}/${year}`;
};

export const useRecipeUploadedDate = (
  recipe: Ref<Recipe | null | undefined>,
) =>
  computed(() => {
    const uploaded = recipe.value?.uploaded ?? null;
    return uploaded ? formatDate(uploaded) : "";
  });
