import { Recipe } from "@/models/Recipe"
import { ComputedRef, Ref, computed, toRefs } from "vue"

export interface RecipeCardService {
    formattedServingTag: ComputedRef<string>,
    formattedCuisineTag: ComputedRef<string | boolean>,
    formattedCourseTag: ComputedRef<string | boolean>,
    formattedTagTag: ComputedRef<string | boolean>
}

export const useRecipeCardService = (recipe: Ref<Recipe> ): RecipeCardService => {

    const{servingAmount, servingName, cuisineTypes, courseTypes, tags} = toRefs<Recipe>(recipe.value)

    const formatTag = (tagName: string, tags: Ref<Array<string>>): ComputedRef<string | boolean> => computed(() => {
        if(tags.value.length === 0) {
            return false;
        }

        if(tags.value.length === 1) {
            return `${tagName}: ${tags.value[0]}`;
        }

        return `${tagName}s: ${tags.value.reduce((prev: string, cur: string) => `${prev}, ${cur}`)}`
    })

    const formattedServingTag: ComputedRef<string> = computed(() => {
        return `${servingAmount.value} ${servingName.value}`
    })

    const formattedCuisineTag: ComputedRef<string | boolean> = formatTag('Cusine', cuisineTypes)
    const formattedCourseTag: ComputedRef<string | boolean> = formatTag('Course', courseTypes)
    const formattedTagTag: ComputedRef<string | boolean> = formatTag('Tag', tags)

    return {formattedServingTag, formattedCuisineTag, formattedCourseTag, formattedTagTag}
}