import { describe, it, expect, vi } from "vitest";
import {
  useFilterChipService,
  FilterChipService,
} from "@/components/common/filterChips/filterChipService";
import { FilterType } from "@/types/FilterType";
import { FilterChipData } from "@/types/FilterChipData";

interface TestSetup {
  service: FilterChipService;
  removeChipEmit: (data: FilterChipData) => void;
}

const setup = (
  removeChipEmit: (data: FilterChipData) => void = vi.fn(),
): TestSetup => {
  const service: FilterChipService = useFilterChipService(removeChipEmit);

  return { service, removeChipEmit };
};

describe("filterChipService", () => {
  it("emits chip data when closed", () => {
    const testSetup: TestSetup = setup();

    testSetup.service.onClose(FilterType.CUISINE, "Italian");

    expect(testSetup.removeChipEmit).toHaveBeenCalledWith({
      type: FilterType.CUISINE,
      value: "Italian",
    });
  });
});
