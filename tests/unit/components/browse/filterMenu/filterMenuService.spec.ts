import { describe, it, expect } from "vitest";
import {
  FilterMenuService,
  Filters,
  useFilterMenuService,
} from "@/components/browse/filterMenu/filterMenuService";
import { FilterType } from "@/types/FilterType";

interface Givens {
  startingName: string;
  startingCourseTypes: string[];
  startingCuisineTypes: string[];
  startingTags: string[];
}

interface Stubs {
  emitApply: (filters: Filters) => void;
}

interface Setup {
  service: FilterMenuService;
  givens: Givens;
  stubs: Stubs;
}

const setup = (
  givens: Partial<Givens> = {},
  stubs: Partial<Stubs> = {},
): Setup => {
  const verifiedGivens: Givens = {
    ...{
      startingName: "Test Name",
      startingCourseTypes: [],
      startingCuisineTypes: [],
      startingTags: [],
    },
    ...givens,
  };

  const verifiedStubs: Stubs = {
    ...{
      emitApply: () => {},
    },
    ...stubs,
  };

  const service: FilterMenuService = useFilterMenuService(
    verifiedGivens.startingName,
    verifiedGivens.startingCourseTypes,
    verifiedGivens.startingCuisineTypes,
    verifiedGivens.startingTags,
    verifiedStubs.emitApply,
  );

  return {
    service,
    givens: verifiedGivens,
    stubs: verifiedStubs,
  };
};

describe("filterMenuService", () => {
  it("Can add filter chip to course", () => {
    const { service } = setup();

    service.setFilterText("New Value");
    service.setCurrentFilterType(FilterType.COURSE);

    service.addFilter();

    expect(service.courseTypeFilters.value).toEqual(["New Value"]);
  });

  it("Can add filter chip to cuisine", () => {
    const { service } = setup();

    service.setFilterText("New Value");
    service.setCurrentFilterType(FilterType.CUISINE);

    service.addFilter();

    expect(service.cuisineTypeFilters.value).toEqual(["New Value"]);
  });

  it("Can add filter chip to tag", () => {
    const { service } = setup();

    service.setFilterText("New Value");
    service.setCurrentFilterType(FilterType.TAG);

    service.addFilter();

    expect(service.tagFilters.value).toEqual(["New Value"]);
  });

  it("Can remove filter chip from cuisine", () => {
    const { service } = setup({
      startingCuisineTypes: ["test 1", "test 2"],
    });

    service.removeChip({ type: FilterType.CUISINE, value: "test 1" });

    expect(service.cuisineTypeFilters.value).toEqual(["test 2"]);
  });

  it("Can remove filter chip from course", () => {
    const { service } = setup({
      startingCourseTypes: ["test 1", "test 2"],
    });

    service.removeChip({ type: FilterType.COURSE, value: "test 1" });

    expect(service.courseTypeFilters.value).toEqual(["test 2"]);
  });

  it("Can remove filter chip from tag", () => {
    const { service } = setup({
      startingTags: ["test 1", "test 2"],
    });

    service.removeChip({ type: FilterType.TAG, value: "test 1" });

    expect(service.tagFilters.value).toEqual(["test 2"]);
  });
});
