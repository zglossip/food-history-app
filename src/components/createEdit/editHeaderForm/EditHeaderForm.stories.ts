import type { Meta, StoryObj } from "@storybook/vue3";
import { EditHeaderFormService, INJECTION_KEY } from "./editHeaderFormService";
import { provide, ref } from "vue";
import { FILTER_OPTIONS } from "@/services/constants";
import { FilterType } from "@/types/FilterType";
import { action } from "@storybook/addon-actions";
import EditHeaderForm from "./EditHeaderForm.vue";
import { FilterChipData } from "@/types/FilterChipData";
import { generateRecipe } from "@tests/data/defaults";

//STUBS

const stubEditHeaderFormService = (args: any) => {
  const recipe = args.recipe;
  const currentFilterType = ref(args.currentFilterType);
  const filterText = ref(args.filterText);
  const newCourseTypes = ref(recipe?.courseTypes ?? []);
  const newCuisineTypes = ref(recipe?.cuisineTypes ?? []);
  const newTags = ref(recipe?.tags ?? []);

  provide(
    INJECTION_KEY,
    (): EditHeaderFormService => ({
      newName: ref(recipe?.name ?? ""),
      newServingAmount: ref(recipe?.servingAmount ?? 0),
      newServingName: ref(recipe?.servingName ?? ""),
      newCourseTypes,
      newCuisineTypes,
      newTags,
      filterOptions: FILTER_OPTIONS,
      currentFilterType,
      filterText,
      removeChip: (data: FilterChipData) => {
        action("removing chip")(data);
        switch (data.type) {
          case FilterType.COURSE:
            newCourseTypes.value = newCourseTypes.value.filter(
              (a: string) => a !== data.value,
            );
            break;
          case FilterType.CUISINE:
            newCuisineTypes.value = newCuisineTypes.value.filter(
              (a: string) => a !== data.value,
            );
            break;
          case FilterType.TAG:
            newTags.value = newTags.value.filter(
              (a: string) => a !== data.value,
            );
            break;
          default:
            return;
        }
      },
      addChip: () => {
        action("adding filter")({
          currentFilterType: currentFilterType.value,
          filterText: filterText.value,
        });
        switch (currentFilterType.value) {
          case FilterType.COURSE:
            if (newCourseTypes.value.find((a: any) => a === filterText.value)) {
              break;
            }
            newCourseTypes.value.push(filterText.value);
            break;
          case FilterType.CUISINE:
            if (
              newCuisineTypes.value.find((a: any) => a === filterText.value)
            ) {
              break;
            }
            newCuisineTypes.value.push(filterText.value);
            break;
          case FilterType.TAG:
            if (newTags.value.find((a: any) => a === filterText.value)) {
              break;
            }
            newTags.value.push(filterText.value);
            break;
          default:
            return;
        }
      },
      onSaveClick: action("saved"),
      onCancelClick: action("canceled"),
    }),
  );
};

//META

const meta: Meta<typeof EditHeaderForm> = {
  title: "Create Edit/Edit Header Form",
  component: EditHeaderForm,
  render: (args: any) => ({
    components: { EditHeaderForm },
    setup: () => {
      stubEditHeaderFormService(args);
      return { ...args };
    },
    template: `<EditHeaderForm :recipe=recipe />`,
  }),
  args: {
    recipe: generateRecipe(),
    currentFilterType: FilterType.COURSE,
    filterText: "",
  },
};

export default meta;

//STORIES

type Story = StoryObj<typeof EditHeaderForm>;

export const Default: Story = {};
