import type { Meta, StoryObj } from '@storybook/vue3';

import RecipeCard from './RecipeCard.vue';
import { generateRecipe } from '@tests/data/defaults';

const meta: Meta<typeof RecipeCard> = {
    component: RecipeCard
}

export default meta;

type Story = StoryObj<typeof RecipeCard>;

export const Default: Story = {
    render: args => ({
        components: {RecipeCard},
        setup: () => {
            return {args}
        },
        template: '<RecipeCard v-bind="args" />'
    }),
    args: {
        recipe: generateRecipe()
    }
}