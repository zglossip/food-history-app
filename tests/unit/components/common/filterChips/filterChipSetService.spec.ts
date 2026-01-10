import { describe, it, expect, vi } from "vitest";
import {
  useFilterChipSetService,
  FilterChipSetService,
} from "@/components/common/filterChips/filterChipSetService";

interface TestSetup {
  service: FilterChipSetService;
  closeEmit: (value: string) => void;
}

const setup = (closeEmit: (value: string) => void = vi.fn()): TestSetup => {
  const service: FilterChipSetService = useFilterChipSetService(closeEmit);

  return {
    service,
    closeEmit,
  };
};

describe("filterChipSetService", () => {
  it("forwards close events to the emit", () => {
    const { service, closeEmit } = setup();

    service.onClose("Value");

    expect(closeEmit).toHaveBeenCalledWith("Value");
  });
});
