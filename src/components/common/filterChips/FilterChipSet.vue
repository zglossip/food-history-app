<template>
  <ion-chip v-for="element in elements" :key="element">
    <ion-avatar>
      <img :src="iconUrl" :alt="iconAltText" />
    </ion-avatar>
    <ion-label>{{ element }}</ion-label>
    <ion-icon :icon="closeCircle" :click="$emit('close')" />
  </ion-chip>
</template>

<script setup lang="ts">
import { IonChip, IonLabel, IonIcon, IonAvatar } from "@ionic/vue";
import { closeCircle } from "ionicons/icons";

interface Props {
  elements: Array<string>;
  iconUrl: string;
  iconAltText: string;
}

defineProps<Props>();
</script>
