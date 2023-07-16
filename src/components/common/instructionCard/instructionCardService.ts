import { fetchInstructions } from "@/services/apiService";
import { Ref, ref } from "vue";

export const injectionKey = Symbol();

export interface InstructionCardService {
  instructions: Ref<string[]>;
  isLoading: Ref<boolean>;
}

export const useInstructionCardService = (
  instructionUrl: string
): InstructionCardService => {
  const instructions: Ref<string[]> = ref([]);
  const isLoading: Ref<boolean> = ref(true);

  fetchInstructions(instructionUrl)
    .then(
      (instructionResponse: string[]) =>
        (instructions.value = instructionResponse)
    )
    .finally(() => (isLoading.value = false));

  return { instructions, isLoading };
};

export const formatInstruction = (position: number, instruction: string): string => `${position}: ${instruction}`