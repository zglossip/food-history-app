import { vi, describe, it, expect, Mock } from "vitest";

vi.mock("@/services/apiService");
vi.mock("vue-router");

import { fetchRecipes } from "@/services/apiService";
import { useRoute } from "vue-router";
import {
  useBrowseViewService,
  BrowseViewService,
} from "@/views/browseView/browseViewService";
import { Recipe } from "@/types/Recipe";
import { generateRecipe } from "@tests/data/defaults";

interface Givens {
  fetchRecipes: () => Promise<Recipe[]>;
  useRoute: () => object;
}

interface Setup {
  service: BrowseViewService;
  givens: Givens;
}

const setup = (givens: Partial<Givens> = {}): Setup => {
  const verifiedGivens: Givens = {
    ...{
      fetchRecipes: vi.fn().mockResolvedValue([]),
      useRoute: vi.fn().mockReturnValue({ query: {} }),
    },
    ...givens,
  };

  (fetchRecipes as Mock).mockImplementation(verifiedGivens.fetchRecipes);
  (useRoute as Mock).mockImplementation(verifiedGivens.useRoute);

  const service = useBrowseViewService();

  return { service, givens: verifiedGivens };
};

describe("browseViewService", () => {
  it("loads recipes on load", async () => {
    const testRecipe = generateRecipe();

    const { service } = setup({
      fetchRecipes: vi.fn().mockResolvedValue([testRecipe]),
    });

    await vi.waitFor(() => expect(service.isLoading.value).to.be.false);

    expect(service.recipes.value).to.deep.equal([testRecipe]);
  });

  it("loads recipes with params", async () => {
    const { service, givens } = setup({
      useRoute: vi.fn().mockReturnValue({
        query: {
          nameQuery: "Test Name",
          cuisineQuery: ["Cuisine 1", "Cuisine 2"],
          courseQuery: ["Course 1", "Course 2"],
          tagQuery: ["Tag 1", "Tag 2"],
        },
      }),
      fetchRecipes: vi.fn().mockResolvedValue([]),
    });

    await vi.waitFor(() => expect(service.isLoading.value).to.be.false);

    expect(service.recipes.value).to.deep.equal([]);
    expect(givens.fetchRecipes).toHaveBeenCalledWith(
      "Test Name",
      ["Cuisine 1", "Cuisine 2"],
      ["Course 1", "Course 2"],
      ["Tag 1", "Tag 2"],
    );
  });

  it("applies filters", async () => {
    const { service, givens } = setup({});

    await vi.waitFor(() => expect(service.isLoading.value).to.be.false);

    service.applyFilters({
      nameFilter: "Test Name",
      courseTypeFilters: ["Course 1", "Course 2"],
      cuisineTypeFilters: ["Cuisine 1", "Cuisine 2"],
      tagFilters: ["Tag 1", "Tag 2"],
    });

    await vi.waitFor(() => expect(service.isLoading.value).to.be.false);

    expect(givens.fetchRecipes).toHaveBeenCalledWith(
      "Test Name",
      ["Cuisine 1", "Cuisine 2"],
      ["Course 1", "Course 2"],
      ["Tag 1", "Tag 2"],
    );
  });
});
