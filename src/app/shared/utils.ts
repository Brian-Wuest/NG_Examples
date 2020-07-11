/**
 * Generates a guid.
 * @return {string} The string representation of a unique identifier.
 */
export function generateGuid(): string {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function s4(): string {
  return Math.floor((1 + Math.random()) * 0x1000)
    .toString(16)
    .substring(1);
}
