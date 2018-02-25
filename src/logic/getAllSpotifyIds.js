import getReferences from "./getReferences";

export default function getAllSpotifyIds(state) {
  let references = getReferences(state);
  let allSpotifyIds = [];
  references.forEach(ref => {
    ref.spotifyId.forEach(id => {
      allSpotifyIds.push(id);
    });
  });
  return allSpotifyIds;
}