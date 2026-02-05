
export interface Ingredient {
  item: string;
  amount: string;
}

export type RecipeTag = 
  | 'PO TRENINGU' 
  | 'NA WYNOS' 
  | 'DUŻO MIĘSA' 
  | 'SZTOS' 
  | 'WSZYSTKO' 
  | 'SZYBKA AKCJA' 
  | 'LIGHT DZIK'
  | 'BIAŁE WĘGLE'
  | 'SZYBKIE JAJO'
  | 'PŁYNNE PALIWO'
  | 'GOTOWCE'
  | 'DZIKIE ŚNIADANIA'
  | 'DOPYCHACZ'
  | 'SKLEPOWA AKCJA'
  | 'OBIADY';

export type UserGoal = 'MASA' | 'UTRZYMANIE';

export interface UserStats {
  weight: number;
  height: number;
  isTrainingDay: boolean;
  goal: UserGoal;
  mealCount: number;
}

export interface ManualLog {
  id: string;
  label: string;
  protein: number;
  carbs: number;
  fat: number;
  timestamp: number;
  recipeId?: number;
  multiplier?: number;
}

export interface AppSettings {
  appName: string;
  slogan: string;
  ctaButton: string;
  tgLink: string;
  featuresEnabled: {
    aiGeneration: boolean;
    batchImport: boolean;
  };
}

export interface Recipe {
  id: number;
  title: string;
  description: string;
  dzik_rationale?: string; // New field for the "Why for Dzik" logic
  protein: number;
  carbs: number;
  fat: number;
  time: number;
  price_est: number;
  store: 'Biedronka' | 'Lidl';
  ingredients: Ingredient[];
  instructions: string[];
  image_url: string;
  tags: RecipeTag[];
  is_published?: boolean;
}

export enum SwipeDirection {
  LEFT = 'left',
  RIGHT = 'right',
  UP = 'up'
}
