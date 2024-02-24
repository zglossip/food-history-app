import {
  IngredientCardService,
  useIngredientCardService,
} from "@/components/viewRecipe/ingredientCard/ingredientCardService";
import { vi, expect, Mock, describe, it } from "vitest";
import { Ingredient } from "@/types/Ingredient";
import { fetchIngredients } from "@/services/apiService";
import { generateIngredient } from "@tests/data/defaults";

vi.mock("@/services/apiService");

interface Givens {
  recipeId: number;
}

interface Stubs {
  fetchIngredients: (recipeId: number) => Ingredient[];
}

interface Setup {
  service: IngredientCardService;
  givens: Givens;
  stubs: Stubs;
}

const setup = (
  givens: Partial<Givens> = {},
  stubs: Partial<Stubs> = {},
): Setup => {
  const verifiedGivens: Givens = {
    ...{ recipeId: 100 },
    ...givens,
  };
  const verifiedStubs: Stubs = {
    ...{
      fetchIngredients: vi
        .fn()
        .mockResolvedValue({ ingredients: [generateIngredient()] }),
    },
    ...stubs,
  };

  (fetchIngredients as Mock).mockImplementation(verifiedStubs.fetchIngredients);

  const service: IngredientCardService = useIngredientCardService(
    verifiedGivens.recipeId,
    vi.fn(),
  );

  return { service, givens: verifiedGivens, stubs: verifiedStubs };
};

describe("useIngredientCardService.ts", () => {
  it("loads ingredients", async () => {
    const { service } = setup();
    await vi.waitFor(() => expect(service.isLoading.value).toBe(false));
    expect(service.ingredients.value).toStrictEqual([generateIngredient()]);
  });
});
