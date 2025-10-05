import { fetchRecipe } from "@/services/apiService";
import { Recipe } from "@/types/Recipe";
import { onIonViewWillEnter } from "@ionic/vue";
import { Ref, ref } from "vue";
import { useRouter } from "vue-router";

export const INJECTION_KEY = Symbol();

export interface ViewRecipeContainerService {
  isLoading: Ref<boolean>;
  recipe: Ref<Recipe | null>;
  onEditHeader: () => void;
  onEditIngredients: () => void;
  onEditInstructions: () => void;
  refreshData: () => void;
}

export const useViewRecipeContainerService = (
  id: number,
): ViewRecipeContainerService => {
  const isLoading: Ref<boolean> = ref(false);
  const recipe: Ref<Recipe | null> = ref(null);

  const router = useRouter();

  const refreshData = () => fetchRecipe(id).then((r) => (recipe.value = r))

  const onEditHeader = () => {
    router.push(`/recipe/edit/${id}`);
  };

  const onEditIngredients = () => {
    router.push(`/recipe/edit/${id}/ingredients`);
  };

  const onEditInstructions = () => {
    router.push(`/recipe/edit/${id}/instructions`);
  };

  return {
    isLoading,
    recipe,
    onEditHeader,
    onEditIngredients,
    onEditInstructions,
    refreshData,
  };
};
