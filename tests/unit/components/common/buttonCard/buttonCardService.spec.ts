import { describe, it, expect, vi } from "vitest";
import {
  useButtonCardService,
  ButtonCardService,
} from "@/components/common/buttonCard/buttonCardService";

describe("buttonCardService", () => {
  it("emits click", () => {
    const emit = vi.fn();

    const service: ButtonCardService = useButtonCardService(emit);

    service.onClick();

    expect(emit).toHaveBeenCalledTimes(1);
  });
});
