import { describe, it, expect, vi, Mock } from "vitest";

vi.mock("@/services/apiService");

import {
  InstructionCardService,
  useInstructionCardService,
  formatInstruction,
} from "@/components/viewRecipe/instructionCard/instructionCardService";
import { fetchInstructions } from "@/services/apiService";

interface SetupOptions {
  recipeId?: number;
  editEmit?: () => void;
  fetchInstructions?: () => Promise<{ instructions: string[] }>;
}

interface TestSetup {
  service: InstructionCardService;
  recipeId: number;
  editEmit: () => void;
  fetchInstructions: () => Promise<{ instructions: string[] }>;
}

const setup = (options: SetupOptions = {}): TestSetup => {
  const {
    recipeId = 100,
    editEmit = vi.fn(),
    fetchInstructions: fetchInstructionsMock = vi
      .fn()
      .mockResolvedValue({ instructions: [] }),
  } = options;

  (fetchInstructions as Mock).mockImplementation(fetchInstructionsMock);

  const service = useInstructionCardService(recipeId, editEmit);

  return { service, recipeId, editEmit, fetchInstructions: fetchInstructionsMock };
};

describe("instructionCardService", () => {
  it("loads instructions on load", async () => {
    const instructions = ["step 1", "step 2"];
    const { service } = setup({
      fetchInstructions: vi.fn().mockResolvedValue({ instructions }),
    });

    await vi.waitFor(() => expect(service.isLoading.value).toBe(false));

    expect(service.instructions.value).toEqual(instructions);
  });

  it("formats instruction", () => {
    expect(formatInstruction(100, "instruction")).toEqual("100: instruction");
  });
});
