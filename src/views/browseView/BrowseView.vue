<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenu,
  IonMenuButton,
  IonButtons,
} from "@ionic/vue";
import RecipeItem from "@/components/browse/recipeItem/RecipeItem.vue";
import FilterMenu from "@/components/browse/filterMenu/FilterMenu.vue";
import { useBrowseViewService } from "./browseViewService";

const { recipes, name, courses, cuisines, tags, applyFilters } =
  useBrowseViewService();
</script>

<template>
  <ion-menu content-id="browse-view" side="end">
    <ion-header>
      <ion-toolbar>
        <ion-title>Filter</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <filter-menu
        :starting-name="name"
        :starting-course-types="courses"
        :starting-cuisine-types="cuisines"
        :starting-tags="tags"
        @apply="applyFilters"
      />
    </ion-content>
  </ion-menu>
  <ion-page id="browse-view">
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-menu-button />
        </ion-buttons>
        <ion-title>Browse</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <recipe-item
        v-for="recipe in recipes"
        :key="recipe.id"
        :recipe="recipe"
      />
    </ion-content>
  </ion-page>
</template>
