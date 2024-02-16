import { fetchInstructions } from "@/services/apiService";
import { InstructionList } from "@/types/InstructionList";
import { Ref, ref } from "vue";

export const injectionKey = Symbol();

export interface InstructionCardService {
  instructions: Ref<string[]>;
  isLoading: Ref<boolean>;
  onClick: () => void;
}

export const useInstructionCardService = (
  id: number,
  editEmit: () => void,
): InstructionCardService => {
  const instructions: Ref<string[]> = ref([]);
  const isLoading: Ref<boolean> = ref(true);
  const onClick = () => editEmit();

  fetchInstructions(id)
    .then(
      (instructionResponse: InstructionList) =>
        (instructions.value = instructionResponse.instructions),
    )
    .finally(() => (isLoading.value = false));

  return { instructions, isLoading, onClick };
};

export const formatInstruction = (
  position: number,
  instruction: string,
): string => `${position}: ${instruction}`;
