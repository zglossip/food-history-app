<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title>{{ recipe.name }}</ion-card-title>
            <ion-card-subtitle>{{ formattedServingTag }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
            <ul>
                <li v-for="(tag, i) in [formattedCuisineTag, formattedCourseTag, formattedTagTag]" :key="i">{{ tag }}</li>
            </ul>
        </ion-card-content>
    </ion-card>
</template>

<script setup lang="ts">
import { Recipe } from '@/models/Recipe';
import { toRefs } from 'vue';
import { useRecipeCardService, RecipeCardService } from '@/components/common/recipeCard/recipeCardService';

interface Props {
    recipe: Recipe
}

const {recipe} = toRefs(defineProps<Props>())

const {formattedServingTag, formattedCuisineTag, formattedCourseTag, formattedTagTag} = useRecipeCardService(recipe)

</script>