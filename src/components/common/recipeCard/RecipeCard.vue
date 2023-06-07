<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title>
                <span>{{ recipe.name }}</span>
                <!-- <ion-icon name="create" class="ion-float-left"/> -->
            </ion-card-title>
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
import { ref, toRefs , defineProps} from 'vue';
import { useRecipeCardService } from '@/components/common/recipeCard/recipeCardService';

interface Props {
    recipe: Recipe,
    displayEditButton?: boolean
}

const props = defineProps<Props>()
const {recipe, displayEditButton = ref(false)} = toRefs(props)

const {formattedServingTag, formattedCuisineTag, formattedCourseTag, formattedTagTag} = useRecipeCardService(recipe)

</script>