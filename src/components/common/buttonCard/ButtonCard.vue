<template>
  <ion-card>
    <ion-card-header>
      <ion-grid class="button-card-header">
        <ion-row>
          <ion-col>
            <ion-card-title v-if="headerText">
              <span>{{ headerText }}</span>
            </ion-card-title>
            <slot name="header" />
          </ion-col>
          <ion-col>
            <ion-button
              class="button-card-button"
              @click="$emit('buttonClicked')"
            >
              {{ buttonText }}
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-card-header>
    <ion-card-content>
      <slot />
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import {
  IonCard,
  IonCardHeader,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonCardContent,
  IonCardTitle,
} from "@ionic/vue";

interface Props {
  buttonText?: string;
  headerText?: string;
}

withDefaults(defineProps<Props>(), {
  buttonText: "EDIT",
  headerText: "",
});

defineEmits(["buttonClicked"]);
</script>

<style scoped>
.button-card-header {
  margin-inline: 0 !important;
}

.button-card-button {
  float: right;
}
</style>
