// webpack.config.js
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';

import packageData from './license.config.js';

import TerserPlugin from 'terser-webpack-plugin';



// Create __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class AddLicenseAfterTerserPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.afterEmit.tap('AddLicenseAfterTerserPlugin', compilation => {
            const outputPath = this.options.outputPath || compiler.options.output.path;
            const outputFileName = this.options.outputFileName || compiler.options.output.filename;

            // Construct the full path to the output file
            const outputFilePath = path.join(outputPath, outputFileName);

            // Read the existing file content
            fs.readFile(outputFilePath, 'utf8', (err, data) => {
                if (err) throw err;

                // Add your license text after minification (Terser)
                const licenseText = `${packageData.LICENSE} `;

                // Append license text to the existing file content
                const newContent = licenseText + data;

                // Write back the modified content to the output file
                fs.writeFile(outputFilePath, newContent, 'utf8', err => {
                    if (err) throw err;
                    console.log(`License added to ${outputFileName}`);
                });
            });
        });
    }
}

// taken from https://github.com/webpack/webpack/issues/12506#issuecomment-1360810560
class RemoveLicenseFilePlugin {
    apply(compiler) {
        compiler.hooks.emit.tap("RemoveLicenseFilePlugin", (compilation) => {
            // compliation has assets to output
            // console.log(compilation.assets);
            for (let name in compilation.assets) {
                if (name.endsWith("LICENSE.txt")) {
                    delete compilation.assets[name];
                }
            }
        });
    }
}


const config  = {
  entry:`./src/index.js`,
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: packageData.FILENAME  + ".min.js",
    library: {
      type: 'module',
    },
  },
  experiments: {
    outputModule: true,
  },
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: false,
    })],
  },
  plugins: [new RemoveLicenseFilePlugin(),  new AddLicenseAfterTerserPlugin({
            // Additional options can be passed here if needed
        })],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
};
export default config; // Use export default to export the config
