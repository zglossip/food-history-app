import type { Meta, StoryObj } from "@storybook/vue3";

import IngredientList from "./IngredientList.vue";

const meta: Meta<typeof IngredientList> = {
    component: IngredientList,
    argTypes: {onEdit: {action: "edit clicked"}}
}

export default meta;

type Story = StoryObj<typeof IngredientList>;

const Template: Story = {
    render: (args: any) => ({
        components: {IngredientList},
        setup: () => args,
        template: '<IngredientList v-bind="args" />'
    })
}