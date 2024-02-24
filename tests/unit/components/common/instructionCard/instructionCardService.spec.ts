import { describe, it, expect, vi, Mock } from "vitest";

vi.mock("@/services/apiService");

import {
  InstructionCardService,
  useInstructionCardService,
  formatInstruction,
} from "@/components/viewRecipe/instructionCard/instructionCardService";
import { fetchInstructions } from "@/services/apiService";

interface Givens {
  recipeId: number;
  editEmit: () => void;
  fetchInstructions: () => Promise<string[]>;
}

const setup = (givens: Partial<Givens> = {}): InstructionCardService => {
  const verifiedGivens: Givens = {
    ...{
      recipeId: 100,
      editEmit: () => {},
      fetchInstructions: vi.fn().mockResolvedValue({ instructions: [] }),
    },
    ...givens,
  };

  (fetchInstructions as Mock).mockImplementation(
    verifiedGivens.fetchInstructions,
  );

  return useInstructionCardService(
    verifiedGivens.recipeId,
    verifiedGivens.editEmit,
  );
};

describe("instructionCardService", () => {
  it("loads instructions on load", async () => {
    const instructions = ["step 1", "step 2"];
    const service = setup({
      fetchInstructions: vi.fn().mockResolvedValue({ instructions }),
    });

    await vi.waitFor(() => expect(service.isLoading.value).to.be.false);

    expect(service.instructions.value).to.deep.equal(instructions);
  });

  it("formats instruction", () => {
    expect(formatInstruction(100, "instruction")).to.equal("100: instruction");
  });
});
