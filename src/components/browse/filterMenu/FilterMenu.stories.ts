import { Meta, StoryObj } from "@storybook/vue3";
import FilterMenu from "@/components/browse/filterMenu/FilterMenu.vue";
import { FilterType } from "@/types/FilterType";
import { provide, readonly, ref } from "vue";
import {
  injectionKey,
  FilterMenuService,
} from "@/components/browse/filterMenu/filterMenuService";
import { action } from "@storybook/addon-actions";
import { FilterChipData } from "@/types/FilterChipData";

const meta: Meta<typeof FilterMenu> = {
  component: FilterMenu,
  argTypes: {
    onApply: {
      action: "applied",
    },
    filterOptions: {
      options: [FilterType.COURSE, FilterType.CUISINE, FilterType.TAG],
      type: "select",
    },
  },
};

export default meta;

type Story = StoryObj<typeof FilterMenu>;

const Template: Story = {
  render: (args: any) => ({
    components: { FilterMenu },
    setup: () => {
      const currentFilterType = ref(args.currentFilterType);
      const filterText = ref(args.filterText);
      const courseTypeFilters = ref(args.courseTypeFilters);
      const cuisineTypeFilters = ref(args.cuisineTypeFilters);
      const tagFilters = ref(args.tagFilters);

      provide(
        injectionKey,
        (): FilterMenuService => ({
          filterOptions: args.filterOptions,
          currentFilterType: readonly(currentFilterType),
          setCurrentFilterType: (_currentFilterType: FilterType) => {
            action("set filter type")(_currentFilterType);
            currentFilterType.value = _currentFilterType;
          },
          filterText: readonly(filterText),
          setFilterText: (_filterText: string) => {
            action("set filter text")(_filterText);
            filterText.value = _filterText;
          },
          courseTypeFilters: courseTypeFilters,
          cuisineTypeFilters: cuisineTypeFilters,
          tagFilters: tagFilters,
          addFilter: () => {
            action("adding filter")({
              currentFilterType: currentFilterType.value,
              filterText: filterText.value,
            });
            switch (currentFilterType.value) {
              case FilterType.COURSE:
                if (
                  courseTypeFilters.value.find(
                    (a: any) => a === filterText.value
                  )
                ) {
                  break;
                }
                courseTypeFilters.value.push(filterText.value);
                break;
              case FilterType.CUISINE:
                if (
                  cuisineTypeFilters.value.find(
                    (a: any) => a === filterText.value
                  )
                ) {
                  break;
                }
                cuisineTypeFilters.value.push(filterText.value);
                break;
              case FilterType.TAG:
                if (tagFilters.value.find((a: any) => a === filterText.value)) {
                  break;
                }
                tagFilters.value.push(filterText.value);
                break;
              default:
                return;
            }
          },
          removeChip: (data: FilterChipData) => {
            action("removing chip")(data);
            switch (data.type) {
              case FilterType.COURSE:
                courseTypeFilters.value = courseTypeFilters.value.filter(
                  (a: string) => a !== data.value
                );
                break;
              case FilterType.CUISINE:
                cuisineTypeFilters.value = cuisineTypeFilters.value.filter(
                  (a: string) => a !== data.value
                );
                break;
              case FilterType.TAG:
                tagFilters.value = tagFilters.value.filter(
                  (a: string) => a !== data.value
                );
                break;
              default:
                return;
            }
          },
        })
      );

      return { args };
    },
    template: '<FilterMenu v-bind="args" />',
  }),
  args: {
    contentId: 100,
    currentFilterType: FilterType.COURSE,
    filterText: "",
    filterOptions: [FilterType.COURSE, FilterType.CUISINE, FilterType.TAG],
    courseTypeFilters: [],
    cuisineTypeFilters: [],
    tagFilters: [],
  },
};

export const Default: Story = {
  ...Template,
};
