export default function getArtists(track) {
  return track.artists.map(track => {
    return track.name;
  }).join(", ");
}