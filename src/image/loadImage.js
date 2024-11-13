import _canvas from "canvas.js";

/**
 * Loads an image from a given path and returns its image data, width, and height.
 * @param {string} path - The path to the image file.
 * @returns {Promise<Object>} Resolves with image data, width, and height.
 * @throws {Error} Throws an error if the image cannot be loaded.
 */
export async function loadImage(path) {
    const img = await _canvas.loadImage(path);
    const canvas = _canvas.createCanvas();
    const ctx = canvas.getContext('2d');

    return new Promise((resolve, reject) => {
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            resolve({
                imageData: ctx.getImageData(0, 0, img.width, img.height),
                width: img.width,
                height: img.height
            });
        };
        img.onerror = reject;
        img.crossOrigin = 'anonymous'; 
    });
}
