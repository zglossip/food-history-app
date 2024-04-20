<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import EditHeaderContainer from "@/components/createEdit/editHeaderContainer/EditHeaderContainer.vue";

//PROPS
interface Props {
  id: string;
}

defineProps<Props>();
</script>

<template>
  <ion-page id="edit-header-view">
    <ion-header>
      <ion-toolbar>
        <ion-title>Edit Recipe</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <EditHeaderContainer :id="Number(id)" />
    </ion-content>
  </ion-page>
</template>
