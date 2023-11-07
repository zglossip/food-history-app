import { BACKEND_BASE } from "@/services/constants";
import { Recipe } from "@/types/Recipe";
import axios from "axios";
import { Ref, ref } from "vue";
import { LocationQueryValue, useRoute } from "vue-router";

export interface BrowseViewService {
  recipes: Ref<Recipe[]>;
  name: string;
  courses: string[];
  cuisines: string[];
  tags: string[];
  fetchRecipes: VoidFunction;
}

export const injectionKey = Symbol();

//TODO: Write tests
export const useBrowseMenuService = (): BrowseViewService => {
  const recipes: Ref<Recipe[]> = ref([]);
  let name = "";
  const courses: string[] = [];
  const cuisines: string[] = [];
  const tags: string[] = [];

  const route = useRoute();
  const nameQuery = route.query.nameQuery as string;
  const courseQuery = route.query.courseQuery as LocationQueryValue[];
  const cuisineQuery = route.query.cuisineQuery as LocationQueryValue[];
  const tagQuery = route.query.tagQuery as LocationQueryValue[];

  if (nameQuery) {
    name = nameQuery;
  }

  if (courseQuery) {
    courseQuery.forEach((v: LocationQueryValue) => {
      if (!v) {
        return;
      }

      courses.push(v.toString());
    });
  }

  if (cuisineQuery) {
    cuisineQuery.forEach((v: LocationQueryValue) => {
      if (!v) {
        return;
      }

      cuisines.push(v.toString());
    });
  }

  if (tagQuery) {
    tagQuery.forEach((v: LocationQueryValue) => {
      if (!v) {
        return;
      }

      tags.push(v.toString());
    });
  }

  const fetchRecipes: VoidFunction = (): void => {
    let url = BACKEND_BASE + "/recipe?";

    if (name) {
      url += `name=${name}&`;
    }

    if (courses.length) {
      courses.forEach((c: string) => (url += `course=${c}&`));
    }

    if (cuisines.length) {
      cuisines.forEach((c: string) => (url += `cuisine=${c}&`));
    }

    if (tags.length) {
      tags.forEach((t: string) => (url += `tag=${t}&`));
    }

    axios
      .get(url)
      .then((response) => (recipes.value = response.data))
      .catch(() => console.error("Error fetching recipes"));
  };

  fetchRecipes();

  return { recipes, name, courses, cuisines, tags, fetchRecipes };
};
