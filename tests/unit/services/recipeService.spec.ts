import { RecipeService, useRecipeService } from "@/services/recipeService";
import { Recipe } from "@/types/Recipe";
import { generateRecipe } from "@tests/data/defaults";
import { describe, it, expect, Mock, vi } from "vitest";
import { toRef } from "vue";
import type { Router } from "vue-router";

interface Givens {
  recipe: Recipe;
}

interface Stubs {
  push: Mock;
}

interface Setup {
  service: RecipeService;
  givens: Givens;
  stubs: Stubs;
}

const setup = (
  givens: Partial<Givens> = {},
  stubs: Partial<Stubs> = {},
): Setup => {
  const verifiedGivens: Givens = { ...{ recipe: generateRecipe() }, ...givens };
  const verifiedStubs: Stubs = { ...{ push: vi.fn() }, ...stubs };
  const mockRouter = {
    push: verifiedStubs.push,
  } as unknown as Router;

  const service = useRecipeService(toRef(verifiedGivens.recipe), mockRouter);

  return { service, givens: verifiedGivens, stubs: verifiedStubs };
};

describe("useRecipeService.ts", () => {
  it("formats servings", () => {
    const recipe: Recipe = generateRecipe({
      servingAmount: 5,
      servingName: "tests",
    });
    const { service } = setup({ recipe });
    expect(service.formattedServingTag.value).toBe("5 tests");
  });

  it("formats one cuisine", () => {
    const recipe: Recipe = generateRecipe({ cuisineTypes: ["Test Cuisine"] });
    const { service } = setup({ recipe });
    expect(service.formattedCuisineTag.value).toBe("Cusine: Test Cuisine");
  });

  it("formats multipe cuisines", () => {
    const recipe: Recipe = generateRecipe({
      cuisineTypes: ["Test Cuisine 1", "Test Cuisine 2"],
    });
    const { service } = setup({ recipe });
    expect(service.formattedCuisineTag.value).toBe(
      "Cusines: Test Cuisine 1, Test Cuisine 2",
    );
  });

  it("formats no cuisines", () => {
    const { service } = setup();
    expect(service.formattedCuisineTag.value).toBeFalsy;
  });

  it("formats one course", () => {
    const recipe: Recipe = generateRecipe({ courseTypes: ["Test Course"] });
    const { service } = setup({ recipe });
    expect(service.formattedCourseTag.value).toBe("Course: Test Course");
  });

  it("formats multipe courses", () => {
    const recipe: Recipe = generateRecipe({
      courseTypes: ["Test Course 1", "Test Course 2"],
    });
    const { service } = setup({ recipe });
    expect(service.formattedCourseTag.value).toBe(
      "Courses: Test Course 1, Test Course 2",
    );
  });

  it("formats no courses", () => {
    const { service } = setup();
    expect(service.formattedCourseTag.value).toBeFalsy;
  });

  it("formats one tag", () => {
    const recipe: Recipe = generateRecipe({ tags: ["Test Tag"] });
    const { service } = setup({ recipe });
    expect(service.formattedTagTag.value).toBe("Tag: Test Tag");
  });

  it("formats multipe tags", () => {
    const recipe: Recipe = generateRecipe({
      tags: ["Test Tag 1", "Test Tag 2"],
    });
    const { service } = setup({ recipe });
    expect(service.formattedTagTag.value).toBe("Tags: Test Tag 1, Test Tag 2");
  });

  it("formats no tags", () => {
    const { service } = setup();
    expect(service.formattedTagTag.value).toBeFalsy;
  });

  it("navigates", async () => {
    const id: number = 100;
    const push = vi.fn();
    const { service } = setup({ recipe: generateRecipe({ id: id }) }, { push });

    service.navigate();

    console.log("Mock push calls:", push.mock.calls);

    expect(push).toHaveBeenCalledWith(`/recipe/${id}`);
    expect(push).toHaveBeenCalledTimes(1);
  });
});
