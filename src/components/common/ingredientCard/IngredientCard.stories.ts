import type { Meta, StoryObj } from "@storybook/vue3";

import IngredientCard from "./IngredientCard.vue";

const meta: Meta<typeof IngredientCard> = {
    component: IngredientCard,
    argTypes: {onEdit: {action: "edit clicked"}}
}

export default meta;

type Story = StoryObj<typeof IngredientCard>;

const Template: Story = {
    render: (args: any) => ({
        components: {IngredientCard},
        setup: () => args,
        template: '<IngredientCard v-bind="args" />'
    })
}