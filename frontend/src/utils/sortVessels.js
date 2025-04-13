// @ts-check
// src/utils/sortVessels.js

/**
 * Sort vessels by name or createdAt.
 *
 * @param {Array} vessels - The array of vessel objects to sort.
 * @param {string} sortField - The field to sort by ('name' or 'createdAt').
 * @param {boolean} sortAscending - Default true, if true, sort ascending; if false, descending.
 * @returns {Array} A new sorted array of vessels (original array is not mutated).
 */

export function sortVessels(vessels, sortField = "name", sortAscending = true) {
  // If sorting by name, convert it to lowercase for case-insensitive comparison.
  // If sorting by createdAt, convert the string to a Date object for accurate sorting.
  const getValue = (vessel) =>
    sortField === "name" ? vessel.name.toLowerCase() : new Date(vessel.createdAt);

  // Clone the array to avoid mutating the original and sort it
  return [...vessels].sort((a, b) => {
    const aValue = getValue(a);
    const bValue = getValue(b);

    // If both values are equal, no need to change their order
    if (aValue === bValue) return 0;

    // If ascending sort is selected
    if (sortAscending) {
      // Return 1 if aValue should come after bValue (swap), else -1
      return aValue > bValue ? 1 : -1;
    } else {
      // For descending, flip the logic
      return aValue < bValue ? 1 : -1;
    }
  });
}
