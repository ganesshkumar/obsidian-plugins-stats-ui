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
  normalize(value: number, min: number, max: number): number {
    if (value <= min) return 0;
    if (value >= max) return 1;
    if (min === max) return 0.5;
    return (value - min) / (max - min);
  }

  /**
   * Applies a normalized sigmoid function to a value within a given range.
   *
   * @param value - The value to apply the sigmoid function to.
   * @param min - The minimum value of the range.
   * @param max - The maximum value of the range.
   * @param k - The steepness of the sigmoid curve (default is 0.1).
   * @returns The value transformed by the sigmoid function, normalized between 0 and 1.
   *          Returns 0 if the value is less than the minimum.
   *          Returns 1 if the value is greater than the maximum.
   *          Returns 0.5 if the minimum and maximum values are equal.
   */
  normalizedSigmoid(
    x: number,
    min: number,
    max: number,
    k: number = 0.1
  ): number {
    if (x < min) return 0;
    if (x > max) return 1;
    if (max === min) return 0.5;

    const midpoint = (min + max) / 2;

    // Sigmoid function centered at the midpoint
    const sigmoid = (value: number): number => {
      return 1 / (1 + Math.exp(-k * (value - midpoint)));
    };

    // Values at the boundaries
    const sMin = sigmoid(min);
    const sMax = sigmoid(max);

    // Normalize between 0 and 1
    return (sigmoid(x) - sMin) / (sMax - sMin);
  }

  /**
   * Removes duplicate elements from an array.
   *
   * @param array - The array from which to remove duplicates.
   * @param keyMapper - Optional function to map array elements to a key for comparison.
   * @returns A new array with duplicates removed.
   */
  removeDuplicates<T>(array: T[], keyMapper?: (obj: T) => boolean): T[] {
    const map = new Map();
    if (keyMapper) {
      array.forEach((value) => map.set(keyMapper(value), value));
      return Array.from(map.values());
    }
    array.forEach((value) => map.set(value, value));
    return Array.from(map.values());
  }
}
