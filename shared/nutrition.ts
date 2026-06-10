export interface NutritionTotals {
  total_calories: number;
  total_protein: number;
  total_fat: number;
  total_carb: number;
}

export interface NutritionIngredient {
  id: number;
  calories_per_100g: number;
  protein_per_100g: number;
  fat_per_100g: number;
  carb_per_100g: number;
}

export interface RecipeIngredientEntry {
  ingredient_id: number;
  amount: number;
}

export const emptyNutrition: NutritionTotals = {
  total_calories: 0,
  total_protein: 0,
  total_fat: 0,
  total_carb: 0,
};

export function round(value: number): number {
  return Math.round(value * 100) / 100;
}

export function calculateNutritionCore(
  entries: RecipeIngredientEntry[],
  ingredientMap: Map<number, NutritionIngredient>,
  onMissingIngredient?: (ingredientId: number) => void,
): NutritionTotals {
  const totals = entries.reduce<NutritionTotals>((sum, entry) => {
    const ingredient = ingredientMap.get(entry.ingredient_id);
    if (!ingredient) {
      if (onMissingIngredient) {
        onMissingIngredient(entry.ingredient_id);
      }
      return sum;
    }
    const ratio = entry.amount / 100;
    return {
      total_calories: sum.total_calories + ingredient.calories_per_100g * ratio,
      total_protein: sum.total_protein + ingredient.protein_per_100g * ratio,
      total_fat: sum.total_fat + ingredient.fat_per_100g * ratio,
      total_carb: sum.total_carb + ingredient.carb_per_100g * ratio,
    };
  }, emptyNutrition);

  return {
    total_calories: round(totals.total_calories),
    total_protein: round(totals.total_protein),
    total_fat: round(totals.total_fat),
    total_carb: round(totals.total_carb),
  };
}
