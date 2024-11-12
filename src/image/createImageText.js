import { getColorCode } from "../color/colorUtils";
import { ANSI } from "../color/ansiCodes";

/**
 * Creates a text representation of an image using ANSI color codes.
 * @param {Object} imageData - An object containing the image data.
 * @param {string} [colorMode='24bit'] - The color mode.
 * @returns {string} A string representing the image with ANSI escape codes.
 */
export function createImageText(imageData, colorMode = '24bit') {
    const width = imageData.width;
    const height = imageData.height;
    let output = [];

    for (let y = 0; y < height; y++) {
        let row = [];
        for (let x = 0; x < width; x++) {
            const i = (y * width + x) * 4;
            const r = imageData.data[i];
            const g = imageData.data[i + 1];
            const b = imageData.data[i + 2];
            const a = imageData.data[i + 3];

            if (a > 0) {
                const colorCode = getColorCode(r, g, b, colorMode);
                row.push(`${colorCode}  ${ANSI.reset}`);
            } else {
                row.push("  ");
            }
        }
        output.push(row.join(''));
    }
    return output.join('\n');
}
