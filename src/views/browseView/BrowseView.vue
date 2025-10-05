<script setup lang="ts">
import RecipeItem from "@/components/browse/recipeItem/RecipeItem.vue";
import FilterMenu from "@/components/browse/filterMenu/FilterMenu.vue";
import BasePage from "@/components/common/basePage/BasePage.vue";
import { useBrowseViewService } from "./browseViewService";
import { filterCircleOutline } from "ionicons/icons";
import {
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
  IonContent,
} from "@ionic/vue";
import { ref } from "vue";
import { Filters } from "@/components/browse/filterMenu/filterMenuService";

const { recipes, name, courses, cuisines, tags, applyFilters } =
  useBrowseViewService();

const modalOpen = ref(false);

const openModal = () => (modalOpen.value = true);
const closeModal = () => (modalOpen.value = false);

const onApply = (filters: Filters) => {
  applyFilters(filters);
  closeModal();
};
</script>

<template>
  <BasePage title="Browse">
    <recipe-item v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button @click="openModal">
        <ion-icon :icon="filterCircleOutline" />
      </ion-fab-button>
    </ion-fab>
    <ion-modal :is-open="modalOpen" @did-dismiss="closeModal">
      <ion-content class="ion-padding">
        <filter-menu
          :starting-name="name"
          :starting-course-types="courses"
          :starting-cuisine-types="cuisines"
          :starting-tags="tags"
          @apply="onApply"
        />
      </ion-content>
    </ion-modal>
  </BasePage>
</template>
