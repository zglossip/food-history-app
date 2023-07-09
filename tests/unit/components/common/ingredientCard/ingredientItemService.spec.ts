import { formatMeasurementText } from "@/components/common/ingredientCard/ingredientItemService";
import { Ingredient } from "@/types/Ingredient";
import { generateIngredient } from "@tests/data/defaults";
import { Ref, ref } from "vue";

describe("useIngredientItemService.ts", () => {
  it("formats with uom", () => {
    expect(
      formatMeasurementText(generateIngredient({ quantity: 1, uom: "cup" }))
    ).toEqual("1 cup");
  });
  it("formats without uom", () => {
    expect(
      formatMeasurementText(generateIngredient({ quantity: 1, uom: undefined }))
    ).toEqual("1");
  });
});
