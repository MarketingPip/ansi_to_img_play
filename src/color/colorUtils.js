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
