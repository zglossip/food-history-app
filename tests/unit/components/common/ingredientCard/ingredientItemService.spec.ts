import {
  IngredientItemService,
  useIngredientItemService,
} from "@/components/common/ingredientCard/ingredientItemService";
import { Ingredient } from "@/types/Ingredient";
import { generateIngredient } from "@tests/data/defaults";
import { Ref, ref } from "vue";

interface Givens {
  ingredient: Ref<Ingredient>;
}

interface Setup {
  service: IngredientItemService;
  givens: Givens;
}

const setup = (givens: Partial<Givens> = {}): Setup => {
  const verifiedGivens: Givens = {
    ...{ ingredient: ref(generateIngredient()) },
    ...givens,
  };

  const service: IngredientItemService = useIngredientItemService(
    verifiedGivens.ingredient
  );

  return { service, givens: verifiedGivens };
};

describe("useIngredientItemService.ts", () => {
  it("formats with uom", () => {
    const { service } = setup({
      ingredient: ref(generateIngredient({ quantity: 1, uom: "cup" })),
    });
    expect(service.formattedMeasurementText.value).toEqual("1 cup");
  });
  it("formats without uom", () => {
    const { service } = setup({
      ingredient: ref(generateIngredient({ quantity: 1, uom: undefined })),
    });
    expect(service.formattedMeasurementText.value).toEqual("1");
  });
});
