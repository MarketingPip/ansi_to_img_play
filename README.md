# Image-To-ANSI.js

This library enables the conversion of pixel images into ANSI art that can be displayed in a terminal or other text-based environments. It uses ANSI escape codes to represent pixel colors in a way that mimics pixel art, allowing you to view colorful images directly in the terminal.


## Features

- **Text-Based Rendering:**  
  Render images as text using ANSI escape sequences to represent colors, allowing pixel art to be displayed in the terminal.
-
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
```



## Contributing

We welcome contributions! If you'd like to improve this library or add new features, please fork the repository, create a new branch, and submit a pull request. Be sure to write tests for any new features or bug fixes.



## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

- **[Canvas](https://www.npmjs.com/package/canvas):** Used for image manipulation and loading.
- **[ANSI Escape Codes](https://en.wikipedia.org/wiki/ANSI_escape_code):** Used for terminal color rendering.
