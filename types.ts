export enum PetType {
  CAT = 'CAT',
  DOG = 'DOG'
}

export enum DogSize {
  SMALL = 'SMALL', // <9kg
  MEDIUM = 'MEDIUM', // 9-22kg
  LARGE = 'LARGE', // 23-40kg
  GIANT = 'GIANT' // >40kg
}

export interface LifeStageInfo {
  stage: string;
  description: string;
  color: string;
  bgGradient: string;
}

export interface CalculationResult {
  humanYears: number;
  lifeStage: LifeStageInfo;
}

export interface BreedInfo {
  name: string;
  size: DogSize;
}
