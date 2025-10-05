<script setup lang="ts">
import RecipeItem from "@/components/browse/recipeItem/RecipeItem.vue";
import FilterMenu from "@/components/browse/filterMenu/FilterMenu.vue";
import BasePage from "@/components/common/basePage/BasePage.vue";
import { useBrowseViewService } from "./browseViewService";

const { recipes, name, courses, cuisines, tags, applyFilters } =
  useBrowseViewService();
</script>

<template>
  <BasePage title="Browse" menu-title="Filter">
    <template #menu>
      <filter-menu
        :starting-name="name"
        :starting-course-types="courses"
        :starting-cuisine-types="cuisines"
        :starting-tags="tags"
        @apply="applyFilters"
      />
    </template>
    <recipe-item v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
  </BasePage>
</template>
