<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/vue";
import ViewRecipeContainer from "@/components/viewRecipe/viewRecipeContainer/ViewRecipeContainer.vue";

//PROPS
interface Props {
  id: string;
}

defineProps<Props>();
</script>

<template>
  <ion-page id="recipe-view">
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>View asdf</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ViewRecipeContainer :id="Number(id)" />
    </ion-content>
  </ion-page>
</template>
