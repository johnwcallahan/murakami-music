export const DEFAULT_PLAYLIST_URI = "https://open.spotify.com/embed?uri=spotify:user:alo1kdj80zfrmonagi566w8q2:playlist:1uoNsS3ZDT7gSQVFVvWOPZ&theme=white";

let redirect = process.env.NODE_ENV == "production"
  ? "https://murakami-music.herokuapp.com/callback"
  : "http://localhost:8080/callback";

export const OAUTH_CONFIG = {
  url: "https://accounts.spotify.com/authorize",
  client: "7ee5f70f185645139c74ac5efa7c3bbd",
  redirect,
  scope: "user-library-read,playlist-modify-private,playlist-modify-public,user-modify-playback-state",
  width: 400,
  height: 400
};