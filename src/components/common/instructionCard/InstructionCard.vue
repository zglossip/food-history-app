<template>
  <button-card header-text="Instructions" @click="$emit('edit')">
    <div v-if="isLoading">
      <ion-spinner />
    </div>
    <div v-else-if="instructions.length === 0">
      <ion-item>
        <ion-label> None </ion-label>
      </ion-item>
    </div>
    <div v-else>
      <ion-list>
        <ion-item v-for="(instruction, i) in instructions" :key="instruction">
          <ion-label>{{ formatInstruction(i, instruction) }}</ion-label>
        </ion-item>
      </ion-list>
    </div>
  </button-card>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { IonSpinner, IonItem, IonLabel, IonList } from "@ionic/vue";
import ButtonCard from "@/components/common/buttonCard/ButtonCard.vue";
import {
  injectionKey,
  useInstructionCardService,
  formatInstruction,
} from "@/components/common/instructionCard/instructionCardService";

interface Props {
  instructionUrl: string;
}

const props = defineProps<Props>();

const { isLoading, instructions } = inject(
  injectionKey,
  useInstructionCardService,
)(props.instructionUrl);

defineEmits(["edit"]);
</script>
