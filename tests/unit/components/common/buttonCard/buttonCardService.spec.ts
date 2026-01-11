import { describe, it, expect, vi } from "vitest";
import {
  useButtonCardService,
  ButtonCardService,
} from "@/components/common/buttonCard/buttonCardService";

interface TestSetup {
  service: ButtonCardService;
  emit: () => void;
}

const setup = (emit: () => void = vi.fn()): TestSetup => {
  const service: ButtonCardService = useButtonCardService(emit);

  return { service, emit };
};

describe("buttonCardService", () => {
  it("emits click", () => {
    const { service, emit } = setup();

    service.onClick();

    expect(emit).toHaveBeenCalledTimes(1);
  });
});
