import { COLOR_MODE } from '../config.js';
/**
 * Converts RGB values to the closest 256-color code.
 * @param {number} r - Red value (0-255).
 * @param {number} g - Green value (0-255).
 * @param {number} b - Blue value (0-255).
 * @returns {number} The closest 256-color code.
 */
export function rgbTo256(r, g, b) {
    // RGB to 256-color mapping
    if (r !== g || g !== b) {
        const rI = Math.round(r / 51);
        const gI = Math.round(g / 51);
        const bI = Math.round(b / 51);
        return 16 + (36 * rI) + (6 * gI) + bI;
    } else {
        if (r < 8) return 16;
        if (r > 248) return 231;
        return Math.round(((r - 8) / 247) * 24) + 232;
    }
}

/**
 * Returns the color code for the given RGB values and color mode.
 *
 * @param {number} r - The red component of the color (0-255).
 * @param {number} g - The green component of the color (0-255).
 * @param {number} b - The blue component of the color (0-255).
 * @param {string} colorMode - The color mode, either `COLOR_MODE.TRUE_COLOR` or `COLOR_MODE.256`.
 * @returns {string} The ANSI color code for the given RGB values and color mode.
 *
 * @example
 * const colorCode = getColorCode(255, 0, 0, COLOR_MODE.TRUE_COLOR);
 * console.log(colorCode); // Outputs the ANSI color code for bright red in true color mode.
 */
export function getColorCode(r, g, b, colorMode) {
    if (colorMode === COLOR_MODE.TRUE_COLOR) {
        return ANSI.bgRGB(r, g, b);
    } else {
        return ANSI.bg256(rgbTo256(r, g, b));
    }
}
