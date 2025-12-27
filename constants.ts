import { DogSize, LifeStageInfo } from './types';

export const COMMON_DOG_BREEDS: Record<string, DogSize> = {
  'Chihuahua': DogSize.SMALL,
  'Pomeranian': DogSize.SMALL,
  'Yorkshire Terrier': DogSize.SMALL,
  'Pug': DogSize.SMALL,
  'French Bulldog': DogSize.MEDIUM,
  'Beagle': DogSize.MEDIUM,
  'Corgi': DogSize.MEDIUM,
  'Shiba Inu': DogSize.MEDIUM,
  'Border Collie': DogSize.MEDIUM,
  'Golden Retriever': DogSize.LARGE,
  'Labrador Retriever': DogSize.LARGE,
  'German Shepherd': DogSize.LARGE,
  'Husky': DogSize.LARGE,
  'Great Dane': DogSize.GIANT,
  'Saint Bernard': DogSize.GIANT,
  'Mastiff': DogSize.GIANT,
  'Rottweiler': DogSize.LARGE, // Sometimes Giant, putting Large for avg
};

export const LIFE_STAGES = {
  JUNIOR: {
    stage: 'Junior',
    description: 'Boundless energy! Focus on socialization and basic training.',
    color: 'text-emerald-600',
    bgGradient: 'from-emerald-100 to-teal-50',
  } as LifeStageInfo,
  ADULT: {
    stage: 'Adult',
    description: 'Peak physical condition. Maintain a balanced diet and regular exercise.',
    color: 'text-blue-600',
    bgGradient: 'from-blue-100 to-indigo-50',
  } as LifeStageInfo,
  MATURE: {
    stage: 'Mature',
    description: 'Slowing down slightly. Annual check-ups are highly recommended.',
    color: 'text-violet-600',
    bgGradient: 'from-violet-100 to-purple-50',
  } as LifeStageInfo,
  SENIOR: {
    stage: 'Senior',
    description: 'Golden years. Watch joint health and switch to lower-calorie senior food.',
    color: 'text-rose-600',
    bgGradient: 'from-rose-100 to-pink-50',
  } as LifeStageInfo,
};
