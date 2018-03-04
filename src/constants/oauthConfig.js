const config = {
  url: "https://accounts.spotify.com/authorize",
  client: "7ee5f70f185645139c74ac5efa7c3bbd",
  redirect: "http://localhost:8080/callback",
  scope: "user-library-read,playlist-modify-private,playlist-modify-public,user-modify-playback-state",
  width: 400, 
  height: 400
};

export default config;