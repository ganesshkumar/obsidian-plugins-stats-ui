/**
 * Utility class for scoring-related functions.
 * 
 * @category Scorer
 */
export class ScorerUtils {
  /**
   * Normalizes a value within a given range.
   *
   * @param value - The value to normalize.
   * @param min - The minimum value of the range.
   * @param max - The maximum value of the range.
   * @returns The normalized value between 0 and 1.
   *          Returns 0 if the value is less than or equal to the minimum.
   *          Returns 1 if the value is greater than or equal to the maximum.
   *          Returns 0.5 if the minimum and maximum values are equal.
   */
  normalize (value: number, min: number, max: number): number {
    if (value <= min) return 0;
    if (value >= max) return 1;
    if (min === max) return 0.5;
    return (value - min) / (max - min);
  }
}