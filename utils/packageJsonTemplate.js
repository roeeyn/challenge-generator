module.exports.packageJsonTemplate = generationNumber => `
{
  "name": "challenges-for-gen-${generationNumber}",
  "private": true,
  "version": "1.0.0",
  "description": "Repo with all the challenges for the generation ${generationNumber}",
  "main": "main.js",
  "scripts": {
    "test": "jest"
  },
  "keywords": ["Hackademy", "challenges", "prepadawans"],
  "author": "Rodrigo Medina @roeeyn",
  "license": "ISC",
  "devDependencies": {
    "jest": "^26.2.1"
  }
}
`;
