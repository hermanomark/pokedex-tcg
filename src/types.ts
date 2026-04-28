// Series
export interface SeriesBrief {
  id: string;
  name: string;
}

export interface SeriesBase extends SeriesBrief {
  logo?: string;
  sets: SetBrief[];
  firstSet: SetBrief;
  lastSet: SetBrief;
  releaseDate: string;
}

export interface SetBriefCardCount {
  total: number;
  official: number;
}

// Sets
export interface SetBaseCardCount extends SetBriefCardCount {
  reverse: number;
  holo: number;
  firstEd: number;
  normal: number;
}

export interface SetBrief {
  id: string;
  name: string;
  logo?: string;
  symbol?: string;
  cardCount: SetBriefCardCount;
}

export interface SetBase extends SetBrief {
  cardCount: SetBaseCardCount;
  serie: SeriesBrief;
  tcgOnline?: string;
  legal: {
    standard: boolean;
    expanded: boolean;
  }
  booster: Booster[];
  cards: CardBrief[];
  releaseDate: string;
  abbreviation: {
    official: string;
    tcgOnline?: string;
  }
}


// Cards
export interface CardVariants {
  normal: boolean;
  reverse: boolean;
  holo: boolean;
  firstEdition: boolean;
}

export interface Booster {
  id: string;
  name: string;
  logo?: string;
  artwork_front?: string;
  artwork_back?: string;
}

export interface TCGPlayerVariantPricing {
  lowPrice?: number;
  midPrice?: number;
  highPrice?: number;
  marketPrice?: number;
  directLowPrice?: number;
}

export interface TCGPlayerPricing {
  updated: number;
  unit: number;
  normal?: TCGPlayerVariantPricing;
  holofoil?: TCGPlayerVariantPricing;
  'reverse-holofoil'?: TCGPlayerVariantPricing;
  '1st-edition'?: TCGPlayerVariantPricing;
  '1st-edition-holofoil'?: TCGPlayerVariantPricing;
  unlimited?: TCGPlayerVariantPricing;
  'unlimited-holofoil'?: TCGPlayerVariantPricing;
}

export interface CardmarketPricing {
  updated?: number;
  unit?: number;
  avg?: number;
  low?: number;
  trend?: number;
  avg1?: number;
  avg7?: number;
  avg30?: number;
  'avg-holo'?: number;
  'low-holo'?: number;
  'trend-holo'?: number;
  'avg1-holo'?: number;
  'avg7-holo'?: number;
  'avg30-holo'?: number;
}

export interface CardPricing {
  tcgplayer?: TCGPlayerPricing;
  cardmarket?: CardmarketPricing;
}

export interface CardBrief {
  id: string;
  localId: string | number;
  name: string;
  image?: string;
}

export interface CardBase extends CardBrief {
  illustrator?: string;
  rarity?: string;
  set: SetBrief;
  variants: CardVariants;
  boosters?: Booster[] | null;
  pricing?: CardPricing;
  updated: string;
  legal: {
    standard: boolean;
    expanded: boolean;
  }
}

export interface Attack {
  name: string;
  damage?: string;
  effect?: string;
  cost?: string[];
}

export interface Weakness {
  type: string;
  value: string;
}

export interface PokemonCard extends CardBase {
  category: 'Pokemon';
  dexId?: number[];
  hp?: number;
  types?: string[];
  evolveFrom?: string;
  description?: string;
  level?: string;
  stage?: string;
  suffix?: string;
  attacks?: Attack[];
  weaknesses?: Weakness[];
  item?: {
    name: string;
    effect: string;
  };
}

export interface TrainerCard extends CardBase {
  category: 'Trainer';
  effect: string;
  trainerType: string;
}

export interface EnergyCard extends CardBase {
  category: 'Energy';
  effect: string;
  energyType: string;
}

export type Card = PokemonCard | TrainerCard | EnergyCard;
