const csv = require("csvtojson");
const jsonfile = require("jsonfile");

const sourceFile = "./murakami-music-refs.csv";


function transportData() {
  let documents = [];
  csv()
    .fromFile(sourceFile)
    .on("json", (json) => {
      json.spotifyId = extractSpotifyId(json.spotifyId);
      documents.push(json);
    })
    .on("done", (err) => {
      if (err) 
        throw err;
      
      let valueTypes = ["books", "genres"];
      valueTypes.forEach(type => {
        writeUniqueValuesToFile(documents, type);
      });

      writeReferencesToFile(documents);
      writeComposerGenreMapToFile(documents);
    });
}

function extractSpotifyId(spotifyString) {
  let re = /track\/([a-zA-Z0-9]+)/g;
  let ids = [];
  var matches;
  do {
    matches = re.exec(spotifyString);
    if (matches)
      ids.push(matches[1]);
  } while (matches);
  return ids;
}

function writeReferencesToFile(documents) {
  let outFile = "../src/data/references.json";
  jsonfile.writeFile(outFile, documents, {spaces: 2}, (err) => {
    if (err) console.log(err);
    console.log("Wrote references to file");
  });
}

function writeUniqueValuesToFile(documents, type) {
  let uniqueValues = getUniqueValues(documents, type);
  
  let outFile = `../src/data/${type}.json`;
  
  jsonfile.writeFile(outFile, uniqueValues, {spaces: 2}, (err) => {
    if (err) console.log(err);
    console.log(`Wrote ${type} to file`);
  });
}

function getUniqueValues(documents, type) {
  let allValues = documents.map(document => document[makeSingular(type)]);
  return Array.from(new Set(allValues));
}

function makeSingular(str) {
  if (str[str.length-1] === "s")
    return str.substring(0, str.length-1);
  return str;
}

function writeComposerGenreMapToFile(documents) {
  let composerGenreMap = createComposerGenreMap(documents);
  let outFile = "../src/data/composersGenres.json";
  
  jsonfile.writeFile(outFile, composerGenreMap, {spaces: 2}, (err) => {
    if (err) console.log(err);
    console.log("Wrote composers to file");
  });
}

function createComposerGenreMap(documents) {
  let composerGenreMap = {};
  documents.forEach(document => {
    if (!(document.composer in composerGenreMap)) {
      composerGenreMap[document.composer] = document.genre;
    }
  });
  return composerGenreMap;
}

transportData();