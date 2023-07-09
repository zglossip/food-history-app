<template>
    <ion-card>
        <ion-card-content>
            <ion-list>
                <ion-item v-for="ingredient in ingredients">
                
                </ion-item>
            </ion-list>
        </ion-card-content>
    </ion-card>
</template>

<script setup lang="ts">
import { useIngredientCardService , injectionKey} from '@/components/common/ingredientCard/ingredientCardService';
import { inject } from 'vue';
import { IonCard, IonCardContent, IonList, IonItem } from '@ionic/vue';

interface Props {
    recipeId: number
}

const props = defineProps<Props>()

const {isLoading, ingredients} = inject(injectionKey, useIngredientCardService)(props.recipeId)
</script>
