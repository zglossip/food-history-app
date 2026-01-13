<script setup lang="ts">
import RecipeItem from "@/components/browse/recipeItem/RecipeItem.vue";
import FilterMenu from "@/components/browse/filterMenu/FilterMenu.vue";
import BasePage from "@/components/common/basePage/BasePage.vue";
import BaseFabModal from "@/components/common/baseFabModal/BaseFabModal.vue";
import { useBrowseViewService } from "./browseViewService";
import { filterCircleOutline } from "ionicons/icons";
import { IonIcon, IonItem, IonLabel } from "@ionic/vue";
import { Filters } from "@/components/browse/filterMenu/filterMenuService";

const { recipes, name, courses, cuisines, tags, applyFilters, displayError } =
  useBrowseViewService();

const onApply = (filters: Filters) => {
  applyFilters(filters);
};

const onApplyWithClose = (filters: Filters, closeModal: () => void) => {
  onApply(filters);
  closeModal();
};
</script>

<template>
  <BasePage title="Browse">
    <ion-item v-if="displayError">
      <ion-label color="danger"
        >Unable to load recipes. Please try again.</ion-label
      >
    </ion-item>
    <recipe-item v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
    <base-fab-modal>
      <template #fab>
        <ion-icon :icon="filterCircleOutline" />
      </template>
      <template #default="{ close }">
        <filter-menu
          :starting-name="name"
          :starting-course-types="courses"
          :starting-cuisine-types="cuisines"
          :starting-tags="tags"
          @apply="(filters) => onApplyWithClose(filters, close)"
        />
      </template>
    </base-fab-modal>
  </BasePage>
</template>
