import { Filters } from "@/components/browse/filterMenu/filterMenuService";
import { BACKEND_BASE } from "@/services/constants";
import { Recipe } from "@/types/Recipe";
import axios from "axios";
import { Ref, ref } from "vue";
import { LocationQueryValue, useRoute } from "vue-router";

export interface BrowseViewService {
  recipes: Ref<Recipe[]>;
  name: Ref<string>;
  courses: Ref<string[]>;
  cuisines: Ref<string[]>;
  tags: Ref<string[]>;
  fetchRecipes: VoidFunction;
  applyFilters: (filter: Filters) => void;
}

export const injectionKey = Symbol();

//TODO: Write tests
export const useBrowseMenuService = (): BrowseViewService => {
  const recipes: Ref<Recipe[]> = ref([]);
  const name: Ref<string> = ref("");
  const courses: Ref<string[]> = ref([]);
  const cuisines: Ref<string[]> = ref([]);
  const tags: Ref<string[]> = ref([]);

  const route = useRoute();
  const nameQuery = route.query.nameQuery as string;
  const courseQuery = route.query.courseQuery as LocationQueryValue[];
  const cuisineQuery = route.query.cuisineQuery as LocationQueryValue[];
  const tagQuery = route.query.tagQuery as LocationQueryValue[];

  if (nameQuery) {
    name.value = nameQuery;
  }

  if (courseQuery) {
    courseQuery.forEach((v: LocationQueryValue) => {
      if (!v) {
        return;
      }

      courses.value.push(v.toString());
    });
  }

  if (cuisineQuery) {
    cuisineQuery.forEach((v: LocationQueryValue) => {
      if (!v) {
        return;
      }

      cuisines.value.push(v.toString());
    });
  }

  if (tagQuery) {
    tagQuery.forEach((v: LocationQueryValue) => {
      if (!v) {
        return;
      }

      tags.value.push(v.toString());
    });
  }

  const fetchRecipes: VoidFunction = (): void => {
    let url = BACKEND_BASE + "/recipe?";

    if (name.value) {
      url += `name=${name.value}&`;
    }

    if (courses.value.length) {
      courses.value.forEach((c: string) => (url += `course=${c}&`));
    }

    if (cuisines.value.length) {
      cuisines.value.forEach((c: string) => (url += `cuisine=${c}&`));
    }

    if (tags.value.length) {
      tags.value.forEach((t: string) => (url += `tag=${t}&`));
    }

    axios
      .get(url)
      .then((response) => (recipes.value = response.data))
      .catch(() => console.error("Error fetching recipes"));
  };

  const applyFilters = (filters: Filters): void => {
    name.value = filters.nameFilter;
    courses.value = filters.courseTypeFilters;
    cuisines.value = filters.cuisineTypeFilters;
    tags.value = filters.tagFilters;
    fetchRecipes();
  };

  fetchRecipes();

  return { recipes, name, courses, cuisines, tags, fetchRecipes, applyFilters };
};
