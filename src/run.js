import { isValidString } from './utils/stringUtils.js';
import { isValidNumber } from './utils/numberUtils.js';
import { loadImage } from './image/loadImage.js';
import { resizeImageData } from './image/resizeImageData.js';
import { createImageText } from './image/createImageText.js';
import { COLOR_MODE } from './config.js';
import { getColorCode } from "./color/colorUtils.js";
import { ANSI } from "./color/ansiCodes.js";
/**
 * Asynchronously processes an image and returns an ANSI-escaped pixel art representation.
 * The function takes options for color mode, dimensions, and image path, loads the image, resizes it if necessary, 
 * and generates a pixel art representation based on the provided parameters.
 *
 * @param {Object} [_options={}] - The options to configure the image processing.
 * @param {string} [_options.imagePath=null] - The path to the image file. This is a required option.
 * @param {string} [_options.colorMode=COLOR_MODE.TRUE_COLOR] - The color mode for the pixel art. Default is true color (24-bit).
 * @param {number|null} [_options.width=null] - The target width for resizing the image. If `null`, uses the original width.
 * @param {number|null} [_options.height=null] - The target height for resizing the image. If `null`, uses the original height.
 * @param {boolean} [_options.maintainAspectRatio=true] - Whether to maintain the aspect ratio when resizing. Default is true.
 * 
 * @returns {Promise<string>} The ANSI-escaped string representing the image in pixel art.
 * 
 * @throws {Error} Throws an error if the `imagePath` is invalid or missing.
 * 
 * @example
 * // Example usage:
 * const options = {
 *   imagePath: './path/to/image.png',
 *   colorMode: '256',
 *   width: 100,
 *   height: 100,
 *   maintainAspectRatio: true
 * };
 * 
 * run(options).then(imageText => {
 *   console.log(imageText); // Outputs the ANSI-escaped pixel art representation of the image
 * }).catch(error => {
 *   console.error('Error processing image:', error.message);
 * });
 */
export async function run(_options = {}) {
    const defaultOptions = {
        colorMode: COLOR_MODE.TRUE_COLOR,
        width: null,  // Target width (null means original size)
        height: null, // Target height (null means original size)
        maintainAspectRatio: true,
        imagePath: null,
    };

    // Overwrite default options with any options passed
    const options = { ...defaultOptions, ..._options };
    
    try {
        // Validate imagePath is a valid, non-empty string
        if (!isValidString(options.imagePath)) {
            throw new TypeError("Invalid or missing 'imagePath' option. The image path or source is required and should be a non-empty string.");
        }

        const { colorMode, width, height, maintainAspectRatio } = options;
        
        // Load the image data
        const { imageData: originalImageData, width: originalWidth, height: originalHeight } = await loadImage(options.imagePath);
        
      
      if(options.width){
        options.width = Number(options.width)
         isValidNumber(options.width, "Width")
      }
      
           if(options.height){
           options.height = Number(options.height)  
           
         isValidNumber(options.height, "Height")
      }
        // Calculate new dimensions based on input options or original image size
        let newWidth = width || originalWidth;
        let newHeight = height || originalHeight;

        // Maintain aspect ratio if requested
        if (maintainAspectRatio && (width || height)) {
            const ratio = originalWidth / originalHeight;
            if (width && !height) {
                newHeight = Math.round(width / ratio);
            } else if (height && !width) {
                newWidth = Math.round(height * ratio);
            } else {
                // Both width and height specified, use the more constraining one
                const widthRatio = width / originalWidth;
                const heightRatio = height / originalHeight;
                if (widthRatio < heightRatio) {
                    newHeight = Math.round(width / ratio);
                } else {
                    newWidth = Math.round(height * ratio);
                }
            }
        }
        
        // Resize the image if necessary
        const finalImageData = (newWidth !== originalWidth || newHeight !== originalHeight)
            ? resizeImageData(originalImageData, originalWidth, originalHeight, newWidth, newHeight)
            : originalImageData;

        // Create pixel art representation
        const imageText = createImageText(finalImageData, colorMode);
        // Return the ANSI escaped pixel art representation
        return imageText;
        
    } catch (error) {
        throw error
    }
}
