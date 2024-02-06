import { fetchInstructions } from "@/services/apiService";
import { Ref, ref } from "vue";

export const injectionKey = Symbol();

export interface InstructionCardService {
  instructions: Ref<string[]>;
  isLoading: Ref<boolean>;
  onClick: () => void;
}

export const useInstructionCardService = (
  instructionUrl: string,
  editEmit: () => void,
): InstructionCardService => {
  const instructions: Ref<string[]> = ref([]);
  const isLoading: Ref<boolean> = ref(true);
  const onClick = () => editEmit();

  //TODO Write test
  fetchInstructions(instructionUrl)
    .then(
      (instructionResponse: string[]) =>
        (instructions.value = instructionResponse),
    )
    .finally(() => (isLoading.value = false));

  return { instructions, isLoading, onClick };
};

export const formatInstruction = (
  position: number,
  instruction: string,
): string => `${position}: ${instruction}`;
