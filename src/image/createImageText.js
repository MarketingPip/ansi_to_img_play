import { getColorCode } from "../color/colorUtils.js";
import { ANSI } from "../color/ansiCodes.js";

/**
 * Creates a text representation of an image using ANSI color codes.
 * @param {Object} imageData - An object containing the image data.
 * @param {string} [colorMode='24bit'] - The color mode.
 * @returns {string} A string representing the image with ANSI escape codes.
 */
function createImageText(imageData, colorMode = '24bit', twoPixelsPerSpace = true) {
    let result = '';
    const width = imageData.width;
    const height = imageData.height;
  
    // If twoPixelsPerSpace is enabled, adjust the width and height
    const adjustedWidth = twoPixelsPerSpace ? Math.ceil(width / 2) : width;
    const adjustedHeight = twoPixelsPerSpace ? Math.ceil(height / 2) : height;
  
    for (let y = 0; y < adjustedHeight; y++) {
        let row = '';
        
        for (let x = 0; x < adjustedWidth; x++) {
            // Get pixel for the current position, handle two pixels if enabled
            let pixel = imageData.getPixel(x * (twoPixelsPerSpace ? 2 : 1), y);
            let pixelColor = getColorCode(pixel.r, pixel.g, pixel.b, colorMode);
            
            if (twoPixelsPerSpace) {
                // Get the adjacent pixel for the second half of the block
                let nextPixel = imageData.getPixel(x * 2 + 1, y);
                let nextPixelColor = getColorCode(nextPixel.r, nextPixel.g, nextPixel.b, colorMode);
                
                // Combine both pixels into a single "block" using ▄ character
                row += `${pixelColor}\x1b[48;5;${nextPixelColor.bg}m▄` +
                    `\x1b[38;5;${nextPixelColor.fg}m\x1b[48;5;${pixelColor.bg}m▄\x1b[0m`;
            } else {
                // Standard one pixel rendering
                row += `\x1b[38;5;${pixelColor.fg}m\x1b[48;5;${pixelColor.bg}m█\x1b[0m`;
            }
        }
        
        result += row + '\n';
    }
    
    return result;
}
