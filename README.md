# Image-To-ANSI.js

This library enables the conversion of pixel images into ANSI art that can be displayed in a terminal or other text-based environments. It uses ANSI escape codes to represent pixel colors in a way that mimics pixel art, allowing you to view colorful images directly in the terminal.


## Features

- **Image to ANSI Conversion:**  
  Convert any image (e.g., PNG, JPEG, BMP) to pixel-based text art using ANSI escape codes for terminal / console display.
- **Terminal-Friendly Rendering:**  
  Render images as colored ASCII text that can be printed directly to the terminal / console or captured into a file for later use.
- **Support for Multiple Color Modes:**  
  Convert images to different color representations including 256-color and true 24-bit color modes.
- **Flexible Image Resize:**  
  Resize images before converting them to fit your desired output size, ensuring scalability for different display environments.
---

## Usage

## Example

Here is a complete example of how to use the library:

```javascript
import { loadImage } from './src/image/loadImage';
import { resizeImageData } from './src/image/resizeImageData';
import { createImageText } from './src/image/createImageText';
import { config } from './src/config/config';

const imagePath = `${config.imageDirectory}/example.png`;

loadImage(imagePath)
  .then(({ imageData, width, height }) => {
    console.log(`Loaded image: ${width}x${height}`);
    const resizedData = resizeImageData(imageData, width, height, 50, 50);
    const textArt = createImageText(resizedData, '256');
    console.log(textArt);
  })
  .catch(err => {
    console.error('Error processing image:', err);
  });


// Alternatively, for true color (24-bit RGB) rendering, use 'true':

```


### 4. Customize Configuration (Optional)

You can modify default settings  
```javascript
export const config = {
  colorMode: '256',  // Choose between '256' or 'true'
  width: 80,      // Width for the output text
  height: 160,      // Width for the output text
};
```

## Contributing

We welcome contributions! If you'd like to improve this library or add new features, please fork the repository, create a new branch, and submit a pull request. Be sure to write tests for any new features or bug fixes.



## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

- **[Canvas](https://www.npmjs.com/package/canvas):** Used for image manipulation and loading.
- **[ANSI Escape Codes](https://en.wikipedia.org/wiki/ANSI_escape_code):** Used for terminal color rendering.
