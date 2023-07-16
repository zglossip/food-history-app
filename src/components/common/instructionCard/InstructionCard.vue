<template>
  <ion-card>
    <ion-card-header> Instructions </ion-card-header>
    <ion-card-content v-if="isLoading">
      <ion-spinner />
    </ion-card-content>
    <ion-card-content v-else-if="instructions.length === 0">
      <ion-item>
        <ion-label> None </ion-label>
      </ion-item>
    </ion-card-content>
    <ion-card-content v-else>
      <ion-list>
        <ion-item v-for="(instruction, i) in instructions" :key="instruction">
          <ion-label>{{ formatInstruction(i, instruction) }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { inject } from "vue";
import {
  injectionKey,
  useInstructionCardService,
  formatInstruction
} from "@/components/common/instructionCard/instructionCardService";

interface Props {
  instructionUrl: string;
}

const props = defineProps<Props>();

const { isLoading, instructions } = inject(
  injectionKey,
  useInstructionCardService
)(props.instructionUrl);
</script>
