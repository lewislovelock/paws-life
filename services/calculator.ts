import { DogSize, PetType, LifeStageInfo } from '../types';
import { LIFE_STAGES } from '../constants';

/**
 * Calculates human age based on the "Tiered Stage Weighting" method.
 * Supports fractional years (months) via linear interpolation between integer benchmarks.
 */
export const calculatePetAge = (
  type: PetType,
  size: DogSize,
  years: number,
  months: number
): { age: number; stage: LifeStageInfo } => {
  const totalYears = years + months / 12;
  let humanAge = 0;

  if (type === PetType.CAT) {
    if (totalYears <= 1) {
      humanAge = totalYears * 15;
    } else if (totalYears <= 2) {
      humanAge = 15 + (totalYears - 1) * 9; // 2nd year adds 9 (15->24)
    } else {
      humanAge = 24 + (totalYears - 2) * 4;
    }
  } else {
    // DOG Logic
    if (totalYears <= 1) {
      // Year 0-1
      if (size === DogSize.GIANT) {
        humanAge = totalYears * 12;
      } else {
        humanAge = totalYears * 15;
      }
    } else if (totalYears <= 2) {
      // Year 1-2
      if (size === DogSize.GIANT) {
        humanAge = 12 + (totalYears - 1) * 10; // 12 -> 22
      } else {
        humanAge = 15 + (totalYears - 1) * 9; // 15 -> 24
      }
    } else if (totalYears <= 5) {
        // Years 3, 4, 5 (The table logic)
        // We calculate base age at 2 years, then add based on curve
        const base = size === DogSize.GIANT ? 22 : 24;
        const yearsPastTwo = totalYears - 2;
        
        // Define exact points for interpolation to match the table exactly
        // Table:
        // Small/Med/Large: 2->24, 3->28, 4->32, 5->36 (Linear +4)
        // Giant: 2->22, 3->31, 4->38, 5->45 (Non-linear)
        
        if (size !== DogSize.GIANT) {
            humanAge = base + (yearsPastTwo * 4);
        } else {
            // Giant Logic specific interpolation
            if (totalYears <= 3) {
                // 2(22) -> 3(31) = +9
                humanAge = 22 + (totalYears - 2) * 9;
            } else if (totalYears <= 4) {
                // 3(31) -> 4(38) = +7
                humanAge = 31 + (totalYears - 3) * 7;
            } else {
                // 4(38) -> 5(45) = +7
                humanAge = 38 + (totalYears - 4) * 7;
            }
        }
    } else {
      // Year 6+
      // Calculate age at year 5 first
      let ageAtFive = 36;
      if (size === DogSize.GIANT) ageAtFive = 45;

      const yearsPastFive = totalYears - 5;
      let yearlyRate = 4; // Small

      switch (size) {
        case DogSize.MEDIUM:
          yearlyRate = 5;
          break;
        case DogSize.LARGE:
          yearlyRate = 7;
          break;
        case DogSize.GIANT:
          yearlyRate = 8;
          break;
        case DogSize.SMALL:
        default:
          yearlyRate = 4;
          break;
      }

      humanAge = ageAtFive + yearsPastFive * yearlyRate;
    }
  }

  // Determine Life Stage
  let stageInfo = LIFE_STAGES.JUNIOR;
  if (humanAge >= 60) stageInfo = LIFE_STAGES.SENIOR;
  else if (humanAge >= 45) stageInfo = LIFE_STAGES.MATURE;
  else if (humanAge >= 20) stageInfo = LIFE_STAGES.ADULT;
  // Junior is default (<20)

  return { age: Math.round(humanAge), stage: stageInfo };
};
