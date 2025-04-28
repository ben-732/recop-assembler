export const JOIN_STRING = "; ---- DEFS END ----";

/**
 * Combines two strings with a join string in between.
 */
export function combineStrings(str1: string, str2: string): string {
  return `${str1}\n${JOIN_STRING}\n${str2}`;
}

/**
 * Checks if the string contains the join string.
 * @param defs The string to check.
 * @returns True if the string contains the join string, false otherwise.
 */
export function containsJoinString(defs: string): boolean {
  return defs.includes(JOIN_STRING);
}

/**
 * Splits a string into two parts using the join string.
 * @param defs The string to split.
 * @returns An array containing the two parts of the string.
 */
export function splitStrings(defs: string): [string, string] {
  const parts = defs.split(JOIN_STRING);
  return [parts[0], parts[1]];
}
