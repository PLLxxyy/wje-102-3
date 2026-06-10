import { Ingredient } from '../types/ingredient';
import { RecipeIngredientInput } from '../types/recipe';
import {
  calculateNutritionCore,
  emptyNutrition as sharedEmptyNutrition,
  round as sharedRound,
} from '@shared/nutrition';

export type { NutritionTotals } from '@shared/nutrition';

export const emptyNutrition = sharedEmptyNutrition;

export const round = sharedRound;

export function calculateNutrition(
  entries: RecipeIngredientInput[],
  ingredients: Ingredient[],
) {
  const map = new Map(ingredients.map((ingredient) => [ingredient.id, ingredient]));
  return calculateNutritionCore(entries, map);
}
