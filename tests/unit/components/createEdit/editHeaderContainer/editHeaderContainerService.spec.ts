import { describe, it, expect, vi, Mock } from "vitest";

vi.mock("@/services/apiService");

import {
  useEditHeaderContainerService,
  EditHeaderContainerService,
} from "@/components/createEdit/editHeaderContainer/editHeaderContainerService";
import { fetchRecipe } from "@/services/apiService";
import { generateRecipe } from "@tests/data/defaults";
import { ERROR_RECIPE, LOADING_RECIPE } from "@/services/constants";

const setup = (response: object | null) => {
  (fetchRecipe as Mock).mockResolvedValue(response);
  const service: EditHeaderContainerService = useEditHeaderContainerService(1);
  return service;
};

describe("editHeaderContainerService", () => {
  it("initializes with the loading recipe placeholder", () => {
    const service = setup(generateRecipe());

    expect(service.recipe.value).toEqual(LOADING_RECIPE);
  });

  it("loads the requested recipe", async () => {
    const recipe = generateRecipe({ name: "Loaded Recipe" });
    const service = setup(recipe);

    await vi.waitFor(() =>
      expect(service.recipe.value.name).toBe("Loaded Recipe"),
    );
  });

  it("falls back to error recipe when request fails", async () => {
    const service = setup(null);

    await vi.waitFor(() => expect(service.recipe.value).toEqual(ERROR_RECIPE));
  });
});
