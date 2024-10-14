const fs = require('fs-extra');
const path = require('path');
const heic2jpg = require('heic2jpg');

// Function to convert HEIC to JPEG
async function convertHeicToJpg(inputFolder, outputFolder) {
  try {
    // Ensure output folder exists
    await fs.ensureDir(outputFolder);

    // Read all files in the input folder
    const files = await fs.readdir(inputFolder);

    for (const file of files) {
      const filePath = path.join(inputFolder, file);

      // Check if the file is a HEIC file
      if (path.extname(file).toLowerCase() === '.heic') {
        const outputFilePath = path.join(outputFolder, path.basename(file, '.heic') + '.jpg');

        try {
          // Convert HEIC to JPEG
          const heicData = await fs.readFile(filePath);
          const jpgData = await heic2jpg(heicData);

          // Write the JPEG file to the output folder
          await fs.writeFile(outputFilePath, jpgData);
          console.log(`Converted ${file} to ${path.basename(outputFilePath)}`);
        } catch (err) {
          console.error(`Error converting ${file}:`, err);
        }
      }
    }

    console.log('Conversion completed.');
  } catch (err) {
    console.error('Error during conversion:', err);
  }
}

// Example usage
const inputFolder = 'E:/Documents/FaceMatchData/TEST_22_8/Face spoof/Face mask detected in selfie'; // Replace with your input folder path
const outputFolder = 'E:/Documents/FaceMatchData/TEST_22_8/Face spoof/Face mask detected in selfie2'; // Replace with your output folder path

convertHeicToJpg(inputFolder, outputFolder);
