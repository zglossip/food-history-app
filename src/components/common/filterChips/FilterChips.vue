<template>
  <ion-card>
    <ion-card-content>
      <filter-chip-set
        :elements="courseTypes"
        icon-url="/img/reshot-icon-fork-V968G523SF.svg"
        icon-alt-text="Course"
        @close="course => close({type: FilterType.COURSE, value: course})"
      />
      <filter-chip-set
        :elements="cuisineTypes"
        icon-url="/img/reshot-icon-globe-JHXCB4TD7Q.svg"
        icon-alt-text="Cuisine"
        @close="cuisine => close({type: FilterType.CUISINE, value: cuisine})"
      />
      <filter-chip-set
        :elements="tags"
        icon-url="/img/reshot-icon-tag-YU436XW8QJ.svg"
        icon-alt-text="Tag"
        @close="tag => close({type: FilterType.TAG, value: tag})"
      />
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonCardContent } from "@ionic/vue";
import FilterChipSet from "@/components/common/filterChips/FilterChipSet.vue";
import {FilterChipData} from "@/types/FilterChipData"
import {FilterType} from "@/types/FilterType"

interface Props {
  courseTypes: Array<string>;
  cuisineTypes: Array<string>;
  tags: Array<string>;
}

defineProps<Props>();

const emit = defineEmits(['remove-chip']);
const close = (data: FilterChipData) => emit('remove-chip', data)
</script>
