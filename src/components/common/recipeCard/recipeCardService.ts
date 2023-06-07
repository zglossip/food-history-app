import { Recipe } from "@/models/Recipe"
import { ComputedRef, Ref, computed, toRefs } from "vue"

export interface RecipeCardService {
    formattedServingTag: ComputedRef<String>,
    formattedCuisineTag: ComputedRef<String | Boolean>,
    formattedCourseTag: ComputedRef<String | Boolean>,
    formattedTagTag: ComputedRef<String | Boolean>
}

export const useRecipeCardService = (recipe: Ref<Recipe> ): RecipeCardService => {

    const{servingAmount, servingName, cuisineTypes, courseTypes, tags} = toRefs<Recipe>(recipe.value)

    const formatTag = (tagName: String, tags: Ref<Array<String>>): ComputedRef<String | Boolean> => computed(() => {
        if(tags.value.length === 0) {
            return false;
        }

        if(tags.value.length === 1) {
            return `${tagName}: ${tags.value[0]}`;
        }

        return `${tagName}s: ${tags.value.reduce((prev: String, cur: String) => `${prev}, ${cur}`)}`
    })

    const formattedServingTag: ComputedRef<String> = computed(() => {
        return `${servingAmount.value} ${servingName.value}`
    })

    const formattedCuisineTag: ComputedRef<String | Boolean> = formatTag('Cusine', cuisineTypes)
    const formattedCourseTag: ComputedRef<String | Boolean> = formatTag('Course', courseTypes)
    const formattedTagTag: ComputedRef<String | Boolean> = formatTag('Tag', tags)

    return {formattedServingTag, formattedCuisineTag, formattedCourseTag, formattedTagTag}
}