/**
 * Replace a character in a string at the index specified.
 *
 * @export
 * @param {string} str String you want to replace a character in.
 * @param {number} index Index of the character you want to replace.
 * @param {string} replacement What you want to replace the character with.
 * @return {string} The string originally passed in with the character replaced.
 */
export function replaceAt(str: string, index: number, replacement: string) {
    if (index > (str.length - 1)) {
        console.error('Index above string length');
        return str;
    }
    return str.substring(0, index) + replacement + str.substring(index + 1);
}