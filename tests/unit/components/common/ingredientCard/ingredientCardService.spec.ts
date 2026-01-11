import {
  IngredientCardService,
  useIngredientCardService,
} from "@/components/viewRecipe/ingredientCard/ingredientCardService";
import { vi, expect, Mock, describe, it } from "vitest";
import { fetchIngredients } from "@/services/apiService";
import { generateIngredient } from "@tests/data/defaults";
import { Ingredient } from "@/types/Ingredient";

vi.mock("@/services/apiService");

interface SetupOptions {
  recipeId?: number;
  fetchIngredients?: () => Promise<{ ingredients: Ingredient[] }>;
  closeEmit?: () => void;
}

interface TestSetup {
  service: IngredientCardService;
  recipeId: number;
  fetchIngredients: () => Promise<{ ingredients: Ingredient[] }>;
  closeEmit: () => void;
}

const setup = (options: SetupOptions = {}): TestSetup => {
  const {
    recipeId = 100,
    fetchIngredients: fetchIngredientsMock = vi
      .fn()
      .mockResolvedValue({ ingredients: [generateIngredient()] }),
    closeEmit = vi.fn(),
  } = options;

  (fetchIngredients as Mock).mockImplementation(fetchIngredientsMock);

  const service: IngredientCardService = useIngredientCardService(
    recipeId,
    closeEmit,
  );

  return {
    service,
    recipeId,
    fetchIngredients: fetchIngredientsMock,
    closeEmit,
  };
};

describe("useIngredientCardService.ts", () => {
  it("loads ingredients", async () => {
    const { service } = setup();
    await vi.waitFor(() => expect(service.isLoading.value).toBe(false));
    expect(service.ingredients.value).toStrictEqual([generateIngredient()]);
  });
});
