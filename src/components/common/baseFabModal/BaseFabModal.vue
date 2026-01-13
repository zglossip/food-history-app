<script setup lang="ts">
import { IonFab, IonFabButton, IonModal, IonContent } from "@ionic/vue";
import { ref } from "vue";

withDefaults(
  defineProps<{
    contentClass?: string;
  }>(),
  {
    contentClass: "ion-padding",
  }
);

const modalOpen = ref(false);

const openModal = () => {
  modalOpen.value = true;
};

const closeModal = () => {
  modalOpen.value = false;
};
</script>

<template>
  <ion-fab vertical="bottom" horizontal="end" slot="fixed">
    <ion-fab-button @click="openModal">
      <slot name="fab" />
    </ion-fab-button>
  </ion-fab>
  <ion-modal :is-open="modalOpen" @did-dismiss="closeModal">
    <ion-content :class="contentClass">
      <slot :close="closeModal" :open="openModal" />
    </ion-content>
  </ion-modal>
</template>
