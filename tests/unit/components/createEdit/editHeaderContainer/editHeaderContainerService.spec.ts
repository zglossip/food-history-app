import { describe, it, expect, vi, Mock } from "vitest";

vi.mock("@/services/apiService");

import {
  useEditHeaderContainerService,
  EditHeaderContainerService,
} from "@/components/createEdit/editHeaderContainer/editHeaderContainerService";
import { fetchRecipe } from "@/services/apiService";
import { generateRecipe } from "@tests/data/defaults";
import { ERROR_RECIPE, LOADING_RECIPE } from "@/services/constants";

type RecipeResponse = ReturnType<typeof generateRecipe> | null;

interface SetupOptions {
  fetchRecipe?: () => Promise<RecipeResponse>;
  id?: number;
}

interface TestSetup {
  service: EditHeaderContainerService;
  fetchRecipe: () => Promise<RecipeResponse>;
  id: number;
}

const setup = (options: SetupOptions = {}): TestSetup => {
  const {
    fetchRecipe: fetchRecipeMock = vi.fn().mockResolvedValue(generateRecipe()),
    id = 1,
  } = options;

  (fetchRecipe as Mock).mockImplementation(fetchRecipeMock);
  const service: EditHeaderContainerService = useEditHeaderContainerService(id);
  return { service, fetchRecipe: fetchRecipeMock, id };
};

describe("editHeaderContainerService", () => {
  it("initializes with the loading recipe placeholder", () => {
    const { service } = setup();

    expect(service.recipe.value).toEqual(LOADING_RECIPE);
  });

  it("loads the requested recipe", async () => {
    const { service } = setup({
      fetchRecipe: vi
        .fn()
        .mockResolvedValue(generateRecipe({ name: "Loaded Recipe" })),
    });

    await vi.waitFor(() =>
      expect(service.recipe.value.name).toBe("Loaded Recipe"),
    );
  });

  it("falls back to error recipe when request fails", async () => {
    const { service } = setup({ fetchRecipe: vi.fn().mockResolvedValue(null) });

    await vi.waitFor(() => expect(service.recipe.value).toEqual(ERROR_RECIPE));
  });
});
