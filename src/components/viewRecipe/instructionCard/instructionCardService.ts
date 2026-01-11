import { fetchInstructions } from "@/services/apiService";
import { Ref, ref } from "vue";

export const injectionKey = Symbol();

export interface InstructionCardService {
  instructions: Ref<string[]>;
  isLoading: Ref<boolean>;
  onClick: () => void;
  displayError: Ref<boolean>;
}

export const useInstructionCardService = (
  id: number,
  editEmit: () => void,
): InstructionCardService => {
  const instructions: Ref<string[]> = ref([]);
  const isLoading: Ref<boolean> = ref(true);
  const onClick = () => editEmit();
  const displayError: Ref<boolean> = ref(false);

  fetchInstructions(id)
    .then((instructionResponse) => {
      if (instructionResponse.ok) {
        instructions.value = instructionResponse.data.instructions;
        displayError.value = false;
        return;
      }
      instructions.value = [];
      displayError.value = true;
    })
    .finally(() => (isLoading.value = false));

  return { instructions, isLoading, onClick, displayError };
};

export const formatInstruction = (
  position: number,
  instruction: string,
): string => `${position}: ${instruction}`;
