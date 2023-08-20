<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Browse</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <recipe-card
        v-for="recipe in recipes"
        :recipe="recipe"
        :key="recipe.id"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import RecipeCard from "@/components/viewRecipe/recipeCard/RecipeCard.vue";
import { useBrowseMenuService } from "./browseViewService";

const { recipes } = useBrowseMenuService();
</script>
