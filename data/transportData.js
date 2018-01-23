const csv = require("csvtojson");
const MongoClient = require("mongodb").MongoClient;

require("dotenv").config({path: "../.env"});

const filePath = "./murakami-music-refs.csv";

let documents = [];

csv()
.fromFile(filePath)
.on("json", (json) => {
  json.spotifyId = extractSpotifyId(json.spotifyId);
  documents.push(json);
})
.on("done", (err) => {
  MongoClient.connect(process.env.MONGO_URI, (err, client) => {
    if (err) throw err;
    
    let db = client.db("heroku_8859968k");
    db.collection("Refs").insertMany(documents, (err, res) => {
      if (err) throw err;
      client.close();
    });
  });
});

function extractSpotifyId(spotifyString) {
  let re = /track\/([a-zA-Z0-9]+)/g;
  let ids = [];
  while (matches = re.exec(spotifyString)) {
    ids.push(matches[1]);
  }
  return ids;
}
