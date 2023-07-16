jest.mock("@/services/apiService");

import {
  IngredientCardService,
  useIngredientCardService,
} from "@/components/common/ingredientCard/ingredientCardService";

import { Ingredient } from "@/types/Ingredient";
import { fetchIngredients } from "@/services/apiService";
import { generateIngredient } from "@tests/data/defaults";
import { until } from "@vueuse/core";

interface Givens {
  ingredientUrl: string;
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
  stubs: Partial<Stubs> = {}
): Setup => {
  const verifiedGivens: Givens = {
    ...{ ingredientUrl: "www.test.com" },
    ...givens,
  };
  const verifiedStubs: Stubs = {
    ...{
      fetchIngredients: jest.fn().mockResolvedValue([generateIngredient()]),
    },
    ...stubs,
  };

  (fetchIngredients as jest.Mock).mockImplementation(
    verifiedStubs.fetchIngredients
  );

  const service: IngredientCardService = useIngredientCardService(
    verifiedGivens.ingredientUrl
  );

  return { service, givens: verifiedGivens, stubs: verifiedStubs };
};

describe("useIngredientCardService.ts", () => {
  it("loads ingredients", async () => {
    const { service } = setup();
    await until(service.isLoading).toBe(false);
    expect(service.ingredients.value).toStrictEqual([generateIngredient()]);
  });
});
