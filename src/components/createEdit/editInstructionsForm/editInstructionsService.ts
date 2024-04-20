import { fetchInstructions, saveInstructions } from "@/services/apiService";
import { reorderIonicItems } from "@/services/util";
import { InstructionList } from "@/types/InstructionList";
import { Ref, ref } from "vue";
import { useRouter } from "vue-router";

export const INJECTION_KEY = Symbol();

export interface EditInstructionsService {
  instructions: Ref<string[]>;
  onItemReorder: (evt: CustomEvent) => void;
  onSaveClick: () => void;
  onCancelClick: () => void;
}

export const useEditInstructionService = (
  id: number,
): EditInstructionsService => {
  const instructions: Ref<string[]> = ref([]);

  const router = useRouter();

  fetchInstructions(id).then(
    (response: InstructionList) => (instructions.value = response.instructions),
  );

  const onItemReorder = (evt: CustomEvent) => {
    reorderIonicItems(evt, instructions.value);
  };

  const onSaveClick = () => {
    saveInstructions({
      instructions: instructions.value,
      recipeId: id,
    });
    router.go(-1);
  };

  const onCancelClick = () => {
    router.go(-1);
  };

  return { instructions, onItemReorder, onSaveClick, onCancelClick };
};
