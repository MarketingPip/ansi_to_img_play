import _canvas from "canvas";

/**
 * Resizes image data to a new width and height using canvas scaling.
 * @param {ImageData} imageData - Original image data to resize.
 * @param {number} originalWidth - Original width of the image.
 * @param {number} originalHeight - Original height of the image.
 * @param {number} newWidth - New width for the resized image.
 * @param {number} newHeight - New height for the resized image.
 * @returns {ImageData} The resized image data.
 */
export function resizeImageData(imageData, originalWidth, originalHeight, newWidth, newHeight) {
    const canvas = _canvas.createCanvas();
    const ctx = canvas.getContext('2d');
    canvas.width = originalWidth;
    canvas.height = originalHeight;
    ctx.putImageData(imageData, 0, 0);

    const resizeCanvas = _canvas.createCanvas();
    const resizeCtx = resizeCanvas.getContext('2d');
    resizeCanvas.width = newWidth;
    resizeCanvas.height = newHeight;
    resizeCtx.drawImage(canvas, 0, 0, originalWidth, originalHeight, 0, 0, newWidth, newHeight);

    return resizeCtx.getImageData(0, 0, newWidth, newHeight);
}
