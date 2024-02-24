import { formatMeasurementText } from "@/services/util";
import { generateIngredient } from "@tests/data/defaults";
import { describe, it, expect } from "vitest";

describe("util.ts", () => {
  it("formats with uom", () => {
    expect(
      formatMeasurementText(generateIngredient({ quantity: 1, uom: "cup" })),
    ).toEqual("1 cup");
  });
  it("formats without uom", () => {
    expect(
      formatMeasurementText(
        generateIngredient({ quantity: 1, uom: undefined }),
      ),
    ).toEqual("1");
  });
});
