import { describe, it, expect, vi, Mock } from "vitest";

vi.mock("@/services/apiService");

import {
  InstructionCardService,
  useInstructionCardService,
  formatInstruction,
} from "@/components/common/instructionCard/instructionCardService";
import { fetchInstructions } from "@/services/apiService";

interface Givens {
  instructionUrl: string;
  editEmit: () => void;
  fetchInstructions: () => Promise<string[]>;
}

const setup = (givens: Partial<Givens> = {}): InstructionCardService => {
  const verifiedGivens: Givens = {
    ...{
      instructionUrl: "www.testurl.com",
      editEmit: () => {},
      fetchInstructions: vi.fn().mockResolvedValue([]),
    },
    ...givens,
  };

  (fetchInstructions as Mock).mockImplementation(
    verifiedGivens.fetchInstructions,
  );

  return useInstructionCardService(
    verifiedGivens.instructionUrl,
    verifiedGivens.editEmit,
  );
};

describe("instructionCardService", () => {
  it("loads ingredients on load", async () => {
    const testSteps = ["step 1", "step 2"];
    const service = setup({
      fetchInstructions: vi.fn().mockResolvedValue(testSteps),
    });

    await vi.waitFor(() => expect(service.isLoading.value).to.be.false);

    expect(service.instructions.value).to.deep.equal(testSteps);
  });

  it("formats instruction", () => {
    expect(formatInstruction(100, "instruction")).to.equal("100: instruction");
  });
});
